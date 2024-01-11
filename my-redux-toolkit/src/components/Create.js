import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { createUser } from '../features/userDetailSlice';
import { useNavigate } from 'react-router-dom';


const Create = () => {

    const [users, setUser] = useState({});
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const getuserData = (e) => {
        setUser({ ...users, [e.target.name]: e.target.value })
        console.log(users)
    }


    const handleSubmit = (e)=>{
        e.preventDefault()
        // console.log(users);
        dispatch(createUser(users))
        navigate("/read")
    }



    return (
        <div>
            <div>
                <h2 className="my-2">Fill the data</h2>
                <form className="w-50 mx-auto my-5"  onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            onChange={getuserData}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            required
                            onChange={getuserData}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Age</label>
                        <input
                            type="text"
                            name="age"
                            className="form-control"
                            required
                            onChange={getuserData}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-check-input"
                            name="gender"
                            value="Male"
                            type="radio"
                            required
                            onChange={getuserData}
                        />
                        <label className="form-check-label">Male</label>
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-check-input"
                            name="gender"
                            value="Female"
                            type="radio"
                            onChange={getuserData}
                        />
                        <label className="form-check-label">Female</label>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Create
