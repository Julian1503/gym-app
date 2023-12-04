import React, { useState } from 'react';
import {
    Box, IconButton,
} from '@mui/material';
import {useTheme} from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import {DashboardMenu} from "../components/dashboard/dashboardMenu";
import {TokenService} from "../store/auth/token";
import {CalendarOption} from "../components/dashboard/calendarOption";
import {ArrowBack} from "@mui/icons-material";
import NewsOption from "../components/dashboard/newsOption";
import ProfileOption from "../components/dashboard/profileOption";

const Dashboard = () => {
    const theme = useTheme();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const menu = searchParams.get("menu") || "MENU";
    const [menuOption, setMenu] = useState<string>(menu);
    const userInfo = new TokenService().getTokenPayload();
    const changeMenu = (option:string) => {
        setMenu(option);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '2rem',
                background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(31,31,33,1) 100%)',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '90%',
                    minHeight: '25rem',
                    position: 'relative',
                    backgroundColor: theme.palette.background.default,
                    borderRadius: '1rem',
                }}
            >                
                {menuOption !== 'MENU' && (
                    <IconButton
                        sx={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 1 }}
                        onClick={() => changeMenu('MENU')}
                    >
                        <ArrowBack/>
                    </IconButton>
                )}
                {menuOption === "MENU" && <DashboardMenu changeMenu={changeMenu} user={userInfo?.fullName}/>}
                {menuOption === "CALENDAR" && <CalendarOption/>}
                {menuOption === "NEWS" && <NewsOption/>}
                {/*{menuOption === "ROUTINE" && <CalendarOption/>}*/}
                {menuOption === "PROFILE" && <ProfileOption/>}
                {/*{menuOption === "STATISTICS" && <CalendarOption/>}*/}
            </Box>
        </Box>
    );
};

export default Dashboard;
