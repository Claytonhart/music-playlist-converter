import React from "react";
import { Link } from "react-router-dom";

// Decorative waveform — a row of bars with staggered animation delays.
const WAVE_DELAYS = [
  "0s", "0.2s", "0.4s", "0.1s", "0.5s", "0.3s", "0.6s",
  "0.15s", "0.45s", "0.25s", "0.55s", "0.05s", "0.35s",
  "0.5s", "0.2s", "0.4s"
];

const LandingPage = () => {
  return (
    <section className="landing">
      <div className="landing__copy">
        <span className="landing__eyebrow">Playlist Converter · 4 platforms</span>
        <h2 className="landing__header">
          Move your music <em>anywhere</em>.
        </h2>
        <p className="landing__desc">
          Import a library from one streaming platform and rebuild it on another —
          Spotify, YouTube, Napster, or Deezer. One playlist, any service.
        </p>
        <Link to="/convert" className="btn landing__btn">
          Get started <span>&rarr;</span>
        </Link>
      </div>

      <div className="landing-visual" aria-hidden="true">
        <div className="landing-visual__card">
          <div className="landing-visual__row">
            <span
              className="landing-visual__dot"
              style={{ color: "#1ed760" }}
            />
            <span>FROM</span>
            <b>Spotify</b>
          </div>
          <div className="landing-visual__row">
            <span
              className="landing-visual__dot"
              style={{ color: "#a25bff" }}
            />
            <span>TO</span>
            <b>Deezer</b>
          </div>
          <div className="landing-visual__wave">
            {WAVE_DELAYS.map((delay, i) => (
              <span key={i} style={{ animationDelay: delay }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
