// Sanity tests for the track matcher. Run with: node src/matching/matchTrack.test.mjs
//
// These assert the behaviour the naive items[0] approach got wrong: picking the
// right candidate when the correct one isn't first, when titles carry edition
// noise, when artists are reordered, and rejecting matches that are too weak.

import assert from "node:assert/strict";

import matchTrack from "./matchTrack.js";
import { normalizeTitle, normalizeArtist } from "./normalize.js";
import { levenshtein, tokenSetRatio } from "./similarity.js";

let passed = 0;
const test = (name, fn) => {
  fn();
  passed++;
  console.log(`  ✓ ${name}`);
};

console.log("normalize");
test("strips featured artists and parentheticals", () => {
  assert.equal(normalizeTitle("Levitating (feat. DaBaby)"), "levitating");
  assert.equal(normalizeTitle("Heroes - 2017 Remaster"), "heroes");
  assert.equal(normalizeTitle("Mr. Brightside (Remastered)"), "mr brightside");
});
test("reduces an artist to its primary name", () => {
  assert.equal(normalizeArtist("Beyoncé feat. Jay-Z"), "beyonce");
  assert.equal(normalizeArtist("OutKast"), "outkast");
});

console.log("similarity");
test("levenshtein basics", () => {
  assert.equal(levenshtein("kitten", "sitting"), 3);
  assert.equal(levenshtein("abc", "abc"), 0);
});
test("token-set ratio is order-insensitive", () => {
  assert.equal(tokenSetRatio("halo beyonce", "beyonce halo"), 1);
});

console.log("matchTrack");
test("picks the best candidate, not the first", () => {
  const source = { songName: "Mr. Brightside", artistName: "The Killers" };
  const candidates = [
    { id: "wrong", title: "Mr. Brightside (Tribute)", artist: "Karaoke Crew" },
    { id: "right", title: "Mr. Brightside", artist: "The Killers" }
  ];
  assert.equal(matchTrack(source, candidates).id, "right");
});

test("uses duration as a tiebreaker", () => {
  const source = {
    songName: "Heat Waves",
    artistName: "Glass Animals",
    durationMs: 238000
  };
  const candidates = [
    { id: "edit", title: "Heat Waves", artist: "Glass Animals", durationMs: 178000 },
    { id: "album", title: "Heat Waves", artist: "Glass Animals", durationMs: 238500 }
  ];
  assert.equal(matchTrack(source, candidates).id, "album");
});

test("rejects matches below the confidence threshold", () => {
  const source = { songName: "Bohemian Rhapsody", artistName: "Queen" };
  const candidates = [
    { id: "x", title: "Baby Shark", artist: "Pinkfong" }
  ];
  assert.equal(matchTrack(source, candidates), null);
});

test("matches despite edition noise and missing artist field", () => {
  const source = { songName: "Levitating", artistName: "Dua Lipa" };
  const candidates = [
    { id: "yt", title: "Dua Lipa - Levitating (Official Video) [feat. DaBaby]" }
  ];
  const result = matchTrack(source, candidates);
  assert.equal(result.id, "yt");
  assert.ok(result.score >= 0.7);
});

console.log(`\n${passed} tests passed`);
