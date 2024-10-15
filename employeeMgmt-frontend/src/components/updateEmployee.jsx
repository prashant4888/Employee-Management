import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateEmployee = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();


  const handleIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const fetchEmployee = async () => {
    setLoading(true);
    setError('');
    setFetching(true);

    try {
      const response = await axios.get(`http://localhost:8080/api/employees/${employeeId}`);
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
      setError('An error occurred while fetching employee data or employee not found.');
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeId.trim()) {
      alert('Please enter a valid Employee ID before updating.');
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/employees/${employeeId}`, employee);
      alert('Employee updated successfully!');
      navigate('/');

      // Redirect or perform any additional actions
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Please enter a valid Employee ID before updating.');
    }
  };

  return (
    <div >
      <h2>Edit Employee</h2>

      <div>
        <label>Enter Employee ID:</label>
        <input
          type="text"
          placeholder="Enter Employee ID"
          value={employeeId}
          onChange={handleIdChange}
        />
        {/* <button onClick={fetchEmployee} disabled={loading || fetching}>
          {loading || fetching ? 'Fetching...' : 'Fetch Employee Details'}
        </button> */}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {employeeId && !error && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={employee.name || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={employee.email || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={employee.phone || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-container">
          <button type="submit">Update Employee</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateEmployee;
