import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// const BASE_URL = 'http://localhost:3001/api/';
const BASE_URL = 'https://cooperative-erin-slacks.cyclic.app/api/';

const DashboarManage = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [formData, setFormData] = useState({
    UserName: '',
    startDate: '',
    endDate: '',
  });

  const [formOldData, setOldFormData] = useState({
    UserName: '',
    startDate: '',
    endDate: '',
    oldUserName: '',
    oldStartDate: '',
    oldEndDate: '',
  });

  const [assetData, setAssetData] = useState({});
  const [error, setError] = useState('');
  const [isUpdateMode, setIsUpdateMode] = useState(false); // State to track Update mode
  const [userOptions, setUserOptions] = useState([]); // State to store user options


  const id = useParams();

  const handleAddUserClick = () => {
    navigate('/adduser'); // Use the appropriate route path for your AddUserForm component
  };

  const handleUpdateHistory = async () => {
    try {
      let data = {}
      data.UserName = formData.UserName;
      data.startDate = formData.startDate;
      data.endDate = formData.endDate;
      data.oldUserName = formOldData.UserName;
      data.oldStartDate = formOldData.startDate;
      data.oldEndDate = formOldData.endDate;

      const response = await fetch(`${BASE_URL}/updateHistory/${id.id}`, {
        method: 'PUT', // Use the appropriate HTTP method (PUT or PATCH) for updating data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send the updated data in the request body
      });

      if (response.status === 200) {
        setFormData({
          UserName: '',
          startDate: '',
          endDate: '',
        }); // Clear all fields
        fetchAssetData(); // Fetch updated asset data
        setIsUpdateMode(false);
        toast("History record updated successfully.");
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update history record.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to update history record.');
    }
  };

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

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


    if (formData.UserName && formData.startDate) {
      if (assetData.empHistory.length) {
        if ((assetData.empHistory[0].endDate).length == "undifined" || (assetData.empHistory.slice(-1)[0].endDate).length == 0) {
          toast.error("This system is already assigned to another user.");
        } else {
          try {
            const response = await fetch(BASE_URL + '/saveHistory/' + id.id, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });

            if (response.status == 201) {
              setFormData({
                UserName: '',
                startDate: '',
                endDate: '',
              }); // Clear all fields
              fetchAssetData(); // Fetch updated asset data
              toast.success("Form data submitted successfully.");

              const inputVal = document.getElementsByClassName("form-control");
              for (var i = 0; i < inputVal.length; i++) {
                if (inputVal[i].value) {
                  inputVal[i].className = "form-control req_val";
                }
              }

            } else {
              const errorData = await response.json();
              setError(errorData.error || 'Failed to submit form data.');
            }
          } catch (error) {
            console.error('Error:', error);
            setError('Failed to submit form data.');
          }
        }
      } else {
        try {
          const response = await fetch(BASE_URL + '/saveHistory/' + id.id, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (response.status == 201) {
            setFormData({
              UserName: '',
              startDate: '',
              endDate: '',
            }); // Clear all fields
            fetchAssetData(); // Fetch updated asset data
            toast.success("Form data submitted successfully.");

            const inputVal = document.getElementsByClassName("form-control");
            for (var i = 0; i < inputVal.length; i++) {
              if (inputVal[i].value) {
                inputVal[i].className = "form-control req_val";
              }
            }

          } else {
            const errorData = await response.json();
            setError(errorData.error || 'Failed to submit form data.');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('Failed to submit form data.');
        }
      }
    } else {
      toast.error("Fields has not beem filled , Please insert some records");
    }
  };

  const fetchAssetData = async () => {
    try {
      const response = await fetch(BASE_URL + '/getsystemuser/' + id.id);
      if (response.status == 201) {
        const data = await response.json();
        setAssetData(data);
      } else {
        setError('Failed to fetch asset data.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch asset data.');
    }
  };

  // fetchUserOptions for select option
  const fetchUserOptions = async () => {
    try {
      const response = await fetch(BASE_URL + '/getEmps'); // Replace with your API endpoint to fetch employee

      if (response.status === 200) {
        const employeeData = await response.json();

        setUserOptions(employeeData.employee); // Assuming your API returns an array of user objects
      } else {
        console.error('Failed to fetch employee options.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchAssetData();
    fetchUserOptions(); // Fetch initial asset data 
  }, []);
  // Function to update the user options when a new user is added
  const handleUserAdded = (newUserName) => {
    setUserOptions([...userOptions, newUserName]);
  };


  const aadata = assetData?.empHistory;

  // Function to populate the form fields with existing data when the "Update" button is clicked
  const handleUpdateClick = (asset) => {
    setIsUpdateMode(true); // Set Update mode to true
    setFormData({
      UserName: asset.UserName,
      startDate: asset.startDate,
      endDate: asset.endDate,
    });
    setOldFormData({
      UserName: asset.UserName,
      startDate: asset.startDate,
      endDate: asset.endDate,
    });
  };

  // Function to handle the "Cancel Update" button click
  const handleCancelUpdateClick = () => {
    setIsUpdateMode(false); // Set Update mode to false
    setFormData({
      UserName: '',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <div className="dashboard-container">
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'>
            <div className='add_user'>
              <h3 className='heading'>Asset Allocated Dashboard</h3>
              <form onSubmit={handleSubmit} className="form-container">
                <input type="hidden" name="id" value={id} />

                <div className="form-row">
                  <div className="form-group">
                    <label>User Name:</label>
                    <select
                      className='form-control req_val'
                      name="UserName"
                      value={formData.UserName}
                      onChange={onChangeInput}
                    >
                      <option value="">Select User Name</option>
                      {userOptions?.map((option, i) => (
                        <option key={i} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Start date:</label>
                    <input
                      className='form-control req_val'
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={onChangeInput}
                    />
                  </div>

                  <div className="form-group">
                    <label>End date:</label>
                    <input
                      className='form-control'
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={onChangeInput}
                    />
                  </div>
                </div>

                <div className="form-submit-button mt-4">
                  {!isUpdateMode ? (
                    <button type="submit" className='btn btn-primary'>Submit</button>
                  ) : (
                    <button type="button" className='btn btn-primary' onClick={handleUpdateHistory}>Update</button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className='col-md-9'>
            <div className="asset-grid">
              <h3 className='heading'>Asset Data</h3>
              <div className='table-responsive custom-table'>
                <table className='table table-hover table-striped table-bordered'>
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Start date</th>
                      <th>End date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aadata?.map((asset) => (
                      <tr key={asset._id}>
                        <td>{asset.UserName}</td>
                        <td>{asset.startDate}</td>
                        <td>{asset.endDate}</td>
                        <td>
                          <button
                            className='btn btn-primary btn_update'
                            disabled={asset.endDate ? true : false}
                            onClick={() => {
                              handleUpdateClick(asset);
                            }}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default DashboarManage;
