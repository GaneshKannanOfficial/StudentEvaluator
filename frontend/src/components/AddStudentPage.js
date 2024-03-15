
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card } from 'react-bootstrap';
import './AddStudentPage.css'; 

function AddStudentPage() {

  const [studentName, setStudentName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [email, setEmail] = useState('');
  const [mentorId, setMentorId] = useState(''); 

  const handleSubmit = async (event) => {
    event.preventDefault();


    if (!studentName || !rollNumber || !email || !mentorId) {
      alert('Please fill in all fields.');
      return;
    }

    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/add-student`, {
        studentName,
        rollNumber,
        email,
        mentorId, 
      });

      alert(response.data.message || 'Student added successfully!');
      setStudentName('');
      setRollNumber('');
      setEmail('');
      setMentorId('');
    } catch (error) {
      alert(error.response?.data?.message || 'The student is already assigned to another mentor or limit exceeded for the mentor.');
      console.error('Error adding student:', error.response?.data || error);
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 container-custom">
      <Card className="card-custom">
      <Card.Body className="card-body-custom">
  <h3 className="text-center title-custom">Add Student</h3> 
  <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3">
      <Form.Label className="label-custom">Student Name</Form.Label>
      <Form.Control 
        className="form-control-custom" 
        type="text" 
        value={studentName} 
        onChange={e => setStudentName(e.target.value)} 
        placeholder="Enter student's name" 
        required />
    </Form.Group>
    
    <Form.Group className="mb-3">
      <Form.Label className="label-custom">Roll Number</Form.Label>
      <Form.Control 
        className="form-control-custom" 
        type="text" 
        value={rollNumber} 
        onChange={e => setRollNumber(e.target.value)} 
        placeholder="Enter roll number" 
        required />
    </Form.Group>
    
    <Form.Group className="mb-3">
      <Form.Label className="label-custom">Email</Form.Label>
      <Form.Control 
        className="form-control-custom" 
        type="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        placeholder="Enter student's email" 
        required />
    </Form.Group>
    
    <Form.Group className="mb-3">
      <Form.Label className="label-custom">Mentor ID</Form.Label>
      <Form.Control 
        className="form-control-custom" 
        type="number" 
        value={mentorId} 
        onChange={e => setMentorId(e.target.value)} 
        placeholder="Enter mentor ID" 
        required />
    </Form.Group>
    <Button variant="primary" type="submit" className="w-100 button-custom">Add Student</Button>
  </Form>
</Card.Body>

      </Card>
    </Container>
  );
}

export default AddStudentPage;
