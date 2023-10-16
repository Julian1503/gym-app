import {Grid, FormControl, InputLabel, Select, MenuItem, IconButton, SelectChangeEvent} from '@mui/material';
import { Add } from '@mui/icons-material';
import {useTheme} from "@mui/system";
import {SelectType} from "../../@types/DocumentTypes";
type SingleValue = string | number;
type MultipleValue = Array<string | number>;

interface SelectFieldProps {
    id: string;
    label: string;
    values: Array<{id: number, name: string}>;
    selectedValue: SingleValue | MultipleValue;
    onSelectionChange: (values: SingleValue | MultipleValue) => void;
    onAddButtonClick?: () => void;
    multiple?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({ id, label, values, selectedValue, onSelectionChange, onAddButtonClick, multiple = true }) => {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<SingleValue | MultipleValue>) => {
        let value = event.target.value as SingleValue | MultipleValue;
        onSelectionChange(value);
    };

    return (
        <Grid item xs={12} md={6} container alignItems="center" justifyContent="left">
            <FormControl variant="outlined" fullWidth>
                <InputLabel sx={{color: theme.palette.text.primary}} id={`${id}-label`}>{label}</InputLabel>
                <Select
                    labelId={`${id}-label`}
                    multiple={multiple}
                    value={selectedValue}
                    onChange={handleChange}
                >
                    {values.map((value) => (
                        <MenuItem sx={{color: theme.palette.text.secondary}} key={value.id} value={value.id}>
                            {value.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {onAddButtonClick && <Grid item xs={2} md={2}>
                <IconButton sx={{color: theme.palette.text.primary}} onClick={onAddButtonClick}>
                    <Add/>
                </IconButton>
            </Grid>}
        </Grid>
    );
}

export default SelectField;