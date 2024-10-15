import React, { useEffect, useState } from 'react';
import EmployeeService from '../services/EmployeeService';
import AddEmployee from './AddEmployee';
import { useNavigate } from 'react-router-dom';


function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    EmployeeService.getAllEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });


  };


  const goToAddEmployee = () => {
    navigate('/addEmployee'); // Adjust the path to match your routing setup
  };
  const goToUpdateEmployeeUpd = (employeeId) => {
    navigate('/update-employee/:id'); // Navigate to the update page with the employee ID
  };
  const goToUpdateEmployeeDel = (employeeId) => {
    navigate('/delete-employee/:id'); // Navigate to the update page with the employee ID
  };


  return (
    <div className="container">
    <div className="myTable">
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.phone}</td>
              <td>{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={goToAddEmployee} style={{ marginTop: '20px' }}>
        Add Employee
      </button>
      <button onClick={goToUpdateEmployeeUpd} style={{ marginTop: '20px' }}>
        Update Employee
      </button>
      <button onClick={goToUpdateEmployeeDel} style={{ marginTop: '20px' }}>
        Delete Employee
      </button>

    </div>
    </div>
  );
}

export default EmployeeList;
