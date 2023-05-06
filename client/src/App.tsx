import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Container, CssBaseline, Typography} from '@mui/material';
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import {useAppSelector} from "./app/hooks";
import {selectUser} from "./features/users/usersSlice";
import Admin from "./features/admin/Admin";

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
            {/*<Route path="/" element={<Artists/>}/>*/}
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/admin/" element={<Admin/>}/>
            <Route path="/admin/:id" element={<Admin/>}/>
            <Route path="/*" element={<Typography textAlign="center">Not found!</Typography>}/>
          </Routes>
        </Container>
      </main>
    </>
  );
}
export default App;
