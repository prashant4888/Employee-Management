import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const saveEmployee = async (e) => {
    e.preventDefault();
    const employee = { name, phone, email };
    
    try {
      const response = await fetch('http://localhost:8080/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Failed to save employee');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div class="mycontainer">
      <h2>Add Employee</h2>
      <form onSubmit={saveEmployee}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div class="button-container">
        <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
