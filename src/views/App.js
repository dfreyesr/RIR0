import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './Landing.js';
import SignUp from './SignUp.js';
import LogIn from './LogIn.js';
import Home from './Home.js'


function App() {
 return (
   <div className="App">
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<Landing />} />
         <Route path="/sign-up" element={<SignUp />} />
         <Route path="/log-in" element={<LogIn />} />
         <Route path="/home" element={<Home />} />
       </Routes>
     </BrowserRouter>
   </div>
 );
}

export default App;