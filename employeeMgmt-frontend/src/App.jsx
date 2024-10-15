import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/updateEmployee';
import DeleteEmployee from './components/deleteEmployee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/update-employee/:id" element={<EditEmployee />} />
        <Route path="/delete-employee/:id" element={<DeleteEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
