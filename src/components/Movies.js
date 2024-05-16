import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchList,
  removeFromWatchList,
} from "./Store/slices/wishlistSlice";
import { languageContext } from "./context/language";

export default function Movies() {
  const { language } = useContext(languageContext);

  let [moviesList, setMoviesList] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [active, setActive] = useState(0);
  let count = useSelector((state) => state.watch.count);
  let watchlisted = useSelector((state) => state.watch.watchlist);
  console.log("watchlisted", watchlisted);

  let dispatch = useDispatch();

  const pageDirection = language === "ar" ? "rtl" : "ltr";

  console.log(count);
  useSelector((state) => state.w);
  let pageNum = Array(100)
    .fill(1)
    .map((el, i) => {
      return i + 1;
    });
  console.log(pageNum);
  const handelAddToFav = (e, movie) => {
    if (!watchlisted.includes(movie)) {
      e.target.classList.toggle("fa-solid", "fa-regular");
      dispatch(addToWatchList(movie));
    } else {
      e.target.classList.replace("fa-solid", "fa-regular");
      dispatch(removeFromWatchList(movie.id));
    }
  };

  const handleNext = () => {
    if (currentPage < pageNum.length) {
      getMoviesByPageNumber(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      getMoviesByPageNumber(currentPage - 1);
    }
  };

  let navigate = useNavigate();
  var envvar = process.env.REACT_APP_API_KEY;
  let getMoviesByPageNumber = async function (page) {
    let response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${envvar}&page=${page}`
    );

    setMoviesList(response.data.results);
    setActive(page - 1);
    setCurrentPage(page);
  };

  useEffect(() => {
    getMoviesByPageNumber(1);
  }, []);
  return (
    <>
      <div className="container my-3" style={{ direction: pageDirection }}>
        <Search />
        <h3>Popular Movies</h3>
        <div className="row g-4 my-2">
          {moviesList.map((movie) => {
            return (
              <div className="col-md-2" key={movie.id}>
                <div className="rounded-3">
                  {" "}
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt="filmImg"
                    className="w-100 rounded-3"
                    style={{ height: "200px" }}
                  />
                </div>
                <div className="mainInfo my-2 d-flex justify-content-between align-items-end">
                  <div className="infoR">
                    <p
                      className="fw-bold"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate(`/movies-details/${movie.id}`);
                      }}
                    >
                      {movie.title.split(" ").splice(0, 2).join(" ")}
                    </p>
                    <span className="text-muted">{movie.release_date}</span>
                  </div>

                  <div className="infoL">
                    <span
                      onClick={(e) => {
                        handelAddToFav(e, movie);
                      }}
                    >
                      <i class="fa-regular fa-lg fa-heart text-warning"></i>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="row mt-5 ">
          <div style={{ width: "510px" }} className="m-auto">
            <Pagination>
              <Pagination.First
                onClick={() => {
                  getMoviesByPageNumber(1);
                }}
              />
              <Pagination.Prev
                onClick={() => {
                  handlePrev();
                }}
              />
              {pageNum.splice(0, 10).map((page, i) => {
                return (
                  <>
                    <Pagination.Item
                      linkClassName="text-warning"
                      key={page}
                      onClick={() => {
                        getMoviesByPageNumber(page);
                      }}
                      active={i === active}
                    >
                      {page}
                    </Pagination.Item>
                  </>
                );
              })}
              <Pagination.Ellipsis />
              <Pagination.Item
                linkClassName="text-warning"
                key={100}
                onClick={() => {
                  getMoviesByPageNumber(100);
                }}
                active={99 === active}
              >
                100
              </Pagination.Item>
              <Pagination.Next
                onClick={() => {
                  handleNext();
                }}
              />
              <Pagination.Last
                onClick={() => {
                  getMoviesByPageNumber(100);
                }}
              />
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
}
