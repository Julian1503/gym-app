import {keyframes, styled} from "@mui/system";
import {Container} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const fadeIn = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`;

const FormContainerStyled = styled(Container)({
    backgroundColor: '#F5F5F5',
    padding: '30px',
    boxShadow: '0px 0px 15px -5px rgba(0,0,0,0.1)',
    animation: `${fadeIn} 1s ease-in`,
})

type FormContainerProps = {
    children: string | JSX.Element | JSX.Element[];
}


export const FormContainer = ({children}: FormContainerProps) => {
    const theme = useTheme();
    return (
        <FormContainerStyled sx={{backgroundColor: theme.palette.background.default}} maxWidth="md">
            {children}
        </FormContainerStyled>
    )
}