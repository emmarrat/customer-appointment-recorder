import React from 'react';
import {Link as RouterLink} from "react-router-dom";
import {Box, Link, List, ListItem} from "@mui/material";

const Sidebar = () => {

  const items = [
    {
      id: 1,
      name: 'Мастера',
      link: 'experts'
    },
    {
      id: 2,
      name: 'Клиенты',
      link: 'users'
    },
  ];

  return (
    <Box sx={{bgcolor: 'primary.main', maxWidth: '320px', borderRadius: '20px', padding: '10px 40px'}}>
      <List>
        {items.map(item => (
          <ListItem key={item.id} sx={{mb: 1}}>
            <Link
              component={RouterLink}
              to={`/admin/${item.link}`}
              color="info.main"
              sx={{
                textDecoration: 'none',
                cursor: 'pointer',
                '&:hover': {
                  color: 'info.dark',
                }
              }}
            >{item.name}</Link>
          </ListItem>
        ))}
      </List>
    </Box>

  );
};

export default Sidebar;
