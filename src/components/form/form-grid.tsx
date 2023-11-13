import {Grid} from "@mui/material";
import React from "react";

type FormGridProps = {
    children:  React.ReactElement<any, any> | React.ReactElement<any, any>[];
    props?: any;
}
const FormGrid : React.FC<FormGridProps> = ({ children, ...props }) => {
    return (
        <Grid sx={{display:'flex', gap: '2rem', m:1}} xs={12} md={6} {...props}>
            {children}
        </Grid>
    );
}

export default FormGrid;