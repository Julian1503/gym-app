// create a typescript type for Location props, we need a title and a string array for the content.
import {Box} from "@mui/material";
import React from "react";

type FooterMenuInfoProps = {
    title: string,
    content: string[]
}

export function FooterMenuInfo({title, content}: FooterMenuInfoProps) {
    return <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Box sx={{fontSize: "1rem"}}>{title}</Box>
        {
            content.map((item, i) => (
                <Box sx={{fontSize: "0.8rem"}} key={i}>{item}</Box>
            ))
        }
    </Box>;
}