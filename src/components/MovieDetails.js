import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();

  let [movieDetails, setMovieDetails] = useState({});

  var envvar = process.env.REACT_APP_API_KEY;

  let getMovieById = async (id) => {
    let response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${envvar}`
    );
    console.log(response.data);
    setMovieDetails(response.data);
  };
  useEffect(() => {
    getMovieById(id);
  }, [id]);
  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4">
            <div>
              <img
                alt="ing"
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                className="rounded-3 w-100"
              />
            </div>
          </div>
          <div className="col-md-8">
            <h1>{movieDetails.title}</h1>
            <p className="text-muted">{movieDetails.release_date}</p>
            <p className="">{movieDetails.overview}</p>
            <div className="d-flex justfiy-content-around"></div>
          </div>
        </div>
      </div>
    </>
  );
}
