import {Box} from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {FooterMenuInfo} from "./footerMenuInfo";
import {useTheme} from "@mui/material/styles";


/* The code defines a functional component called `Footer`. It uses the `useTheme` hook from the Material-UI library to
access the current theme. */
const Footer = () => {

    const theme = useTheme();

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: theme.palette.background.default,
            color: "#fff",
            position: "relative",
            gap: 1.5,
            pt: 3, pb: 3, m: 0
        }}>
            <Box sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexDirection: "row",
                left: "2rem"
            }}>
                <FooterMenuInfo title="Address" content={["Street 123", "Springfield"]}/>
                <FooterMenuInfo title="Phone" content={["+1 123 456 789", "+1 987 654 321"]}/>
                <FooterMenuInfo title="Zip Code" content={["12345", "Arizona"]}/>
                <FooterMenuInfo title="Country" content={["United States", "United Kingdom"]}/>
            </Box>
            <Box>
                <IconButton href="https://www.instagram.com/gym_official/" target="_blank" rel="noreferrer">
                    <InstagramIcon sx={{color:"white"}} fontSize="large"/>
                </IconButton>
                <IconButton href="https://www.facebook.com/gym.official/" target="_blank" rel="noreferrer">
                    <FacebookIcon sx={{color:"white"}} fontSize="large"/>
                </IconButton>
                <IconButton href="https://www.youtube.com/channel/UC-1-234567890111" target="_blank" rel="noreferrer">
                    <YouTubeIcon sx={{color:"white"}} fontSize="large"/>
                </IconButton>
            </Box>
            <Box>
                Copyright © 2021 Gym. All rights reserved.
            </Box>
        </Box>
    )
}

export default Footer;