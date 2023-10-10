import React, { useState, useEffect } from 'react';
import { get, post } from './Fetch1';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [formData, setFormData] = useState({
        UserName: '',
        SerialNumber: '',
        RAM: '',
        HDD: '',
        Processor: '',
        OS: 'Windows 10',
        Office: 'WPS',
        LanNo: '',
        AssetType: 'Laptop',
        Location: '',
        Designation: '',
    });

    const [error, setError] = useState('');
    const [token, setTokens] = useState('');
    const navigate = useNavigate();

    const onChangeInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

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
        
        try {
            const response = await post('saveAsset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 201) {
                console.log('Form data submitted successfully.');
                setFormData({
                    UserName: '',
                    SerialNumber: '',
                    RAM: '',
                    HDD: '',
                    Processor: '',
                    OS: 'Windows 10',
                    Office: 'WPS',
                    LanNo: '',
                    AssetType: 'Laptop',
                    Location: '',
                    Designation: '',
                });

                toast.success("Form data submitted successfully.");
                navigate('/asset');
            } else {
                console.error('Failed to submit form data:', response.message);
                setError(response.message || 'Failed to submit form data.');
            }

            if (response.status === 400) {
                toast.error(response.message || 'Fields has not beem filled , Please insert some records');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to submit form data.');
        }
    };


    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            setTokens(token);
        }
    }, []);

    return (
        <div className="dashboard-container">
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8'>
                        <form onSubmit={handleSubmit} className="form-container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className='form-group'>
                                        <label>Sr. Number:</label>
                                        <input
                                            className="form-control req_val"
                                            type="text"
                                            name="SerialNumber"
                                            value={formData.SerialNumber}
                                            onChange={onChangeInput}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>RAM:</label>
                                        <input
                                            className="form-control req_val"
                                            type="text"
                                            name="RAM"
                                            value={formData.RAM}
                                            onChange={onChangeInput}
                                        /></div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>HDD:</label>
                                        <input
                                            className="form-control req_val"
                                            type="text"
                                            name="HDD"
                                            value={formData.HDD}
                                            onChange={onChangeInput}
                                        /></div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Processor:</label>
                                        <input
                                            className="form-control req_val"
                                            type="text"
                                            name="Processor"
                                            value={formData.Processor}
                                            onChange={onChangeInput}
                                        /></div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>OS:</label>
                                        <select
                                            className="form-control req_val"
                                            name="OS"
                                            value={formData.OS}
                                            onChange={onChangeInput}
                                        >
                                            <option value="Windows 10">Windows 10</option>
                                            <option value="Windows 7">Windows 7</option>
                                            <option value="Windows 11">Windows 11</option>
                                            {/* Add more options for other OS versions */}
                                        </select></div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Office:</label>
                                        <select
                                            className="form-control req_val"
                                            name="Office"
                                            value={formData.Office}
                                            onChange={onChangeInput}
                                        >
                                            <option value="WPS">WPS</option>
                                            <option value="office365">office365</option>
                                            <option value="office7">office7</option>
                                            <option value="default">default</option>
                                            {/* Add more options for other Office versions */}
                                        </select></div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Lan No:</label>
                                        <input
                                            className="form-control req_val"
                                            type="text"
                                            name="LanNo"
                                            value={formData.LanNo}
                                            onChange={onChangeInput}
                                        /></div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Asset Type:</label>
                                        <select
                                            name="AssetType"
                                            className='form-control req_val'
                                            value={formData.AssetType}
                                            onChange={onChangeInput}
                                        >
                                            <option value="Laptop">Laptop</option>
                                            <option value="Desktop">Desktop</option>
                                            <option value="Macmini">Macmini</option>
                                            {/* Add more options for other Asset Types */}
                                        </select>
                                    </div></div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="Location">Location:</label>
                                        <input
                                            className='form-control'
                                            type="text"
                                            name="Location"
                                            value={formData.Location}
                                            onChange={onChangeInput}
                                        /></div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="Designation">Designation:</label>
                                        <input
                                            className='form-control'
                                            type="text"
                                            name="Designation"
                                            value={formData.Designation}
                                            onChange={onChangeInput}
                                        /></div>
                                </div>
                            </div>

                            <div className="form-group">
                                <button type="submit" className='btn btn-primary'>Submit</button>
                            </div>
                        </form>
                    </div>

                    <div className='col-md-4'>
                        <div className='form_left'>
                            <h3 className='heading'>Asset Dashboard</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <img src='assets/img/dasktop.png' className='img-fluid' />

                            <ul className='ul_list'>
                                <li><strong>Contact us</strong> : 9876543210</li>
                                <li><strong>E-Mail</strong> : info@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
