// Text normalization for cross-platform track matching.
//
// The same recording is titled inconsistently across services: featured
// artists ("feat. X"), edition tags ("(Remastered 2011)", "- 2017 Remaster"),
// punctuation, casing, and diacritics all differ. Normalizing both sides
// before scoring is what makes the similarity comparison meaningful — it's the
// single biggest lever on match quality, more than the distance metric itself.

// Edition / version noise that shows up in parens, brackets, or after " - ".
const DESCRIPTORS =
  "remaster|remastered|remix|mix|radio edit|edit|version|live|mono|stereo|" +
  "deluxe|acoustic|demo|bonus|anniversary|edition|single|original|explicit|" +
  "expanded|reissue|instrumental";

const FEATURED = /\s*[([]?\s*(feat\.?|ft\.?|featuring)\s.*$/i;
const PARENS = /[([][^)\]]*[)\]]/g;
const TRAILING_DESCRIPTOR = new RegExp(`\\s[-–—]\\s.*(${DESCRIPTORS}).*$`, "i");

// Lowercase, strip diacritics + punctuation, collapse whitespace.
function base(str) {
  return str
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // combining diacritics
    .toLowerCase()
    .replace(/['’`]/g, "") // join contractions: "don't" -> "dont"
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// A title stripped of featured-artist and edition noise.
export function normalizeTitle(title = "") {
  return base(
    title
      .replace(FEATURED, "")
      .replace(TRAILING_DESCRIPTOR, "")
      .replace(PARENS, "")
  );
}

// The primary artist only — collaborators rarely line up across platforms,
// so matching on the lead artist is more reliable.
export function normalizeArtist(artist = "") {
  const primary = artist.split(/,|&|\bfeat\.?\b|\bft\.?\b|\bx\b|\bvs\.?\b/i)[0];
  return base(primary);
}
