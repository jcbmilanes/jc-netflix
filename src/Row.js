import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title,fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    // a snippet of code which runs based on a specific conditions
    useEffect(() => {
        // if [], run once when the row loads, and dont run again.
        // if [movies] - its gonna run every single time movies changes.

        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            console.log(request);
            return request;
        }

        fetchData();

    }, [fetchUrl]);

    /** fetchUrl is a variable which is being pass outside the useEffect code block */
    /** we need to tell useEffect that you are using this variable "fetchUrl" which is outside the block */
    /** in that way useEffect knows that something change so I need to refile the code*/

    //console.table(movies);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if(trailerUrl){

        }else{
            movieTrailer(movie?.name || "")
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch(error => console.log(error))
        }

    }

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">

            {movies.map(movie => (
                <img
                    key={movie.id}
                    onClick={() => handleClick(movie)}
                    className={`row__poster  ${isLargeRow && "row__posterLarge"}`} 
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                    alt={movie.name} 
                />
            ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            
        </div>
    )
}

export default Row
