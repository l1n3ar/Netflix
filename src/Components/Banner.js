import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function getMovie() {
      const dataReturnedFromRequest = await axios.get(
        requests.fetchNetflixOriginals
      );
      console.log(dataReturnedFromRequest); // always do this to check what data is being returned from your request

      setMovie(
        dataReturnedFromRequest.data.results[
          Math.floor(
            Math.random() * dataReturnedFromRequest.data.results.length - 1
          )
        ]
      );
    }
    getMovie();
  }, []); //Empty array because we only want to re render banner when the entire page reloads, not otherwise

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
        "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-contents">
        <h1 key={movie.id} className="banner-title">
          {movie?.name || movie?.title || movie?.original_name}
        </h1>
        <div className="banner-buttons">
          <button className="banner-button">Play</button>
          <button className="banner-button">More Info</button>
        </div>
        <h3 className="banner-description">{movie.overview}</h3>
      </div>
      <div className="banner-fade-bottom"></div>
    </header>
  );
}

export default Banner;
