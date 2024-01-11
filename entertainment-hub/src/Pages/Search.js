import { Button, Tab, Tabs, TextField, ThemeProvider, createTheme, } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import SingleContent from '../components/SingleComponent/SingleContent';
import CustomPagination from '../components/Pagination/CustomPagination';

const Search = () => {
    const [type, setType] = useState(0)
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();

    const darkTheme = createTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#fff",
            },
        },
    });
    const fetchSearch = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?&language=en-US&query=${searchText}&page=${page}&include_adult=true`, {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTFiZGFkMDAyMTU3MWUxZmRkNzAyMzJhM2E2NDlmYyIsInN1YiI6IjY1OTFkYjUwMTQ5NTY1NWZmN2RhNDRlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lpjGMDjUEZHzDfQlTsB1Exv0mlFgSGJTOMkE2eFk7sE'
                },
            }
            );
            setContent(data.results);
            setNumOfPages(data.total_pages); 
            // console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
    }, [type, page]);

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{ display: "flex", margin: "15px 0" }}>
                    <TextField
                        style={{ flex: 1 }}
                        className="searchBox"
                        label="Search"
                        variant="filled"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button variant="contained" style={{ marginLeft: 10 }} onClick={fetchSearch}>
                        <SearchIcon fontSize="large" />
                    </Button>
                </div>
                <Tabs value={type} indicatorColor='primary' textColor='primary' style={{ paddingBottom: 5 }} aria-label="disabled tabs example"
                    onChange={(event, newValue) => {
                        setType(newValue);
                        setPage(1);
                    }}>
                    <Tab style={{ width: "50%" }} label="Search Movies" />
                    <Tab style={{ width: "50%" }} label="Search TV Series" />
                </Tabs>
            </ThemeProvider>
            <div className="trending" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                {content &&
                    content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={type ? "tv" : "movie"}
                            vote_average={c.vote_average}
                        />
                    ))}
                {searchText &&
                    !content &&
                    (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
        </div>
    )
}

export default Search
