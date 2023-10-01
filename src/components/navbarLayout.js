'use clients';

import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import SendIcon from '@mui/icons-material/Send';

import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import {
  Button,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Layout() {
  const router = useRouter();

  const [toggleMenu, setToggleMenu] = useState(false);

  const smallScreen = useMediaQuery('(max-width:600px)');

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: '#blue' }} position="fixed">
        <Toolbar
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {smallScreen ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => {
                setToggleMenu(!toggleMenu);
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <></>
          )}
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              color: 'white',
              fontSize: '20px',
            }}
          >
            InterviewPro
          </Link>
          {smallScreen ? (
            <></>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexGrow: 1,
                alignItems: 'center',
              }}
            >
              {/* <Link
              href="/signup"
              style={{ textDecoration: "none", color: "#00008b", margin:'20px', backgroundColor:'white', padding:"10px" }}
            >
              Add Users
            </Link> */}
              {/* <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => router.push("/form")}
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                cursor: "pointer",
              }}
            >
              FIRS
            </Typography> */}
              <Typography
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', sm: 'block' },
                }}
              ></Typography>
              <Search
                sx={{
                  marginRight: { md: '50px' },
                  height: '80%',
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Box>
          )}
          <IconButton onClick={handleLogout}>
            <LogoutIcon
              sx={{
                fill: 'white',
              }}
              fontSize="small"
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Layout;
