import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { alpha, Popover } from "@mui/material";
import { AccountCircleOutlined, AppsOutlined, RefreshOutlined, SettingsOutlined, ViewStreamOutlined } from "@mui/icons-material";
import './Dashboard.scss'
import Notes from "../Note/Note";
import { Route, Routes, useNavigate } from "react-router";
import Archive from "../Archive/Archive";
import Trash from "../Trash/Trash";


const drawerWidth = 240;

const menuList = [
  {
    text: "Notes",
    icon: <LightbulbOutlinedIcon />
  },
  {
    text: "Reminders",
    icon: <NotificationsNoneOutlinedIcon />
  },
  {
    text: "Edit labels",
    icon: <EditOutlinedIcon />
  },
  {
    text: "Archive",
    icon: <ArchiveOutlinedIcon />
  },
  {
    text: "Bin",
    icon: <DeleteOutlineOutlinedIcon />
  }
]

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  height: '65px',
  boxShadow: 'inset 0 -1px 0 0 #dadce0',
  ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '8px',
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.05),
  },
  width: '100%',
  height: '50px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(0),
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    paddingTop: '13px',
    fontFamily: 'DM Sans',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Dashboard() {

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open1 = Boolean(anchorEl);
  const id = open1 ? 'simple-popover' : undefined;

  const signout = () => {
    localStorage.clear();
    navigate('/');
  }
  
  const changeRoute = (route) => {
    switch (route) {
      case 'Archive':
        navigate('archive')
        break;
      case 'Notes':
        navigate('')
        break;
      case 'Bin':
        navigate('trash')
        break;
      default:
        navigate('')
        break;
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <div>
        <AppBar position="fixed" open={open} color="inherit">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <img className="img" src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" />
            <Typography component="div" className="typography" fontFamily={'DM Sans'} fontSize={'23px'} >
              FundooNote
            </Typography>
            <div className="search">
              <Search>
                <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </div>
            <div className="icons">
              <IconButton><RefreshOutlined /></IconButton>
              <IconButton><ViewStreamOutlined /></IconButton>
              <IconButton><SettingsOutlined /></IconButton>
            </div>
            <div className="profile">
              <IconButton>
                <AppsOutlined />
              </IconButton>
              <IconButton  onClick={handleClick} >
                <AccountCircleOutlined />
              </IconButton>
              <Popover
                id={id}
                open={open1}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <div className="profile-container">
                  <div className="char-container">
                    <div className="profile-char">{(localStorage.getItem("firstName"))}</div>
                  </div>
                  <div className="name-container">
                    <div className="profile-name">{(localStorage.getItem("firstName") + " " + localStorage.getItem("lastName"))}</div>
                  </div>
                  <div className="email-container">
                    <div className="profile-name">{(localStorage.getItem("email"))}</div>
                  </div>
                  <div className="add-account-container"><button className="add-account-btn" onClick={signout}>Add another account</button></div>
                  <div className="signout-container"><button className="signout-btn" onClick={signout}>Sign out</button></div>
                </div>
              </Popover>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader></DrawerHeader>
        <Divider />
        <List>
          {menuList.map((item) => (
            <ListItem button key={item.text} onClick={() => changeRoute(item.text)} >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{flexGrow:1,p:3}}>
        <DrawerHeader />
        <Routes>
          <Route path="" element={<Notes />} />
          <Route path="Archive" element={<Archive />} />
          <Route path="Trash" element={<Trash />} />
        </Routes>
      </Box>
    </Box>  
  );
}
