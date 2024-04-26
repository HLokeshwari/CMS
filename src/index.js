import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './login';
import Home from './home'
import {BrowserRouter,Routes,Route,useLocation} from 'react-router-dom'
import SnakeGame from './SnakeGame';
import GuessTheNumber from './GuessTheNumber';

// import Japan from './Japan';
import MyProfile from './myprofile';
import Changepwd from './changepwd';
import Tower from './TowerGame';
import ContactForm from './contact';

import Admin from './admin';
import AdminHome from './adminhome';
import Viewstudents from './Viewstudents';
import ViewCourses from './ViewCourses';

import Coursereg from './Coursereg';
import Failedreg from './failedcoursereg';
import Betterreg from './betterreg';
import Mytb from './Mytb';
import ViewFaculty from './Viewfaculty';
import Coursetb from './coursetb';
import Viewfailed from './viewfailed';
import Certificate from './certificate';
import Viewcer from './viewcer';
import Viewbetter from './viewbetter';


import Faculty from './faculty';
import FacultyHome from './facultyhome.js';
import Facultyreg from './facultyreg';
import AddAssignments from './AddAssignments';
import Attendancecal from './Attendancecal.js';
import Time from './Time.js';


function ChatWidget() {
  const location = useLocation();

  React.useEffect(() => {
    // Check if the current path is allowed for the chat widget
    const isChatWidgetAllowed = () => {
      const allowedRoutes = ['/', '/admin', '/home', '/adminhome', '/login', '/adminlogin'];
      return allowedRoutes.includes(location.pathname);
    };

    // Load the chat widget script if the current path is allowed
    if (isChatWidgetAllowed()) {
      (function (d, m) {
        var kommunicateSettings =
          {
            "appId": "2b45633994a0c7b960a949d3b0ec33c45",
            "popupWidget": true,
            "automaticChatOpenOnNavigation": true
          };
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0];
        h.appendChild(s);
        window.kommunicate = m;
        m._globals = kommunicateSettings;
      })(document, window.kommunicate || {});
    }
  }, [location.pathname]);

  return null;
}



function Website(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/contact" element={<ContactForm/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/SnakeGame" element={<SnakeGame/>}></Route>
        <Route path="/GuessTheNumber" element={<GuessTheNumber/>}></Route>
        <Route path="/TowerGame" element={<Tower/>}></Route>

        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/adminhome" element={<AdminHome/>}></Route>

        <Route path="/faculty" element={<Faculty/>}></Route>
        <Route path="/Viewstudents" element={<Viewstudents/>}></Route>
        <Route path="/ViewCourses" element={<ViewCourses/>}></Route>
        <Route path="/viewfailed" element={<Viewfailed/>}></Route>
        <Route path="/viewcer" element={<Viewcer/>}></Route>
        <Route path="/viewbetter" element={<Viewbetter/>}></Route>

        <Route path="/Viewfaculty" element={<ViewFaculty/>}></Route>
        <Route path="/FacultyHome" element={<FacultyHome/>}></Route>
        <Route path="/Facultyreg" element={<Facultyreg/>}></Route>
        <Route path="/AddAssignments" element={<AddAssignments/>}></Route>


        {/* <Route path="/Students" element={<Student/>}></Route> */}

        <Route path="/Coursereg" element={<Coursereg/>}></Route>
        <Route path="/failedcoursereg" element={<Failedreg/>}></Route>
        <Route path="/Betterreg" element={<Betterreg/>}></Route>
        <Route path="/certificate" element={<Certificate/>}></Route>

        <Route path="/Mytb" element={<Mytb/>}></Route>
        <Route path="/coursetb" element={<Coursetb/>}></Route>







        <Route path="/myprofile" element={<MyProfile/>}></Route>
        <Route path="/Changepwd" element={<Changepwd/>}></Route>
        <Route path="/Attendancecal" element={<Attendancecal/>}></Route>
        <Route path="/Time" element={<Time/>}></Route>

      


      </Routes>
      <ChatWidget />

    </BrowserRouter>
    
  );
}

ReactDOM.render(<Website/>, document.getElementById('root'));
