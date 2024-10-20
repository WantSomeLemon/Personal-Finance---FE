import LandingScreen from './screens/LandingScreen';
import DashboardScreen from './screens/DashboardScreen';
import AccountScreen from "./screens/AccountScreen";
import ReportScreen from './screens/ReportScreen';
import GoalScreen from './screens/GoalScreen';
import {Route, Routes, Navigate, HashRouter} from "react-router-dom";
import {useDispatch} from "react-redux";
import React, {useEffect} from "react";
import TransactionScreen from './screens/TransactionScreen';
import ProfileScreen from './screens/ProfileScreen';
import BudgetScreen from "./screens/BudgetScreen";
import {changeIsMobile} from "./features/userSlice";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const handleResize = () => {
            dispatch(changeIsMobile(window.innerWidth <= 768)); // Adjust the breakpoint as needed
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch]);

    return (
        <HashRouter>
            <Routes>
                {/* Directly redirect root (/) to the dashboard */}
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<DashboardScreen />} />
                <Route path="/account" element={<AccountScreen />} />
               
                <Route path="/*" element={<p>Page not found</p>} />
            </Routes>
        </HashRouter>
    );
}

export default App;
