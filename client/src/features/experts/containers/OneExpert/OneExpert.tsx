import React, {useEffect} from 'react';
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {fetchExpertById} from "../../expertsThunks";
import {fetchServiceHoursForExpert} from "../../../serviceHours/serviceHoursThunks";
import {selectExpertOneFetching, selectOneExpert} from "../../expertsSlice";
import {selectDatetimes} from "../../../serviceHours/serviceHoursSlice";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import {apiURL} from "../../../../constants";
import './OneExpert.css';

const OneExpert = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const expert = useAppSelector(selectOneExpert);
  const workingDates = useAppSelector(selectDatetimes);
  const loading = useAppSelector(selectExpertOneFetching);
  const navigate = useNavigate();

  useEffect(() => {
      dispatch(fetchExpertById(id));
      dispatch(fetchServiceHoursForExpert(id));
    },
    [dispatch, id]);
  console.log('expert = ', expert);
  console.log('datetimes = ', workingDates);

  const goBack = () => {
    navigate(-1);
  };
  return (
    <Grid container justifyContent="center">
      {loading ? (
        <CircularProgress/>
      ) : (
        expert && (
          <Grid
            // style={styles.teacherWrapper}
            padding={{xs: '10px 20px', md: '15px 50px'}}
            sx={{width: '100%'}}
          >
            <Button onClick={goBack}>Назад</Button>
            <Grid
              container
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              mb={4}
              padding="0 50px"
            >
              <Grid container justifyContent="space-between" alignItems="center" mt={4}>
                <Grid item>
                  <Typography variant="h6" mb={2}>
                    {expert.user.firstName} {expert.user.lastName}
                  </Typography>
                  <Typography variant="h6">
                    {expert.title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar
                    sx={{width: 120, height: 120}}
                    src={apiURL + '/' + expert.photo}
                    alt={expert.user.firstName}
                  />
                </Grid>
              </Grid>
              <Grid item width="100%">
                <Divider sx={{my: 3}}/>
              </Grid>
              <Grid item xs={12} width="100%">
                <Typography variant="h6" >Мои услуги:</Typography>
                <List>
                  {expert.services.map(service => (
                    <ListItem
                      secondaryAction={
                        <Button className="service-btn" sx={{bgcolor: 'primary.light', color: "#fff"}}>
                          Выбрать
                          <LocalMallRoundedIcon sx={{ml: 1, color: '#fff'}}/>
                        </Button>
                      }
                    >
                      <ListItemAvatar sx={{mr: 3}}>
                        <Avatar sx={{bgcolor: 'primary.light'}}>
                          <LoyaltyIcon/>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={service.name}
                        secondary={service.price + ' cом'}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item width="100%">
                <Divider sx={{my: 3}}/>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  fontSize={{xs: '14px', md: '18px'}}
                >
                  {expert.info}
                </Typography>
              </Grid>


            </Grid>
          </Grid>
        )
      )}
    </Grid>

  );
};

export default OneExpert;