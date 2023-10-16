import React from 'react';
import { Button, Typography, Paper, Box, Snackbar, Alert } from '@mui/material';

interface ErrorFallbackProps {
    error: Error | null;
    resetErrorBoundary: () => void;
    successMessage?: string;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
                                                         error,
                                                         resetErrorBoundary,
                                                         successMessage,
                                                     }) => {
    return (
        <Snackbar
            open={Boolean(error || successMessage)}
            autoHideDuration={6000}
            onClose={() => resetErrorBoundary()}
        >
            <Alert
                severity={error ? 'error' : 'success'}
                elevation={6}
                variant="filled"
            >
                {error ? (
                    <>
                        <Typography variant="h6">¡Ups! Algo salió mal:</Typography>
                        <Typography>{error.message}</Typography>
                        <Button
                            onClick={() => resetErrorBoundary()}
                            color="inherit"
                            size="small"
                        >
                            Volver a intentar
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h6">¡Éxito!</Typography>
                        <Typography>{successMessage}</Typography>
                    </>
                )}
            </Alert>
        </Snackbar>
    );
};

export default ErrorFallback;