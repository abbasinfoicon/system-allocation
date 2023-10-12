// AddUserForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// const BASE_URL = 'http://localhost:3001/api/';
const BASE_URL = 'https://cooperative-erin-slacks.cyclic.app/api/';

const AddUserForm = () => { //{ onUserAdded }
  const navigate = useNavigate();
  const [usrData, setUsrData] = useState([]);
  const [newUser, setNewUser] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const onChangeInput = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });

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

    if (newUser.userName && newUser.email && newUser.phoneNumber && newUser.password) {
      try {
        const response = await fetch(BASE_URL +'/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        if (response.status === 201) {

          //  /onUserAdded(newUser.userName); // Notify the parent component of the new user name

          setNewUser({
            userName: '',
            email: '',
            phoneNumber: '',
            password: '',
          });

          toast.success("User added successfully.");
          fetchUsrData();
        } else {
          toast.error("User added successfully.");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      toast.error("Fields has not beem filled , Please insert some records");
    }
  };


  const fetchUsrData = async () => {
    try {
      const response = await fetch(BASE_URL +'/getUsers');
      if (response.status === 200) {
        const userData = await response.json();
        
        setUsrData(userData.users); // Assuming your API returns an array of user objects
      } else {
        console.error('Failed to fetch employee options.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    fetchUsrData();
  }, []);

  return (
    <div className='dashboard-container'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-5'>
            <h3 className='heading'>Add User</h3>
            <form onSubmit={handleSubmit} className='form-container'>
              <div className="form-group">
                <label>User Name:</label>
                <input
                  className='form-control req_val'
                  type="text"
                  name="userName"
                  value={newUser.userName}
                  onChange={onChangeInput}
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input
                  className='form-control req_val'
                  type="email"
                  name="email"
                  value={newUser.email}
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
                  value={newUser.phoneNumber}
                  onChange={onChangeInput}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  className='form-control req_val'
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={onChangeInput}
                />
              </div>
              <div className="form-group">
                <button type="submit" className='btn btn-primary'>Submit</button>
              </div>
            </form>
          </div>

          <div className='col-md-7'>
            <h3 className='heading'>All Users</h3>
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
                  {usrData.length > 0 ? (
                    usrData?.map((item, i) => (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <th>{item.name}</th>
                        <th>{item.email}</th>
                        <th>{item.phoneNumber}</th>
                        <th>
                          <button className='btn btn-primary btn_update'>Update</button>
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
