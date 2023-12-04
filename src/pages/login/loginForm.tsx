import {Avatar, Box, Button, Link, TextField, Typography} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import {useTheme} from "@mui/material/styles";
import {ChangeEvent, useState} from "react";
import ApiService from "../../services/apiService";
import {useDispatch} from "react-redux";
import {login} from "../../store/auth/authSlice";
import {useNavigate} from "react-router-dom";
import {TokenService} from "../../store/auth/token";
import {DateField} from "@mui/x-date-pickers";


interface FormState {
    birthDate?: Date | null;
    username: string;
    password: string;
    email?: string;
    name?:string;
    lastname?:string;
    identity?:string;

}

enum FormType {
    LOGIN = "LOGIN",
    SIGNUP = "SIGNUP",
    FORGOT_PASSWORD = "FORGOT_PASSWORD"
}

const LoginForm = () => {
    const theme = useTheme();
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const [formState, setFormState] = useState<FormState>({
        username: "",
        password: "",
    });
    const [formType, setFormType] = useState<FormType>(FormType.LOGIN);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleLogin = () => {
        const apiService = ApiService.getInstance();
        apiService.post("/login", formState)
            .then((response) => {
               if(response.status === 200) {
                   dispatch(login({token: response.response.token}));
                   const user = new TokenService().getTokenPayload();
                   if (user?.scope.includes("admin")) {
                       navigator("/admin");
                   } else {
                       navigator("/dashboard");
                   }
               } else {
                   setErrorMessage(response.message);
               }
            }).catch((error) => console.error(error));
    };

    const handleSignUp = () => {
        const apiService = ApiService.getInstance();
        apiService.post("/user/create", formState)
            .then((response) => {
                if(response.status === 200) {
                    setFormState({username: formState.username, password: formState.password, email: "", name: "", lastname: "", identity: ""});
                    handleLogin();
                } else {
                    setErrorMessage(response.message);
                }
            }).catch((error) => console.error(error));
    };

    // const handleForgotPassword = () => {
    //     Implement forgot password logic here
    // };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormTypeChange = (type: FormType) => {
        setFormState({username: "", password: "", email: "", name: "", lastname: "", identity: ""})
        setErrorMessage(null);
        setFormType(type);
    }

    const getFormHeader = () => {
        switch(formType) {
            case FormType.LOGIN:
                return "Gym Login";
            case FormType.SIGNUP:
                return "Gym Sign Up";
            case FormType.FORGOT_PASSWORD:
                return "Reset Password";
            default:
                return "Gym Login";
        }
    }

    function handleDateChange(date: Date | null) {
        setFormState({
            ...formState,
            birthDate: date,
        });
    }

    const renderForm = () => {
        switch(formType) {
            case FormType.LOGIN:
                return (
                    <>
                        <TextField
                            sx={{marginBottom: '20px', width: '100%'}}
                            label="Username"
                            name="username"
                            variant="outlined"
                            type="text"
                            value={formState.username}
                            onChange={handleChange}
                            InputProps={{
                                style: {color: theme.palette.text.secondary }
                            }}
                        />
                        <TextField
                            sx={{marginBottom: '20px', width: '100%'}}
                            name="password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={formState.password}
                            onChange={handleChange}
                            InputProps={{
                                style: {color: theme.palette.text.secondary }
                            }}
                        />
                        <Button
                            sx={{marginBottom: '10px', width: '100%'}}
                            variant="contained"
                            color="primary"
                            onClick={handleLogin}
                        >
                            Log In
                        </Button>
                    </>
                );
            case FormType.SIGNUP:
                return (
                    <>
                        <TextField
                            sx={{marginBottom: '20px', width: '100%'}}
                            label="Username"
                            name="username"
                            variant="outlined"
                            type="text"
                            value={formState.username}
                            onChange={handleChange}
                            InputProps={{
                                style: {color: theme.palette.text.secondary }
                            }}
                        />
                        <TextField
                            sx={{marginBottom: '20px', width: '100%'}}
                            label="Email"
                            name="email"
                            variant="outlined"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            InputProps={{
                                style: {color: theme.palette.text.secondary }
                            }}
                        />
                        <TextField
                            sx={{marginBottom: '20px', width: '100%'}}
                            name="name"
                            label="Name"
                            variant="outlined"
                            value={formState.name}
                            onChange={handleChange}
                            InputProps={{
                                style: {color: theme.palette.text.secondary }
                            }}
                        />
                        <TextField
                            sx={{marginBottom: '20px', width: '100%'}}
                            name="lastname"
                            label="Lastname"
                            variant="outlined"
                            value={formState.lastname}
                            onChange={handleChange}
                            InputProps={{
                                style: {color: theme.palette.text.secondary }
                            }}
                        />
                        <DateField
                            label="Birth Date"
                            name="birthDate"
                            sx={{marginBottom: '20px', width: "100%"}}
                            value={formState.birthDate || new Date()}
                            onChange={handleDateChange}
                            format="dd/MM/yyyy"
                            disableFuture
                            InputLabelProps={{
                                style: {color: theme.palette.text.primary},
                            }}
                        />
                        <TextField
                            sx={{marginBottom: '20px', width: '100%'}}
                            name="identity"
                            label="ID"
                            variant="outlined"
                            type="identity"
                            value={formState.identity}
                            onChange={handleChange}
                            InputProps={{
                                style: {color: theme.palette.text.secondary }
                            }}
                        />
                        <TextField
                            sx={{marginBottom: '20px', width: '100%'}}
                            name="password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={formState.password}
                            onChange={handleChange}
                            InputProps={{
                                style: {color: theme.palette.text.secondary }
                            }}
                        />
                        <Button
                            sx={{marginBottom: '10px', width: '100%'}}
                            variant="contained"
                            color="primary"
                            onClick={handleSignUp}
                        >
                            Create an account
                        </Button>
                    </>
                );
            case FormType.FORGOT_PASSWORD:
                return (
                    <>
                        <TextField
                            sx={{marginBottom: '20px', width: '100%'}}
                            label="Email"
                            name="email"
                            variant="outlined"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            InputProps={{
                                style: {color: theme.palette.text.secondary }
                            }}
                        />
                        <Button
                            sx={{marginBottom: '10px', width: '100%'}}
                            variant="contained"
                            color="primary"
                            onClick={()=>{}}
                        >
                            Reset Password
                        </Button>
                    </>
                );
            default:
                return null;
        }
    }

    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '300px',
                padding: '30px',
                borderRadius: '10px',
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
                color: theme.palette.text.primary,
                overflowY: formType === FormType.SIGNUP? 'auto' : 'none',
            }}
        >
            <Avatar
                sx={{
                    marginBottom: '20px',
                    backgroundColor: theme.palette.primary.main,
                    width: 56,
                    height: 56,
                }}
            >
                <FitnessCenterIcon fontSize="large"/>
            </Avatar>
            <Typography
                variant="h5"
                align="center"
                color="secondary"
                gutterBottom
            >
                {getFormHeader()}
            </Typography>
            {renderForm()}
            {errorMessage && (
                <Typography
                    variant="body2"
                    color="error"
                    sx={{
                        marginBottom: '10px',
                    }}
                >
                    {errorMessage}
                </Typography>
            )}
            <Link
                href="#"
                onClick={() => handleFormTypeChange(FormType.LOGIN)}
                sx={{
                    textDecoration: 'none',
                    color: theme.palette.text.secondary,
                    marginBottom: '5px',
                    display: formType === FormType.LOGIN ? 'none' : 'block',
                }}
            >
                Log In
            </Link>
            {/*<Link*/}
            {/*    onClick={() => handleFormTypeChange(FormType.FORGOT_PASSWORD)}*/}
            {/*    sx={{*/}
            {/*        textDecoration: 'none',*/}
            {/*        color: theme.palette.text.secondary,*/}
            {/*        cursor: 'pointer',*/}
            {/*        marginBottom: '5px',*/}
            {/*        display: formType === FormType.FORGOT_PASSWORD ? 'none' : 'block',*/}
            {/*    }}*/}
            {/*>*/}
            {/*    Forgot Your Password?*/}
            {/*</Link>*/}
            <Link
                onClick={() => handleFormTypeChange(FormType.SIGNUP)}
                sx={{
                    textDecoration: 'none',
                    cursor: 'pointer',
                    color: theme.palette.text.secondary,
                    display: formType === FormType.SIGNUP ? 'none' : 'block',
                }}
            >
                Sign Up
            </Link>
        </Box>
    );
};

export default LoginForm;