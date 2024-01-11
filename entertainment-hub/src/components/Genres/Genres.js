
import Chip from '@mui/material/Chip';

import axios from "axios";
import { useEffect } from "react";

const Genres = ({selectedGenres,setSelectedGenres,genres,setGenres,type,setPage,}) => {


    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    };

    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
    };

    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?`, {
            headers: {
                accept: 'application/json',
                Authorization: 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTFiZGFkMDAyMTU3MWUxZmRkNzAyMzJhM2E2NDlmYyIsInN1YiI6IjY1OTFkYjUwMTQ5NTY1NWZmN2RhNDRlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lpjGMDjUEZHzDfQlTsB1Exv0mlFgSGJTOMkE2eFk7sE' 
            }
        });
        setGenres(data.genres);
    }

    useEffect(() => {
        fetchGenres();

        return () => {
            setGenres({}); // unmounting
        };
        // eslint-disable-next-line
    }, []);

    return (
        <div style={{ padding: "6px 0" }}>
            {selectedGenres.map((genre) => (
                <Chip
                    style={{ margin: 2 }}
                    label={genre.name}
                    key={genre.id}
                    color="primary"
                    clickable
                    size="small"
                    onDelete={() => handleRemove(genre)}
                />
            ))}
            {genres.map((genre) => (
                <Chip
                    style={{ margin: 2 }}
                    label={genre.name}
                    key={genre.id}
                    clickable
                    size="small"
                    onClick={() => handleAdd(genre)}
                />
            ))}
        </div>
    );
};

export default Genres;



