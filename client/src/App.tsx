import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container, CssBaseline, Typography } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Register from './features/users/Register';
import Login from './features/users/Login';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';
import ExpertAdmin from './features/experts/components/ExpertAdmin/ExpertAdmin';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NewExpert from './features/experts/containers/NewExpert/NewExpert';
import EditExpert from './features/experts/containers/EditExpert/EditExpert';
import Experts from './features/experts/containers/Experts/Experts';
import OneExpert from './features/experts/containers/OneExpert/OneExpert';
import ServiceHourAdmin from './features/serviceHours/components/ServiceHourAdmin/ServiceHourAdmin';
import './styles.css';
import Categories from './features/categories/containers/Categories/Categories';
import AppointmentPanel from './features/appointments/containers/AppointmentPanel/AppointmentPanel';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chat from './features/Chat/Chat';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl" sx={{ mt: 5 }}>
          <Routes>
            <Route path="/" element={<Categories />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/experts" element={<Experts />} />
            <Route path="/experts/by-category/:id" element={<Experts />} />
            <Route path="/experts/:id" element={<OneExpert />} />

            <Route
              path={
                user && user.role === 'expert'
                  ? '/expert/appointments'
                  : '/appointments'
              }
              element={
                <ProtectedRoute
                  isAllowed={
                    user && (user.role === 'expert' || user.role === 'user')
                  }
                >
                  {user && <AppointmentPanel who={user.role} />}
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/appointments"
              element={
                <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                  {user && <AppointmentPanel who={user.role} />}
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/experts"
              element={
                <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                  <ExpertAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/experts/new"
              element={
                <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                  <NewExpert />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/experts/edit/:id"
              element={
                <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                  <EditExpert />
                </ProtectedRoute>
              }
            />
            <Route
              path="/expert/service-hours"
              element={
                <ProtectedRoute isAllowed={user && user.role === 'expert'}>
                  <ServiceHourAdmin />
                </ProtectedRoute>
              }
            />

            <Route
              path="/*"
              element={
                <Typography textAlign="center" mt={5}>
                  Упс! Страница не найдена!
                </Typography>
              }
            />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Container>
        <ToastContainer
          position="bottom-right"
          theme="light"
          newestOnTop={false}
          closeOnClick
          hideProgressBar
          autoClose={2000}
        />
      </main>
    </>
  );
};
export default App;
