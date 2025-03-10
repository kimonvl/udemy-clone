import React, { Fragment } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { Skeleton } from '../ui/skeleton';

const ProtectedRoute = ({ isAuthenticated, user, element, loading }) => {
    const location = useLocation();
    if((!isAuthenticated && !location.pathname.includes("/auth")) || (!user && !location.pathname.includes("/auth"))){
        return <Navigate to={"/auth"}/>
    }

    if(isAuthenticated && user?.role == "student" && (location.pathname.includes("instructor") || location.pathname.includes("/auth"))){
        return <Navigate to={"/home"}/>
    }

    if(isAuthenticated && user?.role == "instructor" && (location.pathname.includes("student") || location.pathname.includes("/home")|| location.pathname === "/" || location.pathname.includes("/auth"))){
        return <Navigate to={"/instructor"}/>
    }

    
    return (
        <Fragment>{loading ? <Skeleton/> : element}</Fragment>
    )
}

export default ProtectedRoute;