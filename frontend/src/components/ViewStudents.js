import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentCard from './StudentCard';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/students`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleDelete = async (rollNo) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/delete-student/${rollNo}`);
      fetchStudents(); 
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student');
    }
  };

  const onLockMarks = async (rollNo) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/lock-marks/${rollNo}`);
      if (response.data) {
        alert('Marks locked successfully!');
        fetchStudents(); 
      }
    } catch (error) {
      console.error('Error locking marks:', error);
      alert('Error locking marks. Please try again.');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredStudents = students.filter(student => {
    if (filter === 'withMarks') {
      return student.Ideation !== null && student.Execution !== null && student.Viva !== null;
    } else if (filter === 'withoutMarks') {
      return student.Ideation === null || student.Execution === null || student.Viva === null;
    }
    return true;
  }).filter(student =>
    student.Student_name.toLowerCase().includes(searchTerm) ||
    student.Rollno.toString().includes(searchTerm)
  );

  return (
    <Container style={{ marginTop: '2rem', paddingBottom: '2rem' }}>
      <Row className="justify-content-between mb-4">
        <Col md={8}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search by name or roll number..."
              onChange={handleSearchChange}
            />
            <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
          </InputGroup>
        </Col>
        <Col md={4} className="text-end">
          <Button variant="outline-primary" onClick={() => setFilter('withMarks')} className="me-2">
            With Marks
          </Button>
          <Button variant="outline-secondary" onClick={() => setFilter('withoutMarks')} className="me-2">
            Without Marks
          </Button>
          <Button variant="outline-info" onClick={() => setFilter('all')}>
            Show All
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
        {filteredStudents.length > 0 ? (
          filteredStudents.map(student => (
            <Col key={student.Rollno}>
              <StudentCard 
                student={student}
                onDelete={() => handleDelete(student.Rollno)}
                onLockMarks={() => onLockMarks(student.Rollno)}
              />
            </Col>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </Row>
    </Container>
  );
};

export default ViewStudents;
