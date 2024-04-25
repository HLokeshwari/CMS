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
                        <label id='${data[x].amid}L' >${data[x].amtitle}</label>
                        <div id='${data[x].amid}' class='smenu'></div>
                      </li>`;
    }
    var mlist = document.getElementById('mlist');
    mlist.innerHTML = menuitems;

    for (x in data) {
        document.getElementById(`${data[x].amid}L`).addEventListener("click", showSMenu.bind(null, data[x].amid));
    }
}

export function showSMenu(mid) {
    var surl = "http://localhost:5000/adminhome/amenus";
    var ipdata = JSON.stringify({
        amid: mid // Change amid here
    });
    callApi("POST", surl, ipdata, loadSMenu, errorResponse);

    var asmenu = document.getElementById(mid); // Change amid here
    if (asmenu.style.display === "block")
        asmenu.style.display = "none";
    else
        asmenu.style.display = "block";
}

export function loadSMenu(res) {
    var data = JSON.parse(res);
    var asmenuitems = "";
    for (var x in data) {
        asmenuitems += `<label id='${data[x].asmid}'>${data[x].asmtitle}</label>`;
    }
    var asmenu = document.getElementById(`${data[x].amid}`);
    asmenu.innerHTML = asmenuitems;

    for (x in data) {
        document.getElementById(`${data[x].asmid}`).addEventListener("click", loadModule.bind(null, data[x].asmid));
    }
}
export function loadModule(asmid) { // Remove amid from parameters
    var titlebar = document.getElementById('titlebar');
    var module = document.getElementById('module');
    switch (asmid) {
        case "M00101":
            module.src = "/Viewfaculty";
            titlebar.innerText = "WELCOME TO VIEW FACULTY";
            break;
        case "M00201":
            module.src = "/Viewstudents";
            titlebar.innerText = "WELCOME TO VIEW STUDENTS";
            break;
        case "M00202":
            module.src = "/ViewCourses";
            titlebar.innerText = "WELCOME TO VIEW COURSES";
            break;

        case "M00203":
            module.src = "/viewfailed";
            titlebar.innerText = "WELCOME TO VIEW FAILED COURSES";
            break;

        case "M00204":
        module.src = "/viewcer";
        titlebar.innerText = "WELCOME TO VIEW Certification COURSES";
        break;
        
        //default:
         //   module.src = "";
         //   titlebar.innerText = "";

        case "M00205":
        module.src = "/viewbetter";
        titlebar.innerText = "WELCOME TO VIEW Betterment COURSES";
        break;
        default:
            module.src = "";
            titlebar.innerText = "";
    }
}

class AdminHome extends React.Component {
    constructor() {
        super();
        this.sid = getSession("sid");
        this.loadUname = this.loadUname.bind(this); // Bind loadUname
        this.logout = this.logout.bind(this); // Bind logout

        if (this.sid === "")
            window.location.replace("/");

        var url = "http://localhost:5000/adminhome/uname";
        var data = JSON.stringify({
            adminid: this.sid
        });
        callApi("POST", url, data, this.loadUname, errorResponse);

        url = "http://localhost:5000/adminhome/amenu";
        callApi("POST", url, "", loadMenu, errorResponse);
    }

    loadUname(res) {
        var data = JSON.parse(res);
        var HL1 = document.getElementById("HL1");
        HL1.innerText = `${data[0].firstname} ${data[0].lastname}`;
    }

    logout() {
        setSession("sid", "", -1);
        window.location.replace("/admin");
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
                   <iframe id='module' src="" title="Admin Module"></iframe>
                    </div>
                </div>
                <div className='footer'>
                    Copyright @ Lokeshwari. All rights reserved.
                </div>
            </div>
        );
    }
}

export default AdminHome;
