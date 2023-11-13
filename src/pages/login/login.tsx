import {Box, Typography} from "@mui/material";
import LoginForm from "./loginForm";

/* The `export default function Login()` is a default export of a React functional component named `Login`. This component
represents a login page for a gym website. */
export default function Login() {
    return (
        <Box
            sx={{
                display: 'flex',
                minWidth: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundImage: `url('https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <Box sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: '20px',
                borderRadius: '10px',
                width: {xs: '90%', sm: '80%', md: '60%', lg: '40%'},
                height: '80%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Box mb={6}>
                    <Typography variant="h2" fontWeight="bold" color="white" align="center">
                        Welcome to Our Gym!
                    </Typography>
                    <Typography variant="h5" color="white" align="center">
                        Join us and start your journey to fitness.
                    </Typography>
                </Box>
                <LoginForm/>
            </Box>
        </Box>
    );
}
