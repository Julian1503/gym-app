import {Box, useTheme, List, ListItem, ListItemText, Collapse, IconButton, Drawer, Button} from "@mui/material";
import React, {useEffect, useState} from "react";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { MemberPage } from "./crud/member";
import { TrainerPage } from "./crud/trainer";
import { SpecialtyPage } from "./crud/specialty";
import { PlanPage } from "./crud/plan";
import { ExercisePage } from "./crud/exercise";
import { EquipmentPage } from "./crud/equipment";
import { MembershipPage } from "./crud/membership";
import Logo from "../components/navbar/logo";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';
import {TokenService} from "../store/auth/token";
import {useNavigate} from "react-router-dom";
import {CashRegisterPage} from "./crud/cashRegister";
import {NewsPage} from "./crud/news";
import {UserPage} from "./crud/user";
import {useDispatch} from "react-redux";
import {logout} from "../store/auth/authSlice";

const AdminPage = () => {
    const theme = useTheme();
    const navigator = useNavigate();
    const [open, setOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const user = new TokenService().getTokenPayload();
    const dispatch = useDispatch();

    const handleClick = () => {
        setOpen(!open);
    };

    const handleMenu = () => {
        setOpenMenu(value => !value);
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setOpenMenu(false);
    };

    useEffect(
        () => {
            if (!user?.scope.includes("admin")) {
                navigator('/dashboard');
            }
        }, [])

    const MenuItems = (
        <List
            sx={{
                cursor: "pointer",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: theme.palette.text.primary,
                gap: 2,
            }}
            color="white"
        >
            <ListItem onClick={handleClick}>
                <ListItemText primary="Management" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem onClick={() => handleOptionClick('member')}>
                        <ListItemText primary="Member" />
                    </ListItem>
                    <ListItem onClick={() => handleOptionClick('trainer')}>
                        <ListItemText primary="Trainer" />
                    </ListItem>
                    <ListItem onClick={() => handleOptionClick('membership')}>
                        <ListItemText primary="Membership" />
                    </ListItem>
                    <ListItem onClick={() => handleOptionClick('specialty')}>
                        <ListItemText primary="Specialty" />
                    </ListItem>
                    <ListItem onClick={() => handleOptionClick('plan')}>
                        <ListItemText primary="Plan" />
                    </ListItem>
                    <ListItem onClick={() => handleOptionClick('exercise')}>
                        <ListItemText primary="Exercise" />
                    </ListItem>
                    <ListItem onClick={() => handleOptionClick('equipment')}>
                        <ListItemText primary="Equipment" />
                    </ListItem>
                    <ListItem onClick={() => handleOptionClick('news')}>
                        <ListItemText primary="News" />
                    </ListItem>
                    <ListItem onClick={() => handleOptionClick('user')}>
                        <ListItemText primary="Users" />
                    </ListItem>
                </List>
            </Collapse>
            <ListItem onClick={() => handleOptionClick('cashRegister')}>
                <ListItemText primary="Cash Register" />
            </ListItem>
        </List>
    );

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                height: "100%",
            }}
        >
            <IconButton
                sx={{
                    display: { xs: "flex", md: "none" },
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 10,
                    backgroundColor: theme.palette.secondary.main,
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "50%",
                    margin: "0.5rem",
                    opacity: 0.6,
                }}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={openMenu}
                onClose={handleMenu}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: "22rem",
                        background: theme.palette.background.paper,
                    },
                    display: { xs: "flex", md: "none" },
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "flex-start", margin: 1}}>
                    <IconButton onClick={handleMenu}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                {MenuItems}
            </Drawer>

            <Box
                sx={{
                    background: theme.palette.background.paper,
                    zIndex: 5,
                    boxShadow: "2px 4px 8px rgba(0, 0, 0, 1)",
                    flexDirection: "column",
                    gap: 6,
                    alignItems: "center",
                    width: "22rem",
                    minHeight: "100vh",
                    position: "relative",
                    display: { xs: "none", md: "flex" },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "5rem",
                        width: "100%",
                        background: theme.palette.primary.main,
                        position: "relative",
                        top: 0,
                        left: 0,
                    }}
                >
                    <Logo
                        variant="h6"
                        href="/"
                        sx={{
                            mr: 2,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: theme.palette.text.primary,
                            textDecoration: "none",
                        }}
                        children="GYMNASIUM"
                        iconDisplay={{ display: { xs: "none", md: "flex", color: theme.palette.text.primary, } }}
                        textDisplay={{ display: { xs: "none", md: "flex" } }}
                    />
                </Box>
                    {MenuItems}
                    <Button
                        color="primary"
                        sx={{
                            width: "100%",
                            height: "40px",
                        }}
                        onClick={()=>dispatch(logout())}
                    >
                        Logout
                    </Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    background: theme.palette.background.default,
                    zIndex: 5,
                    flexDirection: "column",
                    width: "100%",
                    minHeight:"100vh",
                    height:"100%"
                }}
            >
                <Box
                    component="img"
                    src="images/gym.jpg"
                    sx={{
                        height: "15rem",
                        width: "100%",
                        objectFit: "cover",
                        objectPosition: "center 55%",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2), 0px 1px 3px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12)",
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(135deg, #1F1F21 0%, #2A2A2E 100%)",
                    }}
                >
                    {selectedOption === 'member' && <MemberPage />}
                    {selectedOption === 'trainer' && <TrainerPage />}
                    {selectedOption === 'membership' && <MembershipPage />}
                    {selectedOption === 'specialty' && <SpecialtyPage />}
                    {selectedOption === 'news' && <NewsPage />}
                    {selectedOption === 'plan' && <PlanPage />}
                    {selectedOption === 'exercise' && <ExercisePage />}
                    {selectedOption === 'equipment' && <EquipmentPage />}
                    {selectedOption === 'cashRegister' && <CashRegisterPage />}
                    {selectedOption === 'user' && <UserPage />}
                </Box>
            </Box>
        </Box>
    );
};

export default AdminPage;
