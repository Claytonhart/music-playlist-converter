import React from "react";

const PlatformListItem = ({ content, setActive, active }) => {
  if (active)
    return (
      <li onClick={setActive} className={`platform-list-item ${active}`}>
        {content}
      </li>
    );
  return (
    <li onClick={setActive} className={`platform-list-item`}>
      {content}
    </li>
  );
};

export default PlatformListItem;
