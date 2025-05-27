import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Carousel = ({ games }) => {
  if (!games || games.length === 0) {
    return <p>No games to show.</p>;
  }

  return (
    <div
      className="card mb-3"
      style={{
        minWidth: "18rem",
        backgroundColor: "transparent",
        border: "none",
      }}
    >
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel"
  data-bs-interval="3000" >
        <div className="carousel-indicators">
          {games.map((game, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {games.map((game, index) => (
            <div
              key={game.uid || index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className="d-flex justify-content-center">
                <img
                  src={
                    game.img.startsWith("//") ? `https:${game.img}` : game.img
                  }
                  alt={game.name}
                  className="d-block"
                  style={{
                    maxHeight: "18rem",
                    width: "50%",
                    objectFit: "contain",
                  }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>{game.name}</h5>
                  <p>Some representative placeholder content for the slide.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};
