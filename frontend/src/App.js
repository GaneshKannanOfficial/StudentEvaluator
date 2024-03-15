import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AddStudentPage from './components/AddStudentPage';
import ViewStudents from './components/ViewStudents';
import AddMarks from './components/AddMarks';
import GenerateReport from './components/GenerateReport';
import Analysis from './components/Analysis'; 

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/add-student" />} />
        <Route path="/add-student" element={<AddStudentPage />} />
        <Route path="/view-students" element={<ViewStudents />} />
        <Route path="/add-marks" element={<AddMarks />} />
        <Route path="/generate-report" element={<GenerateReport />} />
        <Route path="/analysis" element={<Analysis />} /> 
      </Routes>
    </Layout>
  );
}

export default App;
