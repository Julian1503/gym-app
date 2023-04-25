import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import {Specialty} from "../../@types/Specialty";

const font = "Oswald"
type ShowSpecialtyProps = {
    specialties: Specialty[]
}

const ShowSpecialty = ({specialties} : ShowSpecialtyProps) => {
    return (
        <Box sx={{mt:"5rem", textAlign: "center"}}>
            <Typography fontFamily={font} textAlign="center" color="#BEC4BC" fontWeight="700" fontSize="3rem" variant="h1" component="h1" >
                Our services
            </Typography>
            <Typography color="black"  fontSize="1.2rem" fontFamily={font} component="p">
                We offer a variety of services for you.
            </Typography>
            <Box sx={{display: "flex", flexDirection: {md:"row", xs:"column"}, justifyContent: "center", alignItems: "center", height: {md:"100vh"}, width: "100vw"}}>
                {specialties.map((specialty) => (
                    <Box sx={{display: "flex", pb:2, boxShadow: {xs: "2px 4px 8px rgba(0, 0, 0, 1)"}, flexDirection: "column", justifyContent: "center", alignItems: "center", height: {xs:"60%",md:"100%"}, width: {xs:"80%", md: "50%"},  background: "#007F5F", mt: 2, borderRadius: "2rem", gap: 2}}>
                        <Box component="img" src={specialty.photoUrl} sx={{ display: {md:"none", xs: "block"}, height: "90%", width: "100%", borderRadius: "2rem 2rem 0.5rem 0.5rem"}}/>
                        <Typography fontFamily={font} textAlign="center" color="#fff" fontWeight="700" fontSize="3rem" variant="h1" component="h1" >
                            {specialty.name}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default ShowSpecialty;