import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../features/userDetailSlice';
import { useNavigate } from 'react-router-dom';

const Update = () => {
    const { id } = useParams();
    const { users, loading } = useSelector((state) => state.app)
    const [updateData, setUpdateData] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            const singleUser = users.filter((ele) => ele.id === id);
            setUpdateData(singleUser[0]);
        }
    }, []);

    const newData  = (e)=>{
        setUpdateData({...updateData,[e.target.name]:e.target.value})
    }

    const handleUpdate = (e)=>{
        e.preventDefault()
        dispatch(updateUser(updateData))
        navigate("/read")
    }

    return (
        <div>
            <div>
                <h2 className="my-2">Edit the data</h2>
                <form className="w-50 mx-auto my-5"  onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={updateData && updateData.name}
                            onChange={newData}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={updateData && updateData.email}
                            required
                        onChange={newData}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Age</label>
                        <input
                            type="text"
                            name="age"
                            className="form-control"
                            value={updateData && updateData.age}
                            required
                        onChange={newData}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-check-input"
                            name="gender"
                            value="Male"
                            type="radio"
                            checked={updateData && updateData.gender === "Male"}
                            required
                        onChange={newData}
                        />
                        <label className="form-check-label">Male</label>
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-check-input"
                            name="gender"
                            value="Female"
                            type="radio"
                            checked={updateData && updateData.gender === "Female"}
                        onChange={newData}
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

export default Update
