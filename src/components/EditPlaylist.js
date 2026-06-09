import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import StepIndicator from "./StepIndicator";
import TrackCover from "./TrackCover";

/*
  Lets the user curate a playlist before conversion: rename it, search/filter,
  drag to reorder, and drop tracks they don't want. The edited list + name are
  committed to app state and carried into the conversion step.

  Props:
    playlistToConvert    [{ artistName, songName }]
    setPlaylistToConvert (tracks) => void
    setPlaylistName      (name) => void
*/
const EditPlaylist = ({
  history,
  playlistToConvert,
  setPlaylistToConvert,
  setPlaylistName
}) => {
  const [tracks, setTracks] = useState(playlistToConvert || []);
  const [name, setName] = useState("My Converted Playlist");
  const [query, setQuery] = useState("");
  const [dragIndex, setDragIndex] = useState(null);

  const searching = query.trim() !== "";
  const q = query.trim().toLowerCase();

  // Render the filtered view, but keep each row's index into the full list so
  // remove/reorder act on the real array.
  const rows = tracks
    .map((track, index) => ({ track, index }))
    .filter(
      ({ track }) =>
        !searching ||
        track.songName.toLowerCase().includes(q) ||
        track.artistName.toLowerCase().includes(q)
    );

  const removeAt = index => setTracks(tracks.filter((_, i) => i !== index));

  const moveTrack = (from, to) => {
    if (from === to) return;
    const next = [...tracks];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setTracks(next);
  };

  const handleDrop = to => {
    if (dragIndex !== null) moveTrack(dragIndex, to);
    setDragIndex(null);
  };

  const convert = () => {
    setPlaylistToConvert(tracks);
    setPlaylistName(name.trim() || "My Converted Playlist");
    history.push("/converted");
  };

  if (!playlistToConvert || playlistToConvert.length === 0) {
    return (
      <div className="panel edit">
        <StepIndicator current={3} />
        <p className="choose-playlist__empty">
          No playlist loaded. <Link to="/">Start a conversion</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className="panel edit">
      <StepIndicator current={3} />
      <div className="panel__head">
        <h1>Customize your playlist</h1>
        <span className="panel__eyebrow">
          Reorder, rename, and trim before converting
        </span>
      </div>

      <div className="edit__controls">
        <label className="edit__field">
          <span className="edit__field-label">Playlist name</span>
          <input
            className="edit__input"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="My Converted Playlist"
          />
        </label>
        <label className="edit__field">
          <span className="edit__field-label">Search</span>
          <input
            className="edit__input"
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Filter by song or artist…"
          />
        </label>
      </div>

      <div className="edit__meta">
        <span>
          {tracks.length} {tracks.length === 1 ? "track" : "tracks"}
        </span>
        {searching ? (
          <span className="edit__hint">Clear search to drag-reorder</span>
        ) : (
          <span className="edit__hint">Drag the handle to reorder</span>
        )}
      </div>

      <ul className="edit__list">
        {rows.map(({ track, index }) => (
          <li
            key={track.artistName + track.songName + index}
            className={`edit-row${dragIndex === index ? " is-dragging" : ""}`}
            draggable={!searching}
            onDragStart={() => setDragIndex(index)}
            onDragOver={e => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            onDragEnd={() => setDragIndex(null)}
          >
            <span
              className={`edit-row__handle${searching ? " is-disabled" : ""}`}
              aria-hidden="true"
            >
              ⠿
            </span>
            <TrackCover
              artistName={track.artistName}
              songName={track.songName}
            />
            <span className="edit-row__text">
              <span className="edit-row__artist">{track.artistName}</span>
              <span className="edit-row__song">{track.songName}</span>
            </span>
            <button
              className="edit-row__remove"
              onClick={() => removeAt(index)}
              title="Remove from playlist"
              aria-label={`Remove ${track.songName}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="edit__actions">
        <Link to="/choose" className="btn btn-ghost">
          &larr; Back
        </Link>
        <button
          className="btn"
          onClick={convert}
          disabled={tracks.length === 0}
        >
          Convert {tracks.length} {tracks.length === 1 ? "song" : "songs"}{" "}
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
};

export default withRouter(EditPlaylist);
