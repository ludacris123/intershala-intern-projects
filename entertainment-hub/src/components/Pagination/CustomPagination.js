import React from 'react'
import Pagination from '@mui/material/Pagination';
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@emotion/react';

const darkTheme = createTheme({
    palette: {
        type: 'dark'
    }
})


const CustomPagination = ({ setPage, numberOfPages =500 }) => {
    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0, 0)
    }
    return (
        <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
        }}>
            <ThemeProvider theme={darkTheme}>
                <Pagination  count={numberOfPages} onChange={(e) => handlePageChange(e.target.textContent)} hideNextButton hidePrevButton color="primary"/>
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination
