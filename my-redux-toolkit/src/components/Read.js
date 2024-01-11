import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, showUser } from '../features/userDetailSlice'
import CustomModal from "./customModal"
import {Link, NavLink} from "react-router-dom"

const Read = () => {


    const dispatch = useDispatch()
    const [id, setId] = useState();
    const [showPopUp, setShowPopUp] = useState(false)
    const [radioData,setRadioData]= useState("")

    const { users, loading,searchData } = useSelector((state) => state.app)


    useEffect(() => {
        dispatch(showUser())
    }, [])

    if (loading) {
        return <h2>Loading</h2>
    }

    return (
        <div>

            {showPopUp && (
                <CustomModal
                    id={id}
                    showPopUp={showPopUp}
                    setShowPopUp={setShowPopUp}
                />
            )}
            <h2>All data</h2>
            <input
                class="form-check-input"
                name="gender"
                checked={radioData === ""}
                type="radio"
                onChange={(e) => setRadioData("")}
            />
            <label class="form-check-label">All</label>
            <input
                class="form-check-input"
                name="gender"
                checked={radioData === "Male"}
                value="Male"
                type="radio"
                onChange={(e) => setRadioData(e.target.value)}
            />
            <label class="form-check-label">Male</label>
            <input
                class="form-check-input"
                name="gender"
                value="Female"
                checked={radioData === "Female"}
                type="radio"
                onChange={(e) => setRadioData(e.target.value)}
            />
            <label class="form-check-label">Female</label>

            {
                users && 
                users.filter((ele)=>{
                    if(searchData.length === 0 ){
                        return ele;
                    }else{
                        return ele.name.toLowerCase().includes(searchData.toLowerCase())
                    }
                }).filter((ele)=>{
                    if(radioData==="Male"||radioData==="Female"){
                        return ele.gender === radioData
                    }else{
                        return ele
                    }
                })
                .map((ele) => (
                    <div key={ele.id} className="card-body">
                        <h5 className="card-title">{ele.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                        <p className="card-text">{ele.gender}</p>
                        <button className="card-link" onClick={() => [setId(ele.id), setShowPopUp(true)]}>
                            View
                        </button>
                        <Link to={`/edit/${ele.id}`} className="card-link">
                        Edit
                    </Link>
                    <Link
                        onClick={() => dispatch(deleteUser(ele.id))}
                        className="card-link"
                    >
                        Delete
                    </Link>
                        <hr></hr>
                    </div>

                ))
            }
        </div>

    )

}

export default Read
