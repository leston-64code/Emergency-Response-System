import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Incidents from './pages/Incidents';


const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='' element={<Dashboard />} />
            <Route path='incidents' element={<Incidents />} />
            <Route path='users' element={<Users />} />
        </Routes>
    );
};

export default AdminRoutes;
