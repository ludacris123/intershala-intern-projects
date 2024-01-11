import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, NavLink} from "react-router-dom"
import { SearchUser } from '../features/userDetailSlice';

const Navbar = () => {

    const allUsers = useSelector((state)=>state.app.users)
    const [searchData,SetSearchData]=useState("")
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(SearchUser(searchData))
    },[searchData])
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid ">
                    <h4 className="navbar-brand">RTK</h4>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    Create Post
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/read" className="nav-link">
                                    All Post ({allUsers.length})
                                </Link>
                            </li>
                        </ul>
                        <input
                            className="form-control me-2 w-50"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={(e)=> SetSearchData(e.target.value)}
                        />
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar
