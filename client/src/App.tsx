import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container, CssBaseline, Grid, Typography } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Register from './features/users/containers/Register';
import Login from './features/users/containers/Login';
import { useAppSelector } from './app/hooks';
import { selectUser } from './dispatchers/users/usersSlice';
import ExpertAdmin from './features/experts/containers/ExpertAdmin/ExpertAdmin';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NewExpert from './features/experts/containers/NewExpert/NewExpert';
import EditExpert from './features/experts/containers/EditExpert/EditExpert';
import Experts from './features/experts/containers/Experts/Experts';
import OneExpert from './features/experts/containers/OneExpert/OneExpert';
import ServiceHourAdmin from './features/serviceHours/containers/ServiceHourAdmin/ServiceHourAdmin';
import './styles.css';
import Categories from './features/categories/containers/Categories/Categories';
import AppointmentPanel from './features/appointments/containers/AppointmentPanel/AppointmentPanel';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chat from './features/chats/containers/Chat';
import ChatPreview from './features/chats/containers/ChatPreview';
import WelcomeBlock from './components/StaticComponents/WelcomeBlock';
import ExpertsSlider from './features/experts/containers/ExpertsSlider/ExpertsSlider';
import VerifyEmail from './features/users/containers/VerifyEmail';
import UpdateServiceHours from './features/serviceHours/containers/UpdateServiceHours/UpdateServiceHours';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl" sx={{ my: 5 }}>
          <Routes>
            <Route
              path="/"
              element={
                <Grid container direction="column" gap={10}>
                  <Grid item xs={12}>
                    <WelcomeBlock />
                  </Grid>
                  <Grid item xs={12}>
                    <Categories />
                  </Grid>
                  <Grid item xs={12}>
                    <ExpertsSlider />
                  </Grid>
                </Grid>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/experts" element={<Experts />} />
            <Route path="/experts/by-category/:id" element={<Experts />} />
            <Route path="/experts/:id" element={<OneExpert />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />

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
              path="/expert/service-hours/update/:id"
              element={
                <ProtectedRoute isAllowed={user && user.role === 'expert'}>
                  <UpdateServiceHours />
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
            <Route path="/pre-chat" element={<ChatPreview />} />

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
