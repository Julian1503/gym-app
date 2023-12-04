import React from 'react';
import {Box, Card, CardContent, Grid, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

type DashboardOptionProps = {
    title: string;
    option: string;
    description: string;
    changeMenu: (option:string) => void;
    icon: React.ReactNode;
}

const DashboardOption = ({ title, description, changeMenu, icon, option} : DashboardOptionProps) => {
    return (
        <Grid item xs={12} sm={6} md={4}>
                <Card sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.55)',
                    }
                }}
                      onClick={() => changeMenu(option)}
                >
                    <CardContent>
                        <Box sx={{ float: 'right' }}>
                            {icon}
                        </Box>
                        <Typography variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    </CardContent>
                </Card>
        </Grid>
    );
};

export default DashboardOption;