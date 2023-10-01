'use client';

import React, { useState } from 'react';
import {
  Box,
  List,
  Paper,
  ListItemButton,
  Typography,
  IconButton,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import useMediaQuery from '@mui/material/useMediaQuery';

function SideBar() {
  const [show, setShow] = useState(false);

  const handleToggleSideNav = () => {
    setShow(!show);
  };

  const router = useRouter();
  const pathname = usePathname();
  const listItemColor = (route) =>
    pathname === route ? 'white' : 'gray';
  const matches = useMediaQuery('(max-width:400px)');

  // handle navigation
  const handleListItemClick = (route) => () => {
    router.push(route);
  };

  return (
    <Paper
      width={!show ? '10px' : 'max-content'}
      sx={{
        height: 'max-content',
        bgColor: '#fff',
        padding: !show ? 0 : 3,
        paddingLeft: 0,
        marginLeft: '-30px',
        boxShadow: '0 0 10px rgba(0, 0, 255, 0.5)',
        // display: { xs: 'none', md: 'block' },
        position: 'absolute',
        top: matches ? '25%' : '29%',
        zIndex: 100,
      }}
    >
      <IconButton
        sx={{
          top: !show ? -20 : -40,
          right: !show ? -20 : '-105%',
          cursor: 'pointer',
          backgroundColor: '#1976D2',
          '&:hover': { border: '1px solid #1976D2' },
        }}
        onClick={handleToggleSideNav}
      >
        {!show ? <ArrowRightIcon /> : <ArrowLeftIcon />}
      </IconButton>
      <List
        component="nav"
        sx={{
          // position: 'fixed',
          width: 'max-content',
        }}
      >
        <ListItemButton
          selected={pathname === '/createQuestions'}
          onClick={handleListItemClick('/createQuestions')}
          sx={{
            padding: 0,
            marginBottom: 3,
            width: '100%',
            '&:hover': { border: '1px solid #1976D2' },
          }}
        >
          <Box
            sx={{
              backgroundColor:
                pathname === '/createQuestions' ? '#1976D2' : 'white',
              flex: 1,
              padding: 1,
              paddingLeft: 4,
            }}
            display={!show ? 'none' : 'block'}
          >
            <Typography
              variant="caption"
              color={listItemColor('/createQuestions')}
              fontSize={14}
            >
              Create Questions
            </Typography>
          </Box>
        </ListItemButton>
        <ListItemButton
          selected={pathname === '/questions'}
          onClick={handleListItemClick('/questions')}
          sx={{
            padding: 0,
            marginBottom: 3,
            width: '100%',
            '&:hover': { border: '1px solid #1976D2' },
          }}
        >
          <Box
            sx={{
              backgroundColor:
                pathname === '/questions' ? '#1976D2' : 'white',
              flex: 1,
              padding: 1,
              paddingLeft: 4,
            }}
            display={!show ? 'none' : 'block'}
          >
            <Typography
              variant="caption"
              color={listItemColor('/questions')}
              fontSize={14}
            >
              Questions
            </Typography>
          </Box>
        </ListItemButton>
        <ListItemButton
          selected={pathname === '/responses'}
          onClick={handleListItemClick('/responses')}
          sx={{
            padding: 0,
            marginBottom: 3,
            '&:hover': { border: '1px solid #1976D2' },
          }}
        >
          <Box
            sx={{
              backgroundColor:
                pathname === '/responses' ? '#1976D2' : 'white',
              flex: 1,
              padding: 1,
              paddingLeft: 4,
            }}
            display={!show ? 'none' : 'block'}
          >
            <Typography
              variant="caption"
              color={listItemColor('/responses')}
              fontSize={14}
            >
              Responses
            </Typography>
          </Box>
        </ListItemButton>
      </List>
    </Paper>
  );
}

export default SideBar;
