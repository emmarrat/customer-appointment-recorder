import React, {useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {selectDatetimes} from "../../serviceHoursSlice";
import {fetchServiceHoursByUser} from "../../serviceHoursThunks";
import {selectUser} from "../../../users/usersSlice";
import {Grid, Typography} from "@mui/material";
import dayjs from "dayjs";
import 'dayjs/locale/ru';


const ServiceHourAdmin = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const workingDates = useAppSelector(selectDatetimes);
    const userId = useMemo(() => user?._id, [user]);

    useEffect(() => {
      if (userId) {
        dispatch(fetchServiceHoursByUser(userId));
      }
    }, [dispatch, userId]);

    return (
      <Grid
        container
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {workingDates.map(date => (
          <Grid
            item
            container
            justifyContent="space-between"
            mb={3}
            sx={{
              borderRadius: '20px',
              width: '65%',
              boxShadow: '2px 12px 25px #d4d4d4, -12px -12px 25px #ffffff'
            }}
          >
            <Grid
              item
              container
              alignItems="center"
              justifyContent="center"
              xs={12} md={4}
              sx={{
                borderRight: '1px solid #edf0ee'
              }}
            >
              <Typography>{dayjs(date.date).locale('ru').format('DD MMMM YYYY')} г.</Typography>
            </Grid>
            <Grid
              item
              container
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap={1} xs={12} md={8}
              sx={{
                padding: '10px'
              }}

            >
              {date.hours.map(hour => (
                <Grid
                  item
                  container
                  width="50%"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography>{hour.startTime} - {hour.endTime}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{hour.status ? 'Занято' : 'Свободно'}</Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  }
;

export default ServiceHourAdmin;