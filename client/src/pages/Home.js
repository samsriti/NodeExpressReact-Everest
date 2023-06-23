import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import "./Home.css";
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'
import NavBar from './NavBar';

export default function Home() {
    const [employees, setEmployees] = useState([]);
    const nav = useNavigate();
    const loadData = async () => {
        const result = await axios.get("http://localhost:5000/api/get");
        setEmployees(result.data)

    }

    useEffect(() => {
        loadData();
    }, []);

    const deleteEmployee = (id)=>{
        if(window.confirm("Are you sure to delete this employee detail?"))
        {
            axios.delete(`http://localhost:5000/api/delete/${id}`) ;
            toast.success("Contact deleted successfully!");
            setTimeout(()=>  
            { 
                nav("/")
            });
        }else{
            setTimeout(()=> nav("/"))
        }
    }

    return (
        <>
        <NavBar> </NavBar>
            <div className='container my-3'>
                <div className='d-flex justify-content-between my-3'>
                    <h3> List of Employees</h3>
                    <Link to={"/addEmployee"}>   <button className="btn btn-primary ">Add Employee</button> </Link>
                </div>
                <table class="table table-hover">
                    <thead className='table-primary'>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index= index+1}</th>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td >
                                        <Link to={`viewEmployee/${employee.id}`}><button className='btn btn-success mx-2'> View  </button></Link>
                                        <Link to={`/updateEmployee/${employee.id}`}> 
                                        <button className='btn btn-warning mx-2'> Edit  </button>
                                        </Link>
                                        <Link to={`/delete/${employee.id}`}> 
                                        <button className='btn btn-danger' onClick={()=> deleteEmployee(employee.id)}> Delete  </button> 
                                        </Link>
                                    </td>
                                </tr>

                            )
                        })}

                    </tbody>
                </table>
            </div>
        </>
    )
}
