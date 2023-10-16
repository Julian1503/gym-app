import {logout} from "./auth/authSlice";
import {Middleware} from "redux";
import history from "../history";

export const apiErrorMiddleware : Middleware = ({ dispatch }) => next => action => {
    if (action.type.endsWith('rejected') && action.error.message.includes('401')) {
        dispatch(logout());
        history.push('/login');
    }
    next(action);
};