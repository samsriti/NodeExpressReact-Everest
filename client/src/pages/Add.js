import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import {useNavigate, useParams, Link} from 'react-router-dom';
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    name: "",
    email:"",
    phone:""
}
export default function Add() {
   
    const [employee, setEmployee] = useState(initialState);

    const {name, email, phone} = employee;

    const {id} = useParams();

    useEffect(()=>{
      axios.get(`http://localhost:5000/api/get/${id}`)
      .then((resp)=> setEmployee({...resp.data[0]}))
    }, [id])

    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!name || !email || !phone){
            toast.error("Please provide values!",{
                toastId:'empty-fields-toast',
                className: 'custom-toast',
            });
        }
        else{
          if(!id){
            axios.post("http://localhost:5000/api/post", {
                name,
                email,
                phone
            }).then(()=>{
                setEmployee({name:"", email:"", phone:""})
            }).catch((err)=>{
                toast.error(err.response.data);
            });
            
          }else{
            axios.put(`http://localhost:5000/api/updateEmployee/${id}`, {
                name,
                email,
                phone
            }).then(()=>{
                setEmployee({name:"", email:"", phone:""})
            }).catch((err)=>{
                toast.error(err.response.data);
            });

          }
            
            setTimeout(()=>{
                toast.success("Employee Updated!");
                navigate("/");
            }, 500)
        }
    };

    const handleChange= (e)=>{
        const {name, value} = e.target;
        setEmployee({...employee, [name]:value});
    };

  return (
    <>
    <NavBar> </NavBar>
    <div className="container card my-3" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4 mt-2">Add New Employee</h3>
      <form className="my-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="name" name='name' value={name||""} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="email" name='email' value={email||""} onChange={handleChange} />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input type="text" className="form-control" id="phone" name='phone' value={phone||""} onChange={handleChange}/>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success mx-2" value={id? "Update" : "Save"}>
            Submit
          </button>
          <Link to={"/"}>
            <button className='btn btn-primary'> Home </button>
          </Link>
        </div>
        
      </form>
    </div>
    </>
  );
}
