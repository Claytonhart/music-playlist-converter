// String-similarity primitives used to score match candidates.
//
// Plain Levenshtein ratio is a poor fit on its own for music metadata: it
// penalizes word reordering ("Beyoncé Halo" vs "Halo Beyoncé") and minor token
// differences heavily. So we combine it with token-based measures that are
// order-insensitive, and take the most generous signal.

// Classic Levenshtein edit distance, two-row DP — O(n*m) time, O(min) space.
export function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  let curr = new Array(b.length + 1);

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        prev[j] + 1, // deletion
        curr[j - 1] + 1, // insertion
        prev[j - 1] + cost // substitution
      );
    }
    [prev, curr] = [curr, prev];
  }
  return prev[b.length];
}

// Edit distance expressed as a 0..1 similarity ratio.
export function ratio(a, b) {
  const max = Math.max(a.length, b.length);
  if (max === 0) return 1;
  return 1 - levenshtein(a, b) / max;
}

const tokens = s => s.split(" ").filter(Boolean);

// Order-insensitive ratio: sort the tokens before comparing.
function tokenSortRatio(a, b) {
  return ratio(
    tokens(a)
      .sort()
      .join(" "),
    tokens(b)
      .sort()
      .join(" ")
  );
}

// Jaccard overlap of the two token sets.
function jaccard(a, b) {
  const A = new Set(tokens(a));
  const B = new Set(tokens(b));
  if (!A.size && !B.size) return 1;
  let inter = 0;
  for (const t of A) if (B.has(t)) inter++;
  return inter / (A.size + B.size - inter);
}

// Best of the three signals — robust to reordering, extra words, and typos.
export function tokenSetRatio(a, b) {
  return Math.max(ratio(a, b), tokenSortRatio(a, b), jaccard(a, b));
}
