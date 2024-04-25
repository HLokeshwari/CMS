// Coursereg.js

import React, { Component } from 'react';
import { callApi, errorResponse, getSession } from './main'; // Import getSession function to retrieve session data
import './Courseform.css';

class Coursereg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [
        { id: 'c0', name: 'ESE', lecture: '', practical: '', tutorial: '', skilling: '', type: 'Regular' },
        { id: 'c1', name: 'DAV', lecture: '', practical: '', tutorial: '', skilling: '', type: 'Regular' },
        { id: 'c2', name: 'AOOP', lecture: '', practical: '', tutorial: '', skilling: '', type: 'Regular' },
        { id: 'c3', name: 'MSWD', lecture: '', practical: '', tutorial: '', skilling: '', type: 'Regular' },
        { id: 'c4', name: 'NPS', lecture: '', practical: '', tutorial: '', skilling: '', type: 'Regular' },
        { id: 'c5', name: 'DBMS', lecture: '', practical: '', tutorial: '', skilling: '', type: 'Regular' },
        { id: 'c6', name: 'DS', lecture: '', practical: '', tutorial: '', skilling: '', type: 'Regular' },
        { id: 'c7', name: 'Ctood', lecture: '', practical: '', tutorial: '', skilling: '', type: 'Regular' },
        { id: 'c8', name: 'Os', lecture: '', practical: '', tutorial: '', skilling: '', type: 'Regular' },
        // Add more courses as needed
      ],
    };
    this.Courseregister = this.Courseregister.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async Courseregister(event) {
    event.preventDefault();

    const { courses } = this.state;
    const username = getSession("sid"); // Retrieve username from session

    const courseData = courses.map(course => ({
      userName: username,
      courseId: course.id,
      courseName: course.name,
      lecture: course.lecture,
      practical: course.practical,
      tutorial: course.tutorial,
      skilling: course.skilling,
      type: course.type, // Include the type field in course data
    }));

    const url = 'http://localhost:5000/courseregistration/submit';
    const data = JSON.stringify({ courses: courseData });

    try {
      callApi('POST', url, data, this.CourseregisteredSuccess.bind(this), errorResponse);
    } catch (error) {
      errorResponse(error);
    }

    // Reset form fields after submission
    this.setState(prevState => ({
      courses: prevState.courses.map(course => ({
        ...course,
        lecture: '',
        practical: '',
        tutorial: '',
        skilling: '',
      }))
    }));
  }

  CourseregisteredSuccess(res) {
    alert(res);
  }

  handleChange(event, courseId, fieldName) {
    const { value } = event.target;
    this.setState(prevState => ({
      courses: prevState.courses.map(c => (c.id === courseId ? { ...c, [fieldName]: value } : c))
    }));
  }

  render() {
    const { courses } = this.state;

    return (
      <div className='full-height'>
        <section className="containerplace">
          <header>Regular Course Registration Form</header>
          <form className="form" onSubmit={this.Courseregister}>
            <table className='table-course'>
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Lecture</th>
                  <th>Practical</th>
                  <th>Tutorial</th>
                  <th>Skilling</th>
                  <th>Type</th> {/* Additional column for type */}
                </tr>
              </thead>
              <br></br>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.name}</td>
                    <td>
                      <select required name={`${course.id}-lecture`} value={course.lecture} onChange={(event) => this.handleChange(event, course.id, 'lecture')}>
                        <option value="" disabled>Select Lecture</option>
                        <option value="S-11">S-11</option>
                        <option value="S-12">S-12</option>
                        <option value="S-13">S-13</option>
                      </select>
                    </td>
                    <td>
                      <select required name={`${course.id}-practical`} value={course.practical} onChange={(event) => this.handleChange(event, course.id, 'practical')}>
                        <option value="" disabled>Select Practical</option>
                        <option value="S-11">S-11</option>
                        <option value="S-12">S-12</option>
                        <option value="S-13">S-13</option>
                      </select>
                    </td>
                    <td>
                      <select required name={`${course.id}-tutorial`} value={course.tutorial} onChange={(event) => this.handleChange(event, course.id, 'tutorial')}>
                        <option value="" disabled>Select Tutorial</option>
                        <option value="S-11">S-11</option>
                        <option value="S-12">S-12</option>
                        <option value="S-13">S-13</option>
                      </select>
                    </td>
                    <td>
                      <select required name={`${course.id}-skilling`} value={course.skilling} onChange={(event) => this.handleChange(event, course.id, 'skilling')}>
                        <option value="" disabled>Select Skilling</option>
                        <option value="S-11">S-11</option>
                        <option value="S-12">S-12</option>
                        <option value="S-13">S-13</option>
                      </select>
                    </td>
                    <td>{course.type}</td> {/* Display the default type */}
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
    );
  }
}

export default Coursereg;
