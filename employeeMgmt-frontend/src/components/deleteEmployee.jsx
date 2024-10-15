import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteEmployee = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle change for employee ID input
  const handleIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  // Handle form submission to delete employee
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!employeeId.trim()) {
      alert('Please enter a valid Employee ID.');
      return;
    }

    setLoading(true);
    setError(''); // Clear previous errors

    try {
      await axios.delete(`http://localhost:8080/api/employees/${employeeId}`);
      alert('Employee deleted successfully!');
      setEmployeeId(''); // Clear the input field
      navigate('/'); // Navigate back to the main page or desired route
    } catch (error) {
      console.error('Error deleting employee:', error);
      setError('Failed to delete employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Delete Employee</h2>

      {/* Input to get Employee ID */}
      <div>
        <label>Enter Employee ID:</label>
        <input
          type="text"
          placeholder="Enter Employee ID"
          value={employeeId}
          onChange={handleIdChange}
        />
        <button onClick={handleDelete} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete Employee'}
        </button>
      </div>

      {/* Show error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DeleteEmployee;
