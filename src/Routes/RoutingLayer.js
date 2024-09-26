import { Route, Routes, useLocation } from 'react-router-dom';
import Signup from '../components/Signup/Signup';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Home from '../components/Home/Home';
const RoutingLayer = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    return (
        <>
            {!isLoginPage && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Signup />} />
            </Routes>
            {!isLoginPage && <Footer />}
        </>
    )
}

export default RoutingLayer;