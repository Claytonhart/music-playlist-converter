// Picks the best cross-platform match for a source track from a list of search
// candidates, replacing the naive "take the first search result" approach.
//
// Each candidate is scored on normalized title + artist similarity, with track
// duration (when both sides expose it) used as a tiebreaker — a 3:42 and a 3:41
// of the same title are almost certainly the same recording, while a 1:58 radio
// edit vs a 7:30 album cut probably are not. A confidence threshold lets callers
// reject weak matches instead of silently adding the wrong song.

import { normalizeTitle, normalizeArtist } from "./normalize.js";
import { tokenSetRatio } from "./similarity.js";

const TITLE_WEIGHT = 0.65;
const ARTIST_WEIGHT = 0.35;
const DEFAULT_THRESHOLD = 0.55;

// Map a duration delta (ms) to a small score adjustment in [-0.1, +0.05].
function durationAdjustment(aMs, bMs) {
  if (!aMs || !bMs) return 0;
  const diff = Math.abs(aMs - bMs);
  if (diff <= 2000) return 0.05; // within 2s — strong corroboration
  if (diff <= 5000) return 0.02;
  if (diff >= 30000) return -0.1; // wildly different length
  if (diff >= 15000) return -0.05;
  return 0;
}

const clamp = n => Math.max(0, Math.min(1, n));

function confidenceLabel(score) {
  if (score >= 0.85) return "high";
  if (score >= 0.7) return "medium";
  return "low";
}

// Score a single candidate against the pre-normalized source.
function scoreCandidate(src, candidate) {
  const titleScore = tokenSetRatio(src.title, normalizeTitle(candidate.title));

  let base;
  if (candidate.artist) {
    const artistScore = tokenSetRatio(
      src.artist,
      normalizeArtist(candidate.artist)
    );
    base = TITLE_WEIGHT * titleScore + ARTIST_WEIGHT * artistScore;
  } else {
    // No artist field (e.g. YouTube, where the title is usually
    // "Artist - Song"). Compare against both the bare title and the combined
    // "artist title" and keep the stronger signal.
    const combined = tokenSetRatio(
      `${src.artist} ${src.title}`.trim(),
      normalizeTitle(candidate.title)
    );
    base = Math.max(titleScore, combined);
  }

  return clamp(base + durationAdjustment(src.durationMs, candidate.durationMs));
}

/*
  source:      { songName, artistName, durationMs? }
  candidates:  [{ id, title, artist?, durationMs? }, ...]
  options:     { threshold? }

  Returns the best candidate as
    { id, score, confidence, candidate }
  or null if nothing clears the confidence threshold.
*/
export default function matchTrack(source, candidates, options = {}) {
  if (!candidates || candidates.length === 0) return null;

  const threshold = options.threshold ?? DEFAULT_THRESHOLD;
  const src = {
    title: normalizeTitle(source.songName),
    artist: normalizeArtist(source.artistName),
    durationMs: source.durationMs
  };

  let best = null;
  for (const candidate of candidates) {
    const score = scoreCandidate(src, candidate);
    if (!best || score > best.score) best = { candidate, score };
  }

  if (!best || best.score < threshold) return null;

  return {
    id: best.candidate.id,
    score: Number(best.score.toFixed(3)),
    confidence: confidenceLabel(best.score),
    candidate: best.candidate
  };
}
