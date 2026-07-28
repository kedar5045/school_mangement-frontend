import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Sign from "./components/signin";
import DashboardLayout from './pages/DashboardLayout.js';
import Classes from './components/classes.js';
import Students from './components/students.js';
import Teachers from './components/teachers.js';
import Admissions from './components/Admissions.js';
import AddAdmission from "./components/AddAdmission";
import Enquiry from './components/enquiry.js';
import AddStudent from "./components/AddStudent";
import AddTeacher from "./components/AddTeacher";
import AddEnquiry from "./components/AddEnquiry";

import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        <Route path="/signin" element={<Sign />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
          <Route path="classes" element={<Classes />} />
          <Route path="students" element={<Students />} />
          <Route path="students/add" element={<AddStudent />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="teachers/add" element={<AddTeacher />} />
          <Route path="teachers/view/:id" element={<AddTeacher />} />
          <Route path="teachers/edit/:id" element={<AddTeacher />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="admissions/new" element={<AddAdmission />} />
          <Route path="admissions/new" element={<AddAdmission />} />

          <Route path="admissions/view/:id" element={<AddAdmission />} />

          <Route path="admissions/edit/:id" element={<AddAdmission />} />
          <Route path="enquiry" element={<Enquiry />} />
          <Route path="enquiry/new" element={<AddEnquiry />} />
          <Route path="enquiry/view/:id" element={<AddEnquiry />} />
          <Route path="enquiry/edit/:id" element={<AddEnquiry />} />
          <Route path="teachers/add" element={<AddTeacher />} />
          <Route path="teachers/add" element={<AddTeacher />} />
          <Route path="teachers/view/:id" element={<AddTeacher />} />
          <Route path="teachers/edit/:id" element={<AddTeacher />} />
          <Route path="/dashboard/students/add" element={<AddStudent />} />
          <Route path="/dashboard/students/view/:id" element={<AddStudent />} />
          <Route path="/dashboard/students/edit/:id" element={<AddStudent />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;