

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect ,useState } from 'react';
import { useNavigate} from 'react-router-dom';

export default function SimpleBottomNavigation() {
    const [value, setValue] = useState(0);
    const history = useNavigate()

    useEffect(() => {
        if(value=== 0 ) history("/")
        else if(value ===1) history("/Movies")
        else if(value ===2) history("/Series")
        else if(value ===3) history("/Search")
    }, [value,history])


    return (
        <Box >
            <BottomNavigation
                showLabels
                value={value}
                style={{ width: "100%", position: "fixed", bottom: 0, backgroundColor: "#2d313a", zIndex: 100, background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(30,61,67,1) 0%, rgba(9,9,11,1) 100%, rgba(0,212,255,1) 100%)" }}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction
                    style={{ color: "white" }}
                    label="Trending"
                    icon={<WhatshotIcon />}
                />
                <BottomNavigationAction
                    style={{ color: "white" }}
                    label="Movies"
                    icon={<MovieIcon />}
                />
                <BottomNavigationAction
                    style={{ color: "white" }}
                    label="TV Series"
                    icon={<TvIcon />}
                />
                <BottomNavigationAction
                    style={{ color: "white" }}
                    label="Search"
                    icon={<SearchIcon />}
                />
            </BottomNavigation>
        </Box>
    );
}