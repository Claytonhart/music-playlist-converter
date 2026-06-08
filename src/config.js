// Central toggle for the mock layer.
//
// The four streaming APIs this app integrated with (Spotify, YouTube, Napster,
// Deezer) all required OAuth keys/registrations that are long dead, so the real
// network calls can no longer run. When MOCK is on, the functions in src/apis/
// and the auth components short-circuit to fake data (src/mocks/) so the entire
// convert flow works end-to-end with no keys or network.
//
// Mock is ON by default. To exercise the real (now non-functional) code paths,
// run with VITE_MOCK=false — see .env.example.
export const MOCK = import.meta.env.VITE_MOCK !== "false";

// Simulate network latency so loading states are visible during the demo.
export const mockDelay = (ms = 600) =>
  new Promise(resolve => setTimeout(resolve, ms));
