import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCards/MovieCard";
import ReactPaginate from "react-paginate";
import { Typography, Grid, Button, CircularProgress, Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";

async function fetchMovies(URL, token, timeout = 5000) {
  console.log(`URL in fn ${URL}`);
  return Promise.race([
    fetch(`${URL}`, {
      mode: "cors",
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((data) => data.json())
      .catch((error) => console.error("Error", error)),
    new Promise((_, reject) => setTimeout(() => reject("timeout"), timeout)),
  ]);
}

function Home({ token }) {
  const [movielist, setMovielist] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [isLoaded, setisLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorState, setIsErrorState] = useState({
    isError: true,
    errorMessage: "",
  });

  const URL = `https://demo.credy.in/api/v1/maya/movies/${
    currentPage !== 1 ? `?page=${currentPage}` : ""
  }`;

  const handleFetch = async () => {
    console.log(`url before fetching ${URL}`);
    setIsErrorState({ ...errorState, isError: false });
    setisLoaded(false);
    setMovielist([]);
    try {
      const movieData = await fetchMovies(URL, token, 5000);
      if (movieData.is_success === false) {
        console.log("ISERROR TRIGGERED");
        setisLoaded(true);
        setIsErrorState({
          errorMessage: "Oops! Error fetching the data",
          isError: true,
        });
      } else {
        console.log(movieData);
        console.log(movieData.results);
        setPageCount(Math.ceil(movieData.count / 10));
        setMovielist(movieData.results);
        setisLoaded(true);
      }
    } catch (e) {
      if (e === "timeout") {
        setIsErrorState({
          errorMessage: "Oops! Request taking too long to fetch",
          isError: true,
        });
      }
    }
  };

  const handlePageChange = (e, value) => {
    console.log("Handle page triggered");
    // console.log(selectedObject);
    // setCurrentPage(selectedObject.selected + 1);
    setCurrentPage(value);
    handleFetch();
  };

  //useffect for receiving the movie list
  useEffect(() => {
    handleFetch();
  }, [currentPage]);

  return (
    <>
      {isLoaded ? (
        <>
          {errorState.isError ? (
            <Box sx={{ width: "100%", maxWidth: 500 }}>
              <Typography variant="subtitle1" gutterBottom component="div">
                {errorState.errorMessage}
              </Typography>
              <Button variant="outlined" color="error" onClick={handleFetch}>
                Try Again
              </Button>
            </Box>
          ) : (
            <Grid
              className="container"
              container
              // sx={{ flexGrow: 1 }}
              spacing={2}
              mt={1}
            >
              {movielist?.map((movie) => (
                <Grid key={movie.uuid} item xs={12} sm={6} md={4} lg={3}>
                  <MovieCard key={movie.uuid} movie={movie} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      ) : (
        <CircularProgress />
      )}

      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ padding: 1, margin: "auto", position: "relative" }}
      />
    </>
  );
}

export default Home;

{
  /* <Grid
  className="container"
  container
  // alignItems="stretch"
  spacing={2}
  mt={1}
  sx={{
    padding: "0",
    alignItems: "stretch",
    flexWrap: "wrap",
    justifyContent: "stretch",
    // gap: ".5rem",
  }}
>
  {movielist?.map((movie) => (
    <Grid
      key={movie.uuid}
      item
      xs={12}
      sm={12}
      md={6}
      lg={3}
      sx={{
        height: "100%",
        backgroundColor: "yellow",
        alignSelf: "stretch",
      }}
    >
      <MovieCard key={movie.uuid} movie={movie} />
    </Grid>
  ))}
</Grid>; */
}
