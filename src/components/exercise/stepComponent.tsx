import {Button, TextField} from '@mui/material';
import {Step} from "../../@types/Step";
import {styled} from "@mui/system";
import {FC} from "react";

interface StepProps {
    step: Step;
    onDescriptionChange: (newDescription: string) => void;
    onDelete: () => void;
}
const StepComponentStyled = styled('div')({
    transition: 'background-color 0.5s ease',
    '&:hover': {
        backgroundColor: '#F5F5F5',
    },
});

export const StepComponent: FC<StepProps> = ({ step, onDescriptionChange, onDelete }) => {
    return (
        <StepComponentStyled>
            <TextField
                value={step.description}
                onChange={e => onDescriptionChange(e.target.value)}
            />
            <Button onClick={onDelete}>Delete</Button>
        </StepComponentStyled>
    );
};
