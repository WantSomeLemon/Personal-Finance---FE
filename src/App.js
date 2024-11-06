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
import DebtScreen from './screens/DebtScreen';


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
                <Route path="/" element={<Navigate to="/landing" />} />
                <Route path="/landing" element={<LandingScreen />} />
                <Route path="/dashboard" element={<DashboardScreen />} />
                <Route path="/accounts" element={<AccountScreen />} />
                <Route path="/reports" element={<ReportScreen />} />
                <Route path="/goals" element={<GoalScreen />} />
                <Route path="/transactions" element={<TransactionScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/budgets" element={<BudgetScreen />} />
                <Route path="/landing" element={<LandingScreen />} />
                <Route path="/debts" element={<DebtScreen/>} />
                <Route path="/*" element={<p>Page not found</p>} />
            </Routes>
        </HashRouter>
    );
}

export default App;
