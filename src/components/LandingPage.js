import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <section className="landing">
      <div>
        <h2 className="landing__header">Choose between 4 music platforms</h2>
        <p className="landing__desc">
          Import your library from one platform and upload it to a new one!
        </p>
      </div>
      <Link to="/convert" className="btn landing__btn">
        Get Started Now &nbsp;<span>&rarr;</span>
      </Link>
    </section>
  );
};

export default LandingPage;
