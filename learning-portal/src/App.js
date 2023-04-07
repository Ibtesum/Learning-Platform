import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Student Section Imports
import StudentLogin from "./sections/studentPortal/pages/StudentLogin";
import StudentRegistration from "./sections/studentPortal/pages/StudentRegistration";
import Leaderboard from "./sections/studentPortal/pages/Leaderboard";
import CoursePlayer from "./sections/studentPortal/pages/CoursePlayer";
import Quiz from "./sections/studentPortal/pages/Quiz";
// Admin Section imports
import AdminLogin from "./sections/adminPortal/pages/AdminLogin";
import Dashboard from "./sections/adminPortal/pages/Dashboard";
import Assignment from "./sections/adminPortal/pages/Assignment";
import AssignmentMark from "./sections/adminPortal/pages/AssignmentMark";
import Quizzes from "./sections/adminPortal/pages/Quizzes";
import Videos from "./sections/adminPortal/pages/Videos";
import AddVideo from "./sections/adminPortal/components/AddVideo";
// Custom hooks for student and admin authentication checking
import useAdminAuthCheck from "./sections/adminPortal/hooks/useAdminAuthCheck";
import useStudentAuthCheck from "./sections/studentPortal/hooks/useStudentAuthCheck";
import AddAssignment from "./sections/adminPortal/components/AddAssignment";
import AddQuiz from "./sections/adminPortal/components/AddQuiz";

function App() {
  const studentAuthCheck = useStudentAuthCheck();

  const adminAuthCheck = useAdminAuthCheck();

  console.log(studentAuthCheck, adminAuthCheck);

  return !studentAuthCheck && !adminAuthCheck ? (
    <Router>
      <Routes>
        // Student Routes
        <Route exact path="/" element={<StudentLogin />} />
        <Route path="/register" element={<StudentRegistration />} />
        // Admin Routes
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </Router>
  ) : studentAuthCheck && !adminAuthCheck ? (
    <Router>
      <Routes>
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/course-player" element={<CoursePlayer />} />
        <Route path="/course-player/:vId" element={<CoursePlayer />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  ) : adminAuthCheck && !studentAuthCheck ? (
    <Router>
      <Routes>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/assignment" element={<Assignment />} />
        <Route
          path="/admin/assignment/add-assignment"
          element={<AddAssignment />}
        />
        <Route path="/admin/assignment-mark" element={<AssignmentMark />} />
        <Route path="/admin/quizzes" element={<Quizzes />} />
        <Route path="/admin/quizzes/add-quiz" element={<AddQuiz />} />
        <Route path="/admin/videos" element={<Videos />} />
        <Route path="/admin/videos/addVideo" element={<AddVideo />} />
      </Routes>
    </Router>
  ) : (
    <div>Checking Authentication..</div>
  );
}

export default App;
