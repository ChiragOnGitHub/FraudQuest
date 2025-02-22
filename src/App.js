import "./App.css";
import { Route,Routes ,Navigate} from "react-router-dom";
import { v4 as uuidV4 } from "uuid"

import Home from "./pages/Home"
import Navbar from "./components/common/Navbar"
import OpenRoute from "./components/core/Auth/OpenRoute"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from "./pages/Error"

import Dashboard from "./pages/Dashboard"
import MyProfile from "./components/core/Dashboard/MyProfile"
import Settings from "./components/core/Dashboard/Settings/index"
import GoogleAuthRedirect from "./components/GoogleAuthRedirect"

import QDashboard from './pages/QDashboard';
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import PerformancePage from "./pages/chart";


import PrivateRoute from "./components/core/Auth/PrivateRoute";

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
        <Navbar />
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="about" element={ <About /> } />  
            <Route path="contact" element={<Contact />} />
            <Route path="/google-auth" element={<GoogleAuthRedirect />} />

            {/* Route must be accessed by Non Logged In User */}
            <Route
                path="signup"
                element={
                    <OpenRoute>
                        <Signup />
                    </OpenRoute>
                }
                />

            <Route
                path="login"
                element={
                    <OpenRoute>
                        <Login />
                    </OpenRoute>
                }
                />

            <Route
                path="forgot-password"
                element={
                <OpenRoute>
                    <ForgotPassword />
                </OpenRoute>
                }
            />  

            <Route
                path="verify-email"
                element={
                <OpenRoute>
                    <VerifyEmail />
                </OpenRoute>
                }
            />  

            <Route
                    path="update-password/:id"
                    element={
                    <OpenRoute>
                        <UpdatePassword />
                    </OpenRoute>
                    }
                />  

            
            
    
            

            <Route path="/dashboard/quiz" element={
                <PrivateRoute>
                    <QDashboard />
                </PrivateRoute>
            } />
            <Route path="/dashboard/quiz/:levelnum" element={
                <PrivateRoute>
                    <QuizPage />
                </PrivateRoute>

                } />
            <Route path="/dashboard/quiz/result" element={
                <PrivateRoute>
                    <ResultPage />
                </PrivateRoute>
            } />
            <Route path="/dashboard/quiz/chart" element={
                <PrivateRoute>
                    <PerformancePage/>
                </PrivateRoute>
            } />

            {/* Private Route - for Only Logged in User */}
            <Route
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            >
                <Route path="dashboard/my-profile" element={<MyProfile />} />
                <Route path="dashboard/Settings" element={<Settings />} />
                
            </Route>
            

            {/* 404 Page */}
            <Route path="*" element={<Error />} />
        </Routes>
   </div>
  );
}

export default App;
