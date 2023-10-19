import {Snackbar} from "@mui/material";
import Alert from "@mui/material/Alert";
import React from "react";

export function SuccessSnackbar(props: { open: boolean, onClose: () => void }) {

    return <Snackbar
        open={props.open}
        autoHideDuration={3000}
        onClose={props.onClose}
        anchorOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
    >
        <Alert onClose={props.onClose}
               style={{fontSize: "1rem", padding: "26px"}}
               severity="success">
            Operation was successful!
        </Alert>
    </Snackbar>;
}