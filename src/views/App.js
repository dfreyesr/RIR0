import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './Landing.js';
import SignUp from './SignUp.js';
import LogIn from './LogIn.js';
import Tracker from './Tracker.js';
import Profile from './Profile.js';
import Exercises from './Exercises.js';


function App() {
 return (
   <div className="App">
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<Landing />} />
         <Route path="/sign-up" element={<SignUp />} />
         <Route path="/log-in" element={<LogIn />} />
         <Route path="/tracker" element={<Tracker active={"workouts"} />} />
         <Route path="/profile" element={<Profile/>} />
         <Route path="/exercises" element={<Exercises/>} />
       </Routes>
     </BrowserRouter>
   </div>
 );
}

export default App;