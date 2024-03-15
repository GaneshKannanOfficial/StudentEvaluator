import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaUsers, FaMarker, FaFilePdf, FaChartBar } from 'react-icons/fa';

const SideNav = () => {
  return (
    <Nav className="flex-column vh-100 p-3" style={{backgroundColor: '#000', color: '#fff'}}>
      <Nav.Link as={Link} to="/add-student" className="text-white d-flex align-items-center mb-2">
        <FaUserPlus className="me-2" /> Add Student
      </Nav.Link>
      <Nav.Link as={Link} to="/view-students" className="text-white d-flex align-items-center mb-2">
        <FaUsers className="me-2" /> View Students
      </Nav.Link>
      <Nav.Link as={Link} to="/add-marks" className="text-white d-flex align-items-center mb-2">
        <FaMarker className="me-2" /> Add Marks
      </Nav.Link>
      <Nav.Link as={Link} to="/generate-report" className="text-white d-flex align-items-center mb-2">
        <FaFilePdf className="me-2" /> Generate Report
      </Nav.Link>
      <Nav.Link as={Link} to="/analysis" className="text-white d-flex align-items-center mb-2">
        <FaChartBar className="me-2" /> Analysis
      </Nav.Link>
    </Nav>
  );
};

export default SideNav;
