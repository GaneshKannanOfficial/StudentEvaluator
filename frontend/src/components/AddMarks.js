import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import './AddMarks.css'; 

function AddMarks() {

  const [rollNumber, setRollNumber] = useState('');
  const [ideationScore, setIdeationScore] = useState('');
  const [executionScore, setExecutionScore] = useState('');
  const [vivaScore, setVivaScore] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Validates the input scores
  const validateScores = () => {
    const scores = [ideationScore, executionScore, vivaScore].map(score => score === '' ? 0 : Number(score));
    return scores.every(score => !isNaN(score) && score >= 0 && score <= 10);
  };

  // Submits the form data
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate scores before proceeding
    if (!validateScores()) {
      setErrorMessage('Scores must be between 0 and 10.');
      return;
    }

    // Check if marks are locked
    try {
      const lockStatusResponse = await axios.get(`${process.env.REACT_APP_API_URL}/check-lock/${rollNumber}`);
      if (lockStatusResponse.data.marks_locked) {
        setErrorMessage('Marks for this roll number are locked and cannot be updated.');
        return;
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('Student not found.');
      } else {
        setErrorMessage('Failed to check lock status.');
      }
      return;
    }

    // If marks are not locked, proceed to add marks
    try {
      const addMarksResponse = await axios.post(`${process.env.REACT_APP_API_URL}/add-marks`, {
        rollNumber,
        ideationScore: ideationScore || null,
        executionScore: executionScore || null,
        vivaScore: vivaScore || null,
      });
      if (addMarksResponse.data) {
        alert('Marks added successfully!');
        setRollNumber('');
        setIdeationScore('');
        setExecutionScore('');
        setVivaScore('');
        setErrorMessage('');
      }
    } catch (addMarksError) {
      console.error('Error adding marks:', addMarksError);
      alert('Error adding marks. Please try again.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 container-custom">
      <Card className="card-custom">
        <Card.Body className="card-body-custom">
          <h3 className="text-center title-custom">Add or Update Marks</h3>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
              <Form.Label className="label-custom">Roll Number</Form.Label>
              <Form.Control
                className="form-control-custom"
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="Enter roll number"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="label-custom">Ideation Score</Form.Label>
              <Form.Control 
                className="form-control-custom"
                type="number" 
                value={ideationScore} 
                onChange={(e) => setIdeationScore(e.target.value)} 
                placeholder="0-10" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="label-custom">Execution Score</Form.Label>
              <Form.Control 
                className="form-control-custom"
                type="number" 
                value={executionScore} 
                onChange={(e) => setExecutionScore(e.target.value)} 
                placeholder="0-10" />
            </Form.Group>
 
            <Form.Group className="mb-3">
              <Form.Label className="label-custom">Viva Score</Form.Label>
              <Form.Control 
                className="form-control-custom"
                type="number" 
                value={vivaScore} 
                onChange={(e) => setVivaScore(e.target.value)} 
                placeholder="0-10" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 button-custom">
              Add Marks
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddMarks;



            