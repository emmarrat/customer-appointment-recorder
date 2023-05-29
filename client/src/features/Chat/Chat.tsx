import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage, User } from '../../types';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { Navigate } from 'react-router-dom';
import ReconnectingWebSocket from 'reconnecting-websocket';
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import dayjs from 'dayjs';

const Chat = () => {
  const user = useAppSelector(selectUser);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageText, setMessageText] = useState('');
  const [activeUsers, setActiveUsers] = useState<User[]>([]);

  const ws = useRef<null | ReconnectingWebSocket>(null);
  console.log(activeUsers);
  useEffect(() => {
    ws.current = new ReconnectingWebSocket('ws://localhost:8000/chat');
    console.log('ws = ', ws.current);
    ws.current.onclose = () => console.log('ws closed!');

    ws.current.onmessage = (event) => {
      const decodedMessage = JSON.parse(event.data);

      switch (decodedMessage.type) {
        case 'ACTIVE_USERS':
          setActiveUsers(decodedMessage.payload);
          break;

        case 'INITIAL_MESSAGES':
          const latestMessages = decodedMessage.payload as ChatMessage[];
          setMessages(latestMessages);
          break;

        case 'NEW_MESSAGE':
          setMessages((prevMessages) => [
            ...prevMessages,
            decodedMessage.payload as ChatMessage,
          ]);
          break;

        default:
          break;
      }
    };

    ws.current.onopen = () => {
      if (user && ws.current) {
        ws.current.send(
          JSON.stringify({
            type: 'LOGIN',
            payload: user.token,
          }),
        );
      }
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [user]);

  const changeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!ws.current) return;
    ws.current.send(
      JSON.stringify({
        type: 'SEND_MESSAGE',
        payload: messageText,
      }),
    );
    setMessageText('');
  };

  const handleDeleteClick = (messageId: string) => {
    if (!ws.current) return;
    ws.current.send(
      JSON.stringify({
        type: 'DELETE_MESSAGE',
        payload: messageId,
      }),
    );
  };

  if (!user) {
    return <Navigate to="/register" />;
  }

  return (
    <Grid container justifyContent="space-between">
      <Grid
        item
        xs={12}
        md={3}
        container
        flexDirection="column"
        alignItems="center"
        width="100%"
        sx={{
          background: '#6a30d2',
          borderRadius: '8px',
          padding: '20px 15px',
        }}
      >
        <Typography variant="h5" mb={2} color="white">
          Active users:{' '}
        </Typography>
        <List sx={{ width: '100%' }}>
          {activeUsers.map((user, index) => (
            <ListItem
              key={user._id}
              sx={{ width: '100%', borderBottom: '1px solid #fff' }}
            >
              <ListItemText
                sx={{ color: '#fff' }}
                primary={index + 1 + '. ' + user.firstName}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          border: '2px solid #6a30d2',
          borderRadius: '8px',
          padding: '10px 25px',
        }}
      >
        <Grid
          item
          container
          flexDirection="column"
          flexWrap="nowrap"
          sx={{ height: '600px', overflow: 'scroll', width: '100%' }}
        >
          {messages.map((message) => (
            <Box
              key={message._id}
              mb={2}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Typography variant="body1">
                  <b style={{ marginRight: '10px' }}>{message.username}: </b>{' '}
                  {message.text}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {dayjs(message.createdAt).format('MMMM DD, YYYY, HH:mm')}
                </Typography>
              </Box>
              {user?.role === 'admin' && (
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDeleteClick(message._id)}
                  sx={{ ml: '20px' }}
                >
                  <DeleteForeverRoundedIcon />
                </Button>
              )}
            </Box>
          ))}
        </Grid>
        <form onSubmit={sendMessage}>
          <Box display="flex" justifyContent="space-between" mt={4}>
            <TextField
              variant="outlined"
              type="text"
              value={messageText}
              onChange={changeMessage}
              sx={{ width: '75%' }}
              required
            />
            <Button
              variant="contained"
              color="success"
              type="submit"
              sx={{ width: '20%' }}
            >
              Send
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
};

export default Chat;
