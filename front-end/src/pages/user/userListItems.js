import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import StarBorder from '@mui/icons-material/StarBorder';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';




export const usermainListItems = (



  <React.Fragment>
    <ListItemButton onClick = {()=>{window.location.pathname = 'user_dashboard'}}>
      <ListItemIcon>
        <LibraryBooksIcon/>
      </ListItemIcon>
      {/* <ListItemText primary="Dashboard" /> */}
      <ListItemText primary="All Books"/>
    </ListItemButton>
    <ListItemButton onClick = {()=>{window.location.pathname = 'popular_books'}}>
      <ListItemIcon>
       <CollectionsBookmarkIcon/>
      </ListItemIcon>
      {/* <ListItemText primary="Orders" /> */}
      <ListItemText primary="Popular Books" />
    </ListItemButton>
    <ListItemButton onClick = {()=>{window.location.pathname = 'favourite_books'}}>
      <ListItemIcon>
        <FavoriteIcon/>
      </ListItemIcon>
      {/* <ListItemText primary="Customers" /> */}
      <ListItemText primary="My favourites" />
    </ListItemButton>
    <ListItemButton onClick = {()=>{window.location.pathname = '/'}}>
      <ListItemIcon>
        <LogoutIcon/>
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
 
  </React.Fragment>
);
