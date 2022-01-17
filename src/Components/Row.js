import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original";

function Row(props) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const opts = {
    height: "390",
    width: "99%",
    playerVars: {
      autoplay: 0,
    },
  };

  useEffect(() => {
    async function fetchData() {
      //async function to get back the promise from the API request
      const request = await axios.get(props.fetch);
      //always console log your return from the request to see what you are getting back, in our case we are getting an object
      setMovies(request.data.results);
      //request.data.results is an array
      return request;
    }
    fetchData(); //call the async function once you get back the results
  }, [props.fetch]); // if you ever use a variable from outside of the function, always pass it as second parameter in useEffect Hook

  const showMovieTrailer = (movie) => {
    // console.table(movie?.title)
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search); //read documentation to understand better.
          setTrailerUrl(urlParams.get("v")); //
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="row_posters">
        {movies.map(function (movie) {
          return (
            <img
              key={movie.id} //helps render faster and also will re render only when id for the movie is changed
              src={
                props.isLargeRow
                  ? base_url + movie.poster_path
                  : base_url + movie.backdrop_path
              }
              alt={movie.name}
              className={
                props.isLargeRow
                  ? "row_posters_images_large"
                  : "row_posters_images"
              }
              onClick={showMovieTrailer(movie)}
            />
          );
        })}
      </div>

      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;
