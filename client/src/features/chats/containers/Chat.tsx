import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage, User } from '../../../types';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../dispatchers/users/usersSlice';
import { Navigate } from 'react-router-dom';
import ReconnectingWebSocket from 'reconnecting-websocket';
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import SendIcon from '@mui/icons-material/Send';
import dayjs from 'dayjs';
import { COMPANY_TITLE } from '../../../constants';
import { styles } from './ChatStyles';

const Chat = () => {
  const user = useAppSelector(selectUser);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageText, setMessageText] = useState('');
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const ws = useRef<null | ReconnectingWebSocket>(null);
  useEffect(() => {
    ws.current = new ReconnectingWebSocket('ws://localhost:8000/chat');
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const changeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!ws.current || !user) return;
    ws.current.send(
      JSON.stringify({
        type: 'SEND_MESSAGE',
        payload: {
          username: `${user.firstName} ${user.lastName}`,
          text: messageText,
        },
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

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  if (!user) {
    return <Navigate to="/register" />;
  }

  const today = new Date().toISOString().slice(0, -14);

  return (
    <>
      <Typography variant="h4" textAlign="center" sx={styles.title}>
        Форум {COMPANY_TITLE}
      </Typography>
      <Grid
        sx={styles.containerColumn}
        justifyContent="space-between"
        height="100%"
        gap={5}
      >
        <Grid
          item
          container
          justifyContent="space-between"
          gap={3}
          height={{ xs: 'auto', md: '400px' }}
        >
          <Grid
            item
            container
            direction="column"
            sx={styles.activeUsersBlock}
            alignItems="flex-start"
            xs={12}
            md={3}
          >
            <Typography variant="h6" sx={styles.text}>
              Активные пользователи:
            </Typography>
            <List sx={{ width: '100%' }}>
              {activeUsers.map((user, index) => (
                <ListItem key={user._id} sx={{ width: '100%' }}>
                  <ListItemText
                    sx={{ color: '#fff' }}
                    primary={`${index + 1}. ${user.firstName} ${user.lastName}`}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid
            item
            container
            sx={styles.messagesBlock}
            height={{ xs: '400px', md: '100%' }}
            xs={12}
            md={8}
            ref={containerRef}
          >
            <Grid item sx={[styles.containerColumn, styles.messagesBlockInner]}>
              {messages.map((message) => (
                <Grid
                  item
                  sx={styles.containerRegular}
                  alignItems="stretch"
                  key={message._id}
                  mb={2}
                >
                  <Grid
                    item
                    container
                    justifyContent="space-between"
                    sx={{
                      width: '100%',
                      overflow: 'scroll',
                      borderRadius: 0,
                    }}
                    gap={2}
                    xs={12}
                  >
                    <Grid item xs={8}>
                      <Typography
                        variant="body1"
                        fontSize={{ xs: '10px', sm: '14px' }}
                        sx={{ wordWrap: 'break-word' }}
                      >
                        <Typography
                          component="span"
                          color="primary.dark"
                          style={{ marginRight: '5px' }}
                        >
                          {message.username}:{' '}
                        </Typography>
                        {message.text}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent="flex-end"
                      alignItems="center"
                      xs={2}
                      gap={1}
                    >
                      <Grid item>
                        <Typography
                          variant="body1"
                          fontSize={{ xs: '10px', sm: '14px' }}
                          color="text.secondary"
                        >
                          {today === message.createdAt.slice(0, -14)
                            ? dayjs(message.createdAt).format('HH:mm')
                            : dayjs(message.createdAt).format('DD.MM, HH:mm')}
                        </Typography>
                      </Grid>

                      {user?.role === 'admin' && (
                        <Grid item display={{ xs: 'none', md: 'block' }}>
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleDeleteClick(message._id)}
                          >
                            <DeleteForeverRoundedIcon fontSize="small" />
                          </IconButton>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <form onSubmit={sendMessage}>
            <Box sx={styles.containerRegular} gap={1}>
              <TextField
                type="text"
                value={messageText}
                onChange={changeMessage}
                sx={{ width: '90%', borderRadius: '20px' }}
                required
                placeholder="Ваше сообщение"
              />
              <Button variant="contained" type="submit" sx={styles.button}>
                <SendIcon />
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
