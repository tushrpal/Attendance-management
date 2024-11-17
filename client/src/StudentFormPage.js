import React, { useState } from 'react';
import Axios from 'axios';
import './StudentForm.css';

const URL = "https://mern-attendance-app-api.onrender.com";

const StudentFormPage = () => {
  const [insertStudent, setInsertStudent] = useState('');
  const [formData, setFormData] = useState({
    Name: '',
    Register_number: '',
    Year_of_studying: '',
    Branch_of_studying: '',
    Date_of_Birth: '',
    Gender: '',
    Blood_Group: '',
    Aadhar_number: '',
    Mobile_number: '',
    Email_id: '',
  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post(`${URL}/form/insert`, formData);
      console.log('Student added successfully:', response.data);
      setInsertStudent('Student added successfully');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div>
      <h2>Student Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          required
        />

        <label>Register Number:</label>
        <input
          type="text"
          name="Register_number"
          value={formData.Register_number}
          onChange={handleChange}
          required
        />

        <label>Year of Studying:</label>
        <input
          type="text"
          name="Year_of_studying"
          value={formData.Year_of_studying}
          onChange={handleChange}
        />

        <label>Branch of Studying:</label>
        <input
          type="text"
          name="Branch_of_studying"
          value={formData.Branch_of_studying}
          onChange={handleChange}
        />

        <label>Date of Birth:</label>
        <input
          type="date"
          name="Date_of_Birth"
          value={formData.Date_of_Birth}
          onChange={handleChange}
        />

        <label>Gender:</label>
        <select
          name="Gender"
          value={formData.Gender}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Blood Group:</label>
        <input
          type="text"
          name="Blood_Group"
          value={formData.Blood_Group}
          onChange={handleChange}
        />

        <label>Aadhar Number:</label>
        <input
          type="text"
          name="Aadhar_number"
          value={formData.Aadhar_number}
          onChange={handleChange}
        />

        <label>Mobile Number:</label>
        <input
          type="text"
          name="Mobile_number"
          value={formData.Mobile_number}
          onChange={handleChange}
        />

        <label>Email ID:</label>
        <input
          type="email"
          name="Email_id"
          value={formData.Email_id}
          onChange={handleChange}
        />

     
        <button type="submit">Add Student</button>
        {insertStudent && <p>{insertStudent}</p>}
      </form>
    </div>
  );
};

export default StudentFormPage;
