import { useState } from "react";
import {makeStyles, useMediaQuery} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const useStyles : any = makeStyles((theme: any) => ({
    menu: {
        width: 250,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuClosed: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
    },
}));

export function MenuComponent() {
    const [open, setOpen] = useState(false);
    const showButton = useMediaQuery("(min-width: 600px)");
    const classes = useStyles();

    const handleOpenMenu = () => {
        setOpen(true);
    };

    const handleCloseMenu = () => {
        setOpen(false);
    };

    return (
        <div>
            {showButton ? null : (
                <IconButton
                    onClick={handleOpenMenu}
                    color="inherit"
                    aria-label="Open Menu"
                >
                    <MenuIcon />
                </IconButton>
            )}
            <Drawer
                anchor="left"
                open={showButton ? true : open}
                onClose={handleCloseMenu}
                classes={{
                    paper: open ? classes.menu : classes.menuClosed,
                }}
            >
                <List>
                    <ListItem button onClick={handleCloseMenu}>
                        <ListItemText primary="Opción 1" />
                    </ListItem>
                    <ListItem button onClick={handleCloseMenu}>
                        <ListItemText primary="Opción 2" />
                    </ListItem>
                    <ListItem button onClick={handleCloseMenu}>
                        <ListItemText primary="Opción 3" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}
