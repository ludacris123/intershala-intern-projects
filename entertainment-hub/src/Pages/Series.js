import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react";
import SingleContent from '../components/SingleComponent/SingleContent';
import CustomPagination from '../components/Pagination/CustomPagination';
import Genres from '../components/Genres/Genres';
import UseGenre from '../hooks/useGenre';


const Series = () => {
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const genreforURL = UseGenre(selectedGenres);

    const fetchSeries = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&page=${page}${page}&with_genres=${genreforURL}`, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTFiZGFkMDAyMTU3MWUxZmRkNzAyMzJhM2E2NDlmYyIsInN1YiI6IjY1OTFkYjUwMTQ5NTY1NWZmN2RhNDRlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lpjGMDjUEZHzDfQlTsB1Exv0mlFgSGJTOMkE2eFk7sE'
            },
        });
        setContent(data.results);
        setNumOfPages(data.total_pages);
        console.log(numOfPages)
        console.log(content)
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchSeries();
        // eslint-disable-next-line
    }, [genreforURL, page]);

    return (
        <div>
            <span className="pageTitle" >Discover Series</span>
            <Genres
                type="tv"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
            <div className="trending" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                {content &&
                    content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type="tv"
                            vote_average={c.vote_average}
                        />
                    ))}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
        </div>
    );
};

export default Series;