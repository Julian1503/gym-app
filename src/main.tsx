import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme/theme";
import {Provider} from "react-redux";
import store from "./store/store";
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallback from "./hooks/errorFallback";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(e)=>console.error(e)}
        >
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </ThemeProvider>
        </ErrorBoundary>
    </React.StrictMode>
);

reportWebVitals();
