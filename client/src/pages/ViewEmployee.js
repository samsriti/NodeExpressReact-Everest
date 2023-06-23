import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';



export default function ViewEmployee() {
    const [user, setUser] = useState({});
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`)
            .then((resp) => setUser({ ...resp.data[0] }))
    }, [id]);

    return (
        <div style={{ maxWidth: '500px' }} className='container my-5'>
            <div className='card'>
                <div className='card-header'>
                    <h2> Employee Details</h2>
                </div>
                <div className='container'>
                    <h4> ID: </h4>
                    <span> {id} </span>
                    <br />           <h4> Name: </h4>
                    <span> {user.name} </span>
                    <br />
                    <h4> Email: </h4>
                    <span> {user.email} </span>
                    <br />             <h4> Phone: </h4>
                    <span> {user.phone} </span>
                    <br />
                </div>

            </div>
        </div>
    )
}
