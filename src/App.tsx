import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { BugBoard } from './pages/BugBoard';
import { BugList } from './pages/BugList';
import { BugDetail } from './pages/BugDetail';
import { UsersList } from './pages/UsersList';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { LandingPage } from './pages/LandingPage';
import { BugProvider } from './context/BugContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <BugProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/board" element={<BugBoard />} />
                <Route path="/list" element={<BugList />} />
                <Route path="/users" element={<UsersList />} />
                <Route path="/bug/:id" element={<BugDetail />} />
              </Route>
            </Route>
          </Routes>
        </BugProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
