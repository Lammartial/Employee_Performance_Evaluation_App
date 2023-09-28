import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Login} from "./screens/Login";
import {AdminWelcome } from "./screens/AdminWelcome";
import {MemberWelcome} from "./screens/MemberWelcome";
import {AdminHome} from "./screens/AdminHome";
import {MemberHome} from "./screens/MemberHome";
import {AdminCalendar} from "./screens/AdminCalendar";
import {AdminEvaluations} from "./screens/AdminEvaluations";
import {AdminUsers} from "./screens/AdminUsers";
import {AdminUserDetail} from "./screens/AdminUserDetail";
import { AdminUserEdit } from "./screens/AdminUserEdit";

function App() {
  
  return (

      <Router>
        <Routes>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/member" element={<MemberHome />} />
            <Route path="/admin/welcome" element={<AdminWelcome />} />
            <Route path="/member/welcome" element={<MemberWelcome />} />
            <Route path="/admin/calendar" element={<AdminCalendar />} />
            <Route path="/admin/evaluations" element={<AdminEvaluations />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/users/:userId" element={<AdminUserDetail />} />
            <Route path="/admin/users/edit/:userId" element={<AdminUserEdit />} />

            <Route path="/login" element={<Login />} />

        </Routes>
      </Router>

  );
}

export default App;
