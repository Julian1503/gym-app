import {Snackbar} from "@mui/material";
import Alert from "@mui/material/Alert";
import React, {useEffect} from "react";

export function ErrorSnackbar(props: { message: string | null , onClose: () => void }) {
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    useEffect(() => {
        if (props.message) {
            setOpenSnackbar(true);
        } else {
            setOpenSnackbar(false);
        }
    }, [props.message]);

    return <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={props.onClose}
        anchorOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
    >
        <Alert onClose={props.onClose}
               style={{fontSize: "1rem", padding: "26px"}}
               severity="error">
            {props.message}
        </Alert>
    </Snackbar>;
}