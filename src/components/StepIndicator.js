import React from "react";

/*
  Wizard progress for the convert flow.
  `current` is the 1-based active step (1 = Platforms, 2 = Playlist, 3 = Done).
*/
const STEPS = ["Platforms", "Playlist", "Customize", "Done"];

const StepIndicator = ({ current }) => {
  return (
    <ol className="steps" aria-label={`Step ${current} of ${STEPS.length}`}>
      {STEPS.map((label, i) => {
        const index = i + 1;
        const state =
          index < current ? "done" : index === current ? "active" : "todo";
        return (
          <li key={label} className={`steps__item steps__item--${state}`}>
            <span className="steps__num">
              {state === "done" ? "✓" : String(index).padStart(2, "0")}
            </span>
            <span className="steps__label">{label}</span>
          </li>
        );
      })}
    </ol>
  );
};

export default StepIndicator;
