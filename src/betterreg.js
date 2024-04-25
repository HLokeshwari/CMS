//betterreg.js
import React, { Component } from 'react';
import { callApi, errorResponse, getSession } from './main';
import './Courseform.css';

class Betterreg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [
        { id: 'C0', name: 'ESE' },
        { id: 'C1', name: 'DAV' },
        { id: 'C2', name: 'AOOP' },
        { id: 'C3', name: 'MSWD' },
        { id: 'C4', name: 'NPS' },
        { id: 'C5', name: 'DBMS' },
        { id: 'C6', name: 'DS' },
        { id: 'C7', name: 'CTOOD' },
        { id: 'C8', name: 'OS' },
      ],
      selectedCourses: [],
    };
    this.handleCourseChange = this.handleCourseChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCourseChange(event, courseId) {
    const { value } = event.target;
    this.setState(prevState => {
      if (value === 'none') {
        return {
          selectedCourses: prevState.selectedCourses.filter(id => id !== courseId),
        };
      } else {
        return {
          selectedCourses: [...prevState.selectedCourses, courseId],
        };
      }
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { selectedCourses } = this.state;
    const username = getSession("sid");
    const courseData = selectedCourses.map(courseId => {
      const course = this.state.courses.find(course => course.id === courseId);
      return {
        userName: username,
        courseId: courseId,
        courseName: course.name,
      };
    });
    const url = 'http://localhost:5000/betterregistration/submit';
    const data = JSON.stringify({ courses: courseData });
    try {
      callApi('POST', url, data, this.handleSuccess.bind(this), errorResponse);
    } catch (error) {
      errorResponse(error);
    }
  }

  handleSuccess(res) {
    alert(res);
    this.setState({ selectedCourses: [] }); // Reset selected courses after successful registration
  }

  render() {
    const { courses, selectedCourses } = this.state;

    return (
      <div className='full-height'>
        <section className="containerplace">
          <header>Betterment Course Registration Form</header>
          <form className="form" onSubmit={this.handleSubmit}>
            <table className='table-course'>
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.name}</td>
                    <td>
                      <select 
                        name={`${course.id}-selection`}
                        value={selectedCourses.includes(course.id) ? 'selected' : 'none'}
                        onChange={event => this.handleCourseChange(event, course.id)}
                      >
                        <option value="none">None</option>
                        <option value="selected">Selected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="submit">Register</button>
          </form>
        </section>
      </div>
    );
  }
}

export default Betterreg;