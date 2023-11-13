import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import PersonalInfo from "../user-menu/personalInformation";
import ChangePassword from "../user-menu/changePassword";

const ProfileOption: React.FC = () => {
    return (
        <Paper  elevation={3} sx={{ padding: 2, width:'100%' }}>
            <Typography variant="h4" gutterBottom>
                Profile Options
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <PersonalInfo />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ChangePassword />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ProfileOption;
