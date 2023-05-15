import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Container, CssBaseline, Typography} from '@mui/material';
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import {useAppSelector} from "./app/hooks";
import {selectUser} from "./features/users/usersSlice";
import ExpertAdmin from "./features/experts/components/ExpertAdmin/ExpertAdmin";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NewExpert from "./features/experts/containers/NewExpert/NewExpert";
import EditExpert from "./features/experts/containers/EditExpert/EditExpert";
import Experts from "./features/experts/containers/Experts/Experts";
import OneExpert from "./features/experts/containers/OneExpert/OneExpert";
import ServiceHourAdmin from "./features/serviceHours/components/ServiceHourAdmin/ServiceHourAdmin";
import './styles.css';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl" sx={{mt: 5}}>
          <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/experts" element={<Experts/>}/>
            <Route path="/experts/:id" element={<OneExpert/>}/>
            <Route path="/admin/experts" element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <ExpertAdmin/>
              </ProtectedRoute>
            }/>
            <Route path="/admin/experts/new" element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <NewExpert/>
              </ProtectedRoute>
            }/>
            <Route path="/admin/experts/edit/:id" element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <EditExpert/>
              </ProtectedRoute>
            }/>
            <Route path="/expert/service-hours" element={
              <ProtectedRoute isAllowed={user && user.role === 'expert'}>
                <ServiceHourAdmin/>
              </ProtectedRoute>
            }/>

            <Route path="/*" element={<Typography textAlign="center" mt={5}>Упс! Страница не найдена!</Typography>}/>

          </Routes>
        </Container>
      </main>
    </>
  );
}
export default App;
