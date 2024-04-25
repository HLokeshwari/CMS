import React, { Component } from 'react';
import './Courseform.css';
import axios from 'axios';
import Cookies from 'js-cookie';

class Mytb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timetableData: {},
      userEmail: '' // Add state to store user's email
    };
  }

  componentDidMount() {
    this.fetchTimetableData();
  }

  fetchTimetableData = () => {
    const timetableGenerated = Cookies.get('timetableGenerated');
    if (timetableGenerated === 'true') {
      // Timetable already generated, fetch it from cookies
      const storedTimetableData = Cookies.get('timetableData');
      if (storedTimetableData) {
        this.setState({ timetableData: JSON.parse(storedTimetableData) });
      }
    } else {
      // If timetable not generated, generate and save timetable
      const timetableData = this.generateTimetableData();
      this.setState({ timetableData }, () => {
        this.saveTimetableToDatabase();
      });
    }
  };

  generateTimetableData = () => {
    // Generate timetable data
    const timetableData = {
      '9:00 - 9:50': ['MSWD'],
      '10:00 - 10:50': ['AOOP'],
      '11:00 - 11:50': ['PSQT'],
      '12:00 - 12:50': ['NPS'],
      '12:50 -1:45':['Lunch'],
      '1:45 - 2:35': ['OS']
    };
    return timetableData;
  };

  saveTimetableToDatabase = () => {
    // Send timetable data to the server to save in the database
    axios.post(`http://localhost:5000/saveTimetable`, { timetable: this.state.timetableData })
      .then(response => {
        console.log('Timetable saved to database:', response.data);
        Cookies.set('timetableGenerated', 'true');
        Cookies.set('timetableData', JSON.stringify(this.state.timetableData));
      })
      .catch(error => {
        console.error('Error saving timetable to database:', error);
      });
  };

  render() {
    const { timetableData } = this.state;
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timeSlots = [
      '9:00 - 9:50', '10:00 - 10:50', '11:00 - 11:50', '12:00 - 12:50','12:50 -1:45', '1:45 - 2:35'
    ];

    return (
      <div>
        <h2 style={{ textAlign: 'center', color: 'blue', textDecoration: 'underline' }}>Students Courses Timetable</h2>
        <table className="timetable">
          <thead>
            <tr>
              <th></th>
              {daysOfWeek.map(day => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((timeSlot, index) => (
              <tr key={index}>
                <td className="time-slot">{timeSlot}</td>
                {daysOfWeek.map(day => (
                  <td key={`${day}-${timeSlot}`} className="course-slot">
                    {timetableData[timeSlot]?.includes(day) ? 'Lunch Break' : 
                      timetableData[timeSlot] ? timetableData[timeSlot].join(', ') : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Mytb;
