import React, {Fragment} from 'react';
import MainPage from "./pages/main/mainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/login/login";
import Calendar from "./components/user-menu/calendar";
import {ExercisePage} from "./pages/crud/exercise";
import {SpecialtyPage} from "./pages/crud/specialty";
import {TrainerPage} from "./pages/crud/trainer";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import {MemberPage} from "./pages/crud/member";
import {MembershipPage} from "./pages/crud/membership";
import {PlanPage} from "./pages/crud/plan";
import AdminPage from "./pages/adminPage";
import {useSelector} from "react-redux";
import {RootState} from "./store/store";
import {ProtectedRoute} from "./pages/login/protectedRoute";
import {PlanCalendar} from "./components/plan/planCalendar";
import Dashboard from "./pages/dashboard";
import NewsDetailPage from "./components/news/NewsDetailPage";
import {NewsPage} from "./pages/crud/news";



function App() {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
                <Routes>
                    <Route element={<Login/>} path="/login"/>
                    <Route element={<MainPage/>} path="/"/>
                    {/*<Route path="*" element={<Not found/>}/>*/}
                    <Route element={<ProtectedRoute redirectPath="/login" />}>
                        <Route element={<Dashboard/>} path="/dashboard"/>
                        <Route element={<ExercisePage/>} path="/exercise"/>
                        <Route element={<SpecialtyPage/>} path="/specialty"/>
                        <Route element={<NewsPage/>} path="/news"/>
                        <Route element={<TrainerPage/>} path="/trainer"/>
                        <Route element={<MemberPage/>} path="/member"/>
                        <Route element={<MembershipPage/>} path="/membership"/>
                        <Route element={<AdminPage/>} path="/admin"/>
                        <Route element={<PlanCalendar/>} path="/plan/:id"/>
                        <Route element={<NewsDetailPage/>} path="/news/:newsId"/>
                    </Route>
                </Routes>
        </BrowserRouter>
    </LocalizationProvider>

  );
}

export default App;
