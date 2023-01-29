import * as React from 'react';
import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
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
import AddIcon from '@mui/icons-material/Add';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';


export default function SecondaryListItems () {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
       setOpen(!open);
  }

  return(

  <List
  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Administration
        </ListSubheader>
      }
  >



    
    <React.Fragment>
   
   <ListItemButton onClick = {handleClick} >
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Books" />
      {!open ? <ExpandLess/> : <ExpandMore/>}     
   </ListItemButton>
   <Collapse in ={!open} timeout="auto" unmountOnExit>
     <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }} onClick = {()=>{window.location.pathname = 'registerBook'}}>
        <ListItemIcon>
        <AddIcon/>
        </ListItemIcon>
        <ListItemText primary="add book"/>
      </ListItemButton>
     </List>
   </Collapse>
   <Collapse in ={!open} timeout="auto" unmountOnExit>
     <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }} onClick = {()=>{window.location.pathname = '/manage_book'}}>
        <ListItemIcon>
        <ModeEditOutlinedIcon/>
        </ListItemIcon>
        <ListItemText primary="manage"/>
      </ListItemButton>
     </List>
   </Collapse>

    <ListItemButton onClick = {()=>{window.location.pathname = '/users'}} >
      <ListItemIcon>
      <ManageAccountsIcon/>
      </ListItemIcon>
      <ListItemText primary="Manage Users" />
    </ListItemButton>



    <ListItemButton onClick = {()=>{window.location.pathname = '/'}}>
      <ListItemIcon>
        <LogoutIcon/>
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>

  </List>
  )
}


export const mainListItems = (

  <React.Fragment>
    <ListItemButton onClick = {()=>{window.location.pathname = 'books'}}>
      <ListItemIcon>
        <LibraryBooksIcon/>
      </ListItemIcon>
      <ListItemText primary="All Books"/>
    </ListItemButton>
    <ListItemButton onClick = {()=>{window.location.pathname = 'admin_popular_books'}}>
      <ListItemIcon>
       <CollectionsBookmarkIcon/>
      </ListItemIcon>
      <ListItemText primary="Popular Books" />
    </ListItemButton>
    <ListItemButton onClick = {()=>{window.location.pathname = 'admin_favourite_books'}}>
      <ListItemIcon>
        <FavoriteIcon/>
      </ListItemIcon>
      <ListItemText primary="My favourites" />
    </ListItemButton>
 
  </React.Fragment>
);