import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

const font = "Oswald"
const Hero = () => {
    return(
        <Box sx={{pt: {md:2}, display: "flex", flexDirection: { md:"row", xs: "column" }, position: "relative", justifyContent: {md:"space-around"}, alignItems: "center", height: {md:"100vh"}, width: "100vw", background: "#1F1F21"}}>
            <Box sx={{display: "flex", overflow:"hidden", flexDirection: "column", justifyContent: "center", alignItems: "center", height: {xs:"60%",md:"100%"}, width: {xs:"100%", md: "50%"}, background: "#1F1F21"}}>
                <Box component="img" src="images/hero.jpg" sx={{ display: {xs:"none"}, borderRadius:"10px", height: "80%", width: "60%"}}/>
                <Box component="img" src="images/hero3.jpg" sx={{ display: {md:"none", xs: "block"}, height: "25rem", width: "100%", transform: "scale(1.5)", }}/>
            </Box>
            <Box sx={{display: "flex", boxShadow: {xs: "2px 4px 8px rgba(0, 0, 0, 1)"}, flexDirection: "column", borderRadius: "2rem", justifyContent: "space-evenly", alignItems: "center", height: {xs:"16rem",md:"100%"}, width: {xs:"22rem", md: "50%"}, background: "#1F1F21", position: {xs:"absolute"}, bottom: "-4rem" }}>
                <Typography fontFamily={font} textAlign="center" color="#f6e962" fontWeight="700" fontSize="3rem" variant="h1" component="h1" >
                    Do you want a change?
                </Typography>
                <Typography color="white" fontSize="1.2rem" fontFamily={font} component="p">
                    TRAIN WITH US!
                </Typography>
            </Box>
        </Box>
    );
}

export default Hero;