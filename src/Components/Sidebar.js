import * as React from 'react';
import { useNavigate, useLocation} from "react-router-dom";
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import StoreIcon from '@mui/icons-material/Store';
import PostAddIcon from '@mui/icons-material/PostAdd';
import RouterIcon from '@mui/icons-material/Router';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { Image } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



export default function Sidebar({open,setOpen}){

  const {palette} = useTheme();

  console.log('palette.icon.active',palette.icon.active);

   // Find The Current RoutePath of User
   const {pathname} = useLocation();
   const [init, curPath] = pathname.split('/');
   console.log(curPath);
   const navigate = useNavigate();

  return (
    <Drawer variant="permanent" open={open} 
        PaperProps={{
          sx: {
            backgroundColor: palette.primary.main,
            color: "white",
            ...(open && { borderRight: '0px solid white', }),
          }
        }}       
        >
        <DrawerHeader  sx={{ minWidth: 0,
                    // mr: open ? 4 : 'auto',
                    justifyContent: 'center', }}>
          <Image
            alt='Logo-Image'
            // sx={{ padding: 0, margin: 0}}
            src={`https://vikadakaviin.files.wordpress.com/2014/02/thiruvalluvar.gif?w=65&h=69&fit=crop&auto=format&dpr=2 2x`}
            loading="lazy"
          />
           <Typography
            variant="h5"
            noWrap
            component="div"
            align='left'
            sx={{
              marginLeft: 1,
              ...(!open && { display: 'none' }),
            }}
          >
          ஆயுர்வேதா
          </Typography>
        </DrawerHeader>
        <List>
          {['Home','StoreBilling','Products','Materials'].map((text, index) => (
            <ListItem 
                key={text} 
                disablePadding 
                // divider={true}
                sx={{ display: 'block',
                      // color: "white"
                      color : text.toLowerCase()  === (curPath || 'Home') ? palette.icon.active : palette.icon.inActive}}>
              <ListItemButton
                // autoFocus={location}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={()=> navigate(`/${text.toLowerCase()}`,{replace: true})}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color : text.toLowerCase()  === (curPath || 'Home') ? palette.icon.active : palette.icon.inActive
                  }}
                >
                { index=== 0 ? <HomeIcon /> : index=== 1 ? <StoreIcon/> : index=== 2 ? <ListAltIcon /> : <PostAddIcon /> }
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
  )
} 
