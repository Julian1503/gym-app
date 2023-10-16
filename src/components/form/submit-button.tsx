import {styled} from "@mui/system";
import {Button, ButtonProps} from "@mui/material";

const SubmitButtonStyled = styled(Button)({
    marginTop: '20px',
    color: 'white',
    '&:hover': {
        backgroundColor: '#0056b3',
    },
});

export const SubmitButton = (props : ButtonProps) => {
    return (
        // @ts-ignore
        <SubmitButtonStyled variant="contained" color="primary"  {...props}>
            {props.children}
        </SubmitButtonStyled>
    )
}