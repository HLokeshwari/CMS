import React from 'react';
import './home.css';
import logouticon from './images/logout.png';
import { callApi, errorResponse, getSession, setSession } from './main';
import menuicon from './images/menu.png';

const HS1 = { "paddingLeft": "5px", "fontWeight": "normal", "textAlign": "left" };
const HS2 = { "float": "right", "padding-right": "4px", "cursor": "pointer" };
const HS3 = { "float": "right", "height": "16px", "margin-top": "11px", "cursor": "pointer" };
const HS4 = { "float": "right", "padding-right": "14px" };

export function loadMenu(res) {
    var data = JSON.parse(res);
    var menuitems = "";
    for (var x in data) {
        menuitems += `<li>
                        <label id='${data[x].fmid}L' >${data[x].fmtitle}</label>
                        <div id='${data[x].fmid}' class='smenu'></div>
                      </li>`;
    }
    var mlist = document.getElementById('mlist');
    mlist.innerHTML = menuitems;

    for (x in data) {
        document.getElementById(`${data[x].fmid}L`).addEventListener("click", showSMenu.bind(null, data[x].fmid));
    }
}

export function showSMenu(mid) {
    var surl = "http://localhost:5000/facultyhome/fmenus";
    var ipdata = JSON.stringify({
        fmid: mid // Change amid here
    });
    callApi("POST", surl, ipdata, loadSMenu, errorResponse);

    var fsmenu = document.getElementById(mid); // Change amid here
    if (fsmenu.style.display === "block")
        fsmenu.style.display = "none";
    else
        fsmenu.style.display = "block";
}

export function loadSMenu(res) {
    var data = JSON.parse(res);
    var fsmenuitems = "";
    for (var x in data) {
        fsmenuitems += `<label id='${data[x].fsmid}'>${data[x].fsmtitle}</label>`;
    }
    var fsmenu = document.getElementById(`${data[x].fmid}`);
    fsmenu.innerHTML = fsmenuitems;

    for (x in data) {
        document.getElementById(`${data[x].fsmid}`).addEventListener("click", loadModule.bind(null, data[x].fsmid));
    }
}
export function loadModule(fsmid) { // Remove amid from parameters
    var titlebar = document.getElementById('titlebar');
    var module = document.getElementById('module');
    switch (fsmid) {
        case "M00101":
            module.src = "/AddAssignments";
            titlebar.innerText = "WELCOME TO UPLOAD ASSIGNMENTS";
            break;
        case "M00201":
            module.src = "/Viewstudents";
            titlebar.innerText = "WELCOME TO VIEW STUDENTS";
            break;
        case "M00202":
                module.src = "/ViewCourses";
                titlebar.innerText = "WELCOME TO VIEW STUDENTS";
                break;
        case "M00203":
                    module.src = "/viewfailed";
                    titlebar.innerText = "WELCOME TO VIEW STUDENTS";
                    break;
        case "M00204":
                        module.src = "/viewcer";
                        titlebar.innerText = "WELCOME TO VIEW STUDENTS";
                        break;
        case "M00205":
                            module.src = "/viewbetter";
                            titlebar.innerText = "WELCOME TO VIEW STUDENTS";
                            break;

        case "M00301":
            module.src="/facultyreg";
            titlebar.innerText="WELCOME TO COURSE REGISTRATION";
            break;

        default:
            module.src = "";
            titlebar.innerText = "";
    }
}

class FacultyHome extends React.Component {
    constructor() {
        super();
        this.sid = getSession("sid");
        this.loadUname = this.loadUname.bind(this); // Bind loadUname
        this.logout = this.logout.bind(this); // Bind logout

        if (this.sid === "")
            window.location.replace("/");

        var url = "http://localhost:5000/facultyhome/uname";
        var data = JSON.stringify({
            adminid: this.sid
        });
        callApi("POST", url, data, this.loadUname, errorResponse);

        url = "http://localhost:5000/facultyhome/fmenu";
        callApi("POST", url, "", loadMenu, errorResponse);
    }

    loadUname(res) {
        try {
          var data = JSON.parse(res);
          if (data && data.length > 0) {
            var HL1 = document.getElementById("HL1");
            HL1.innerText = `${data[0].firstname} ${data[0].lastname}`;
          } else {
            console.error("Invalid or empty response data:", data);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    
    
    
    

    logout() {
        setSession("sid", "", -1);
        window.location.replace("/faculty");
    }

    render() {
        return (
            <div className='full-height'>
                <div className='header'>
                    <label style={HS1}>STUDENT COURSE MANAGEMENT SYSTEM</label>
                    <label style={HS2} onClick={this.logout}>Logout</label>
                    <img src={logouticon} alt='' style={HS3} onClick={this.logout} />
                    <label id='HL1' style={HS4}></label>
                </div>
                <div className='content'>
                    <div className='menubar'>
                        <div className='menuheader'>
                            <img src={menuicon} alt='' />
                            <label>MENU</label>
                        </div>
                        <div className='menu'>
                            <nav><ul id='mlist' className='mlist'></ul></nav>
                        </div>
                    </div>
                    <div className='outlet'>
                        <div id='titlebar'></div>
                   <iframe id='module' src="" title="Faculty Module"></iframe>
                    </div>
                </div>
                <div className='footer'>
                    Copyright @ Lokeshwari. All rights reserved.
                </div>
            </div>
        );
    }
}

export default FacultyHome;
