import React, { useState, useEffect } from 'react'
import axios from "axios"
import SingleContent from "../components/SingleComponent/SingleContent"
import CustomPagination from '../components/Pagination/CustomPagination';

const Trending = () => {
    const [content, setContent] = useState([]);
    const [page,setPage]= useState(1)
    

    
    const fetchTrending = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${page}`, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTFiZGFkMDAyMTU3MWUxZmRkNzAyMzJhM2E2NDlmYyIsInN1YiI6IjY1OTFkYjUwMTQ5NTY1NWZmN2RhNDRlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lpjGMDjUEZHzDfQlTsB1Exv0mlFgSGJTOMkE2eFk7sE'
            }
        });
        setContent(data.results);
        // console.log(content)
    }

    useEffect(() => {
        fetchTrending()
    }, [page])


    return (
        <div>
            <span className="pageTitle"   >Trending</span>
            <div className="trending" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                {content &&
                    content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={c.media_type}
                            vote_average={c.vote_average}
                        />
                    ))}
            </div>
            <CustomPagination setPage = {setPage}/>
        </div>
    )
}

export default Trending

















