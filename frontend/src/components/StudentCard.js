import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import logo from './logo.png'; 
import './StudentCard.css'; 

const StudentCard = ({ student, onDelete, onLockMarks }) => {
  const areMarksComplete = student.Ideation !== null && student.Execution !== null && student.Viva !== null;

  return (
    <Card className="student-card">
      <Card.Img variant="top" src={logo} alt="Student Logo" className="student-img" />
      <Card.Body>
        <Card.Title>{student.Student_name}</Card.Title>
        <Card.Subtitle>Roll No: {student.Rollno}</Card.Subtitle>
        <Card.Text>
          Scores:
          <div className="scores-container">
            <Badge bg="info" text="dark">Ideation: {student.Ideation !== null ? student.Ideation : 'N/A'}/10</Badge>
            <Badge bg="success" text="dark">Execution: {student.Execution !== null ? student.Execution : 'N/A'}/10</Badge>
            <Badge bg="warning" text="dark">Viva: {student.Viva !== null ? student.Viva : 'N/A'}/10</Badge>
          </div>
        </Card.Text>
        <div className="actions-container">
          <Button variant="danger" onClick={onDelete}>Delete</Button>
          {student.marks_locked ? (
            <Badge bg="secondary">Marks Locked</Badge>
          ) : (
            <Button 
              variant="secondary" 
              disabled={!areMarksComplete}
              onClick={() => onLockMarks(student.Rollno)}
            >
              Lock Marks
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;
