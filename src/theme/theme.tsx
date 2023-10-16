import { createTheme } from '@mui/material/styles';

const fontPrimary = 'Oswald';
const fontSecondary = 'Lora';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#007F5F',
            light: '#2B9348',
        },
        secondary: {
            main: "#BEC4BC",
            light: "#E0E0E0",
        },
        background: {
            default: '#1F1F21',
            paper: '#121212',
        },
    }
    ,
    typography: {
        fontFamily: fontPrimary,
        h1: {
            fontFamily: fontPrimary,
            textAlign: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '3rem',
        },
        h2: {
            fontFamily: fontPrimary,
            textAlign: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '2.5rem',
        },
        h3: {
            fontFamily: fontPrimary,
            textAlign: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '2rem',
        },
        h4: {
            fontFamily: fontPrimary,
            textAlign: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '1.8rem',
        },
        subtitle1: {
            fontFamily: fontPrimary,
            color: 'white',
            fontSize: '1.1rem',
        },
        subtitle2: {
            fontFamily: fontPrimary,
            color: 'white',
            fontSize: '1.1rem',
        },
        h5: {
            fontFamily: fontPrimary,
            color: 'white',
            fontSize: '1.5rem',
        }
    },
});

export default theme;