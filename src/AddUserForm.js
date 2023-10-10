// AddUserForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddUserForm = () => { //{ onUserAdded }
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
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

    console.log("first,", newUser.userName)

    if (newUser.userName && newUser.email && newUser.phoneNumber) {
      try {
        const response = await fetch('https://ill-slug-pea-coat.cyclic.app:3001/api/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(newUser),
        });

        if (response.status === 201) {
          console.log('User added successfully.');

          //  /onUserAdded(newUser.userName); // Notify the parent component of the new user name

          setNewUser({
            userName: '',
            email: '',
            phoneNumber: '',
          });

          toast.success("User added successfully.");
          navigate('/asset');
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
                <button type="submit" className='btn btn-primary'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
