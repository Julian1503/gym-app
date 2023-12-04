import React from 'react';
import { Dialog, DialogTitle, DialogContent, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import {useTheme} from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} children={<></>}/>;
});

interface GenericDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const DialogForm: React.FC<GenericDialogProps> = ({ open, onClose, title, children }) => {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
            PaperProps={{
                style: {
                    backgroundColor: theme.palette.background.paper, // Customize dialog background color
                    borderRadius: '10px' // Customize dialog border radius
                }
            }}
        >
            <DialogTitle sx={{color: theme.palette.text.secondary, textAlign: 'center'}}>{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default DialogForm;