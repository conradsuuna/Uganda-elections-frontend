import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
import DrawerHeader from './DrawerHeader';
import { Link } from "react-router-dom";


const drawerWidth = 240;

export default function NavDrawer(props) {

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={props.iopen}
        >
            <DrawerHeader {...props} />
            <Divider />
            <List>
                <ListItem button>
                    {/* <ListItemText primary="Home" /> */}
                    <Link to="/presidential-2021" underline="none">2021 Presidential Elections</Link>
                </ListItem>
                <ListItem button>
                    <Link to="/presidential-parliamentary-2021" underline="none">2021-Presidential and Parliamentary elections</Link>
                </ListItem>
                <ListItem button>
                    <Link to="/presidential-voting-trend" underline="none">Presidential Voting Trend</Link>
                </ListItem>
                {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : ""}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))} */}
            </List>
        </Drawer>
    );
}
