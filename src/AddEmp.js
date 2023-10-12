// AddUserForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// const BASE_URL = 'http://localhost:3001/api/';
const BASE_URL = 'https://cooperative-erin-slacks.cyclic.app/api/';

const AddUserForm = () => { //{ onUserAdded }
  const navigate = useNavigate();
  const [empData, setEmpData] = useState([]);

  const [newEmp, setNewEmp] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
  });

  const onChangeInput = (e) => {
    setNewEmp({ ...newEmp, [e.target.name]: e.target.value });

    if (e.target.value.length == 0) {
      e.target.className = 'form-control is-invalid';
    } else {
      e.target.className = 'form-control';
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputVal = e.target.getElementsByClassName("req_val");
    for (var i = 0; i < inputVal.length; i++) {
      if (inputVal[i].value) {
        inputVal[i].className = "form-control req_val";
      } else {
        inputVal[i].className = "form-control req_val is-invalid";
      }
    }

    if (newEmp.userName && newEmp.email && newEmp.phoneNumber) {
      try {
        const response = await fetch(BASE_URL + '/addEmp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(newEmp),
        });

        if (response.status === 201) {
          setNewEmp({
            userName: '',
            email: '',
            phoneNumber: '',
          });

          toast.success("Employee added successfully.");
          fetchEmpData();
        } else {
          toast.error("Employee added successfully.");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      toast.error("Fields has not beem filled , Please insert some records");
    }
  };

  const fetchEmpData = async () => {
    try {
      const response = await fetch(BASE_URL + '/getEmps');
      if (response.status === 200) {
        const employeeData = await response.json();
        setEmpData(employeeData.employee); // Assuming your API returns an array of user objects
      } else {
        console.error('Failed to fetch employee options.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    fetchEmpData();
  }, []);

  return (
    <div className='dashboard-container'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-5'>
            <h3 className='heading'>Add Employee</h3>
            <form onSubmit={handleSubmit} className='form-container'>
              <div className="form-group">
                <label>Employee Name:</label>
                <input
                  className='form-control req_val'
                  type="text"
                  name="userName"
                  value={newEmp.userName}
                  onChange={onChangeInput}
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input
                  className='form-control req_val'
                  type="email"
                  name="email"
                  value={newEmp.email}
                  onChange={onChangeInput}
                />
              </div>

              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  className='form-control req_val'
                  type="number"
                  maxLength="10"
                  name="phoneNumber"
                  value={newEmp.phoneNumber}
                  onChange={onChangeInput}
                />
              </div>
              <div className="form-group">
                <button type="submit" className='btn btn-primary'>Submit</button>
              </div>
            </form>
          </div>


          <div className='col-md-7'>
            <h3 className='heading'>All Employee list</h3>
            <div className='form-container'>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {empData.length > 0 ? (
                    empData.map((item, i) => (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <th>{item.name}</th>
                        <th>{item.email}</th>
                        <th>{item.phoneNumber}</th>
                        <th>
                          <button className='btn btn-primary btn_view'><i className="far fa-eye"></i></button>
                          <button className='btn btn-success btn_update mx-1px'><i className="fas fa-pencil-alt"></i></button>
                          <button className='btn btn-danger btn_delete'><i className="fas fa-trash-alt"></i></button>
                        </th>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No data available</td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
