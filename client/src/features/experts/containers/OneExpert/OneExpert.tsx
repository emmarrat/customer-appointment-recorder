import React, {useEffect, useState} from 'react';
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
import dayjs, {Dayjs} from "dayjs";
import {DatePicker} from "@mui/x-date-pickers";
import {ServiceHours} from "../../../../types";


const OneExpert = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const expert = useAppSelector(selectOneExpert);
  const workingDates = useAppSelector(selectDatetimes);
  const loading = useAppSelector(selectExpertOneFetching);
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(dayjs(new Date())));
  const [selectedDate, setSelectedDate] = useState<ServiceHours | null>(null);
  useEffect(() => {
      dispatch(fetchExpertById(id));
      dispatch(fetchServiceHoursForExpert(id));
    },
    [dispatch, id]);

  const onDateChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    if (newValue) {
      const matchingObject = workingDates.find((obj) => {
        const objDate = new Date(obj.date).toISOString().slice(0, 10);
        const providedDate = new Date( newValue.toISOString()).toISOString().slice(0, 10);

        return objDate === providedDate;
      });
      if (matchingObject) {
        setSelectedDate(matchingObject);
      } else {
        setSelectedDate(null);
      }
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const addServiceState = (id: string) => {
    setSelectedServices(prevState => [...prevState, id]);
  };

  const checkIsSelected = (id: string) => {
    if (expert) {
      return selectedServices.includes(id);
    }
  };

  return (
    <Grid container justifyContent="center">
      {loading ? (
        <CircularProgress/>
      ) : (
        expert && (
          <Grid
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
                <Typography variant="h6">Мои услуги:</Typography>
                <List>
                  {expert.services.map(service => (
                    <ListItem
                      key={service._id}
                      secondaryAction={
                        <Button
                          className="service-btn"
                          sx={{bgcolor: 'primary.light', color: "#fff"}}
                          onClick={() => addServiceState(service._id)}
                          disabled={checkIsSelected(service._id)}
                        >
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
              <Grid item>
                <Typography mb={1}>Когда вам будет удобно прийти?</Typography>
                <DatePicker
                  value={value}
                  onChange={(newDate) => onDateChange(newDate)}
                  views={['year', 'month', 'day']}
                />
              </Grid>
              <Grid item>
                {selectedDate ? selectedDate.hours.map(hour => (
                 !hour.status  && <Typography key={hour._id}>{hour.startTime} - {hour.endTime}</Typography>
                )) : <Typography>На эту дату нет доступных окошек</Typography>}
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