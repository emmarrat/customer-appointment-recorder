import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {ExpertFull} from "../../../../types";
import {apiURL} from "../../../../constants";
import {Link as RouterLink} from "react-router-dom";
import './ExpertCard.css';

interface Props {
  expert: ExpertFull;
}

const ExpertCard: React.FC<Props> = ({expert}) => {
  return (
    <Card  className="expert-card">
      <CardMedia
        className='expert-media'
        image={apiURL + '/' + expert.photo}
        title={`${expert.title} ${expert.user.firstName}`}
      />
      <CardContent className='expert-content'>
        <Typography gutterBottom variant="h5" component="div">
          {expert.user.firstName} {expert.user.lastName}
        </Typography>
      </CardContent>
      <CardActions className='expert-btn-wrapp'>
        <Button
          component={RouterLink}
          to={`/experts/${expert._id}`}
          variant="outlined"
          fullWidth
        >
          Посмотреть профиль
        </Button>
      </CardActions>
    </Card>
  );
};

export default ExpertCard;




