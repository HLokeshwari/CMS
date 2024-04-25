// import React from 'react';
// import { Link } from 'react-router-dom';
// import logoutIcon from './images/logout.png';
// import backIcon from './images/back.png';
// import snakeIcon from './images/snake-icon.png';
// import GuessIcon from './images/Guess-icon.png';
// import { callApi, errorResponse, getSession, setSession } from './main';

// const HS2 = { "float": "right", "padding-right": "5px", "cursor": "pointer" };
// const HS3 = { "float": "right", "height": "16px", "margin-top": "6px", "cursor": "pointer" };
// const HS4 = { "float": "left", "padding-left": "5px", "cursor": "pointer" };
// const HS5 = { "float": "left","padding-left": "5px", "height": "16px", "margin-top": "6px", "cursor": "pointer" };
// const HS6 = { "float": "right", "padding-right": "10px" };

// class Funzone extends React.Component {
//   constructor() {
//     super();
//     this.sid = getSession("sid");

//     if (this.sid === "") {
//       window.location.replace("/");
//     }

//     var url = "http://localhost:5000/home/uname";
//     var data = JSON.stringify({
//       emailid: this.sid
//     });
//     callApi("POST", url, data, this.loadUname.bind(this), errorResponse);
//   }

//   loadUname = (res) => {
//     var data = JSON.parse(res);
//     var HL1 = document.getElementById("HL1");
//     HL1.innerText = `${data[0].firstname} ${data[0].lastname}`;
//   }

//   logout() {
//     setSession("sid", "", -1);
//     window.location.replace("/");
//   }
//     back() {
//       window.location.replace("/home");
//     }
//     render() {
//         return (
//             <div className='full-height'>
//                 <div className='header'>
//                     <label style={HS2} onClick={this.logout}>Logout</label>
//                     <img src={logoutIcon} alt='' style={HS3} onClick={this.logout} />
//                     <img src={backIcon} alt='' style={HS5} onClick={this.back} />
//                     <label style={HS4} onClick={this.back}>back</label>
//                     <label id='HL1' style={HS6}></label>

//                 </div>
//                 <div className='content1' style={{ textAlign: 'center' }}>
//                     <h2>⭐Funzone⭐</h2>
//                     <div style={{ display: 'flex', justifyContent: 'center' }}>
//                         <Link to="/snakegame">
//                             <img src={snakeIcon} alt="Snake Game" style={{ margin: '0 10px' }} />
//                         </Link>
//                         <Link to="/GuessTheNumber">
//                             <img src={GuessIcon} alt="Guess Game" style={{ margin: '0 10px' }} />
//                         </Link>
                        
//                     </div>
//                 </div>
//                 <div className='footer1'>
//                 Copyright @ SDP PROJECT-28 All rights reserved.                </div>
//             </div>
//         );
//     }
// }

// export default Funzone;
