import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import ErrorPage from './pages/ErrorPage';
import DashBoard from './pages/DashBoard';


const router = createBrowserRouter([
    
    {
        path: '/',
        element: <DashboardLayout />,
        errorElement:<ErrorPage/>,
        children: [
            {
                path: 'account',
                element: <DashBoard />,
            },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'signup',
                element: <SignupPage />,
            },
        ],
    },
]);

export default router;