import React from 'react';
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import {useNavigate, useParams} from "react-router-dom";
import {Grid} from "@mui/material";



const Admin = () => {
  const {id} = useParams(), navigate = useNavigate();
  return (
    <Grid container>
      <Grid item xs={2}>
        <Sidebar />
      </Grid>
      <Grid item container justifyContent="center" xs={10}>
        <div>changing content {id ? id : ''}</div>
      </Grid>
    </Grid>
  );
};

export default Admin;