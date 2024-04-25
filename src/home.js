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
                        <label id='${data[x].mid}L' >${data[x].mtitle}</label>
                        <div id='${data[x].mid}' class='smenu'></div>
                      </li>`;
    }
    var mlist = document.getElementById('mlist');
    mlist.innerHTML = menuitems;

    for (x in data) {
        document.getElementById(`${data[x].mid}L`).addEventListener("click", showSMenu.bind(null, data[x].mid));
    }
}

export function showSMenu(mid) {
    var surl = "http://localhost:5000/home/menus";
    var ipdata = JSON.stringify({
        mid: mid
    });
    callApi("POST", surl, ipdata, loadSMenu, errorResponse);

    var smenu = document.getElementById(mid);
    if (smenu.style.display === "block")
        smenu.style.display = "none";
    else
        smenu.style.display = "block";
}

export function loadSMenu(res) {
    var data = JSON.parse(res);
    var smenuitems = "";
    for (var x in data) {
        smenuitems += `<label id='${data[x].smid}'>${data[x].smtitle}</label>`;
    }
    var smenu = document.getElementById(`${data[x].mid}`);
    smenu.innerHTML = smenuitems;

    for (x in data) {
        document.getElementById(`${data[x].smid}`).addEventListener("click", loadModule.bind(null, data[x].smid));
    }
}

export function loadModule(smid,mid) {
    var titlebar = document.getElementById('titlebar');
    var module = document.getElementById('module');
    switch (smid) {
        case "M00101":
            module.src = "/Coursereg";
            titlebar.innerText = "WELCOME TO REGULAR COURSE REGISTRATION";
            break;
        case "M00102":
            module.src = "/failedcoursereg";
            titlebar.innerText = "WELCOME TO FAILED COURSE REGISTRATION ";
            break;
        case "M00103":
                module.src = "/betterreg";
                titlebar.innerText = "WELCOME TO  BETTERMENT COURSE REGISTRATION";
                break;        
        case "M00104":
                module.src = "/certificate";
                titlebar.innerText = "WELCOME TO CERTIFICATE COURSE REGISTRATION";
                break;
        case "M00201":
                module.src = "/coursetb";
                titlebar.innerText = "WELCOME TO COURSE TIMETABLE";
                break;
        case "M00202":
                module.src = "/Mytb";
                titlebar.innerText = "WELCOME TO MY TIMETABLE";
                break;

        case "M10102":
            module.src = "/Changepwd";
            titlebar.innerText = "WELCOME TO CHANGEPASSWORD";
            break;

        case "M10103":
            module.src = "/Attendancecal";
            titlebar.innerText = "WELCOME TO ATTENDANCE CALCULATOR";
            break;
        
        case "M10104":
            module.src = "/Time";
            titlebar.innerText = "DESIGN YOUR OWN TIMETABLE";
            break;
        

        
        case "M10101":
                module.src="/myprofile";
                titlebar.innerText="MY PROFILE";
                break;
        case "M10201":
            module.src = "/SnakeGame";
            titlebar.innerText = "WELCOME TO THE SNAKE SPRINT!";
            break;
        case "M10202":
            module.src = "/GuessTheNumber";
            titlebar.innerText = "WELCOME TO THE GUESS NUMBER!";
            break;
        case "M10203":
            module.src = "/TowerGame";
            titlebar.innerText = "WELCOME TO THE TOWER TWISTER";
            break;
        default:
            module.src = "";
            titlebar.innerText = "";
    }
}

class Home extends React.Component {
    constructor() {
        super();
        this.sid = getSession("sid");
        this.loadUname = this.loadUname.bind(this); // Bind loadUname
        this.logout = this.logout.bind(this); // Bind logout

        if (this.sid === "")
            window.location.replace("/");

        var url = "http://localhost:5000/home/uname";
        var data = JSON.stringify({
            emailid: this.sid
        });
        callApi("POST", url, data, this.loadUname, errorResponse);

        url = "http://localhost:5000/home/menu";
        callApi("POST", url, "", loadMenu, errorResponse);
    }

    loadUname(res) {
        var data = JSON.parse(res);
        var HL1 = document.getElementById("HL1");
        HL1.innerText = `${data[0].firstname} ${data[0].lastname}`;
        
    }

    logout() {
        setSession("sid", "", -1);
        window.location.replace("/");
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
                        <iframe id='module' src=""></iframe>
                    </div>
                </div>
                <div className='footer'>
                    Copyright @ KL University. All rights reserved.
                </div>
            </div>
        );
    }
}

export default Home;
