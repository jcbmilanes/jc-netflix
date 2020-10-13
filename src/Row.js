import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title,fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);

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

    console.table(movies);

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">

            {movies.map(movie => (
                <img
                    key={movie.id}
                    className={`row__poster  ${isLargeRow && "row__posterLarge"}`} 
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                    alt={movie.name} 
                />
            ))}
            </div>

        </div>
    )
}

export default Row
