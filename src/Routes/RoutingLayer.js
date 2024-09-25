import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Signup from '../components/Home/Signup/Signup';
import Login from '../components/Home/Login/Login';
// import Home from './components/routes/home';
// import About from './components/routes/about';
// import Contact from './components/routes/contact';
const Home = lazy(() => import('../components/Home/Home'));


const RoutingLayer = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Suspense fallback={<div>Loading . . . </div>}>
                <Login />
            </Suspense>} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    </BrowserRouter>
);

export default RoutingLayer;