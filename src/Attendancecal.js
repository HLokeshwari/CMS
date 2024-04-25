import React, { Component } from 'react';
import './Attendance.css';

class Attendancecal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      present: 0,
      total: 0,
      percentage: 75,
      outputText: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: parseInt(e.target.value)
    });
  };

  handleButtonClick = () => {
    const { present, total, percentage } = this.state;

    if (present < 0 || total <= 0 || present > total) {
      this.setState({
        outputText: 'Proper values please ¯\\_(ツ)_/¯'
      });
      return;
    }

    if (present / total >= percentage / 100) {
      const daysAvailableToBunk = this.daysToBunk(present, total, percentage);
      this.setState({
        outputText: this.daysToBunkText(daysAvailableToBunk, present, total)
      });
    } else {
      const attendanceNeeded = this.reqAttendance(present, total, percentage);
      this.setState({
        outputText: this.daysToAttendClassText(attendanceNeeded, present, total, percentage)
      });
    }
  };

  reqAttendance = (present, total, percentage) => {
    return Math.ceil((percentage * total - 100 * present) / (100 - percentage));
  };

  daysToBunk = (present, total, percentage) => {
    return Math.floor((100 * present - percentage * total) / percentage);
  };

  daysToBunkText = (daysAvailableToBunk, present, total) => {
    return `You can bunk for <strong>${daysAvailableToBunk}</strong> more days.<br>Current Attendance: <strong>${present}/${total}</strong> -> <strong>${((present / total) * 100).toFixed(2)}%</strong><br>Attendance Then: <strong>${present}/${daysAvailableToBunk + total}</strong> -> <strong>${((present / (daysAvailableToBunk + total)) * 100).toFixed(2)}%</strong>`;
  };

  daysToAttendClassText = (attendanceNeeded, present, total, percentage) => {
    return `You need to attend <strong>${attendanceNeeded}</strong> more classes to attain ${percentage}% attendance<br>Current Attendance: <strong>${present}/${total}</strong> -> <strong>${((present / total) * 100).toFixed(2)}%</strong><br>Attendance Required: <strong>${attendanceNeeded + present}/${attendanceNeeded + total}</strong> -> <strong>${(((attendanceNeeded + present) / (attendanceNeeded + total)) * 100).toFixed(2)}%</strong>`;
  };

  render() {
    const { outputText } = this.state;

    return (
      <div>
        <div className="divider"></div>
        <main className="attendcontainer-centered">
          <div className="attendinput-container percentage-select-container">
            <label htmlFor="attendpercentage">Percentage Required</label>
            <select name="attendpercentage" id="percentage" className="attendpercentage-select" onChange={this.handleInputChange}>
              <option value="60">60%</option>
              <option value="65">65%</option>
              <option value="70">70%</option>
              <option value="75">75%</option>
              <option value="80">80%</option>
              <option value="85">85%</option>
              <option value="90">90%</option>
            </select>
          </div>
          <div className="attenduser-input-container">
            <div className="attendinput-container">
              <label htmlFor="present-input">Present</label>
              <input
                name="present"
                type="number"
                id="present-input"
                autoComplete="off"
                min="0"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="attendinput-container">
              <label htmlFor="total-input">Total</label>
              <input
                name="total"
                type="number"
                id="total-input"
                autoComplete="off"
                min="0"
                onChange={this.handleInputChange}
              />
            </div>
            <button id="btn" className="attendcalculate-btn" onClick={this.handleButtonClick}>Calculate</button>
          </div>
        </main>
        <div id="output-div" className="attendoutput-text" dangerouslySetInnerHTML={{ __html: outputText }}></div>
       
      </div>
    );
  }
}

export default Attendancecal;
