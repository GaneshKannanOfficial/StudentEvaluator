import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Table } from 'react-bootstrap';

const Analysis = () => {
    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/students`);
                setStudentData(response.data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchStudents();
    }, []);

    const chartData = {
        labels: studentData.map(student => student.Rollno),
        datasets: [
            {
                label: 'Ideation',
                data: studentData.map(student => student.Ideation),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Execution',
                data: studentData.map(student => student.Execution),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Viva',
                data: studentData.map(student => student.Viva),
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    // Calculate the best and least marks
    const bestAndLeast = studentData.reduce((acc, student) => {
        const totalMarks = [student.Ideation, student.Execution, student.Viva].reduce((sum, mark) => sum + (mark || 0), 0);
        if (!acc.best || totalMarks > acc.best.marks) {
            acc.best = { rollNo: student.Rollno, marks: totalMarks };
        }
        if (!acc.least || totalMarks < acc.least.marks) {
            acc.least = { rollNo: student.Rollno, marks: totalMarks };
        }
        return acc;
    }, { best: null, least: null });

    return (
        <div>
            <div style={{ height: '500px', marginBottom: '50px' }}>
                <Bar data={chartData} options={chartOptions} />
            </div>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Roll Number</th>
                        <th>Marks</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Best Marks</td>
                        <td>{bestAndLeast.best?.rollNo}</td>
                        <td>{bestAndLeast.best?.marks}</td>
                    </tr>
                    <tr>
                        <td>Least Marks</td>
                        <td>{bestAndLeast.least?.rollNo}</td>
                        <td>{bestAndLeast.least?.marks}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default Analysis;
 