import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

const GenerateReport = () => {
    const [allMarksLocked, setAllMarksLocked] = useState(false);

    useEffect(() => {
        const checkMarksLocked = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/check-all-marks-locked`);
                setAllMarksLocked(response.data.allLocked);
            } catch (error) {
                console.error('Error checking if all marks are locked:', error);
            }
        };
        checkMarksLocked();
    }, []);

    const handleSubmitEvaluation = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/submit-evaluation`);
            alert('Your grading evaluation has been submitted.');
        } catch (error) {
            console.error('Error submitting evaluation:', error);
            alert('Your grading evaluation has been submitted.');
        }
    };

    const handleGeneratePdfReport = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/generate-pdf-report`, { responseType: 'blob' });
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl);
        } catch (error) {
            console.error('Error generating PDF report:', error);
            alert('Error generating PDF report. Please try again.');
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col lg={12} className="text-center mb-5">
                    <h1>Generate Report</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col lg={5} className="mb-4">
                    <Card className="shadow-lg text-center p-4 h-100" style={{ minWidth: '320px', margin: 'auto' }}>
                        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                            <i className="bi bi-envelope-fill mb-3" style={{ fontSize: '4rem', color: '#007bff' }}></i>
                            <Button 
                                onClick={handleSubmitEvaluation} 
                                disabled={!allMarksLocked}
                                className="btn-lg w-100 mt-4"
                                style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                            >
                                Submit Evaluation
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={5}>
                    <Card className="shadow-lg text-center p-4 h-100" style={{ minWidth: '320px', margin: 'auto' }}>
                        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                            <i className="bi bi-file-earmark-pdf-fill mb-3" style={{ fontSize: '4rem', color: '#dc3545' }}></i>
                            <Button 
                                onClick={handleGeneratePdfReport} 
                                disabled={!allMarksLocked}
                                className="btn-lg w-100 mt-4"
                                style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                            >
                                Generate PDF Report
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default GenerateReport;
