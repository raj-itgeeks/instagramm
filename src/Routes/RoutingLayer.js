import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Signup from '../components/Home/Signup/Signup';
import Login from '../components/Home/Login/Login';
import Feed from '../components/body/Feed/Feed';
import FollowersList from '../components/Home/FollowersList/FollowersList';
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
            <Route path="/home/followersList" element={<FollowersList />} />
            <Route path="/feed" element={<Feed />} />
        </Routes>
    </BrowserRouter>
);

export default RoutingLayer;