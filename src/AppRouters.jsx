import React, { useContext } from 'react';
import {
    BrowserRouter as Router, Navigate, Route,
    Routes
} from 'react-router-dom';
import { AuthContext, AuthProvider } from './contexts/auth';
import Login from './Login';
import Profile from './Profile';




const AppRoutes = () => {
    const Private = ({children}) => {
        const {authenticated, loading} = useContext(AuthContext);

        if(loading) {
            return <div className='loading'>Carregando...</div>
        }


        if(!authenticated) {
            return <Navigate to="/" />;
        }
    
        return children;

    }
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route path="/profile" 
                    element={<Private>
                        <Profile/>
                            </Private>} 
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}
export default AppRoutes;