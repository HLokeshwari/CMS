import React, { Component } from 'react';
import { callApi, getSession, errorResponse } from './main';
import './Courseform.css';

class Failedreg extends Component {
  constructor() {
    super();
    this.state = {
      courses: [
        { id: 'c1', name: 'CIT', lecture: '', practical: '', tutorial: '', skilling: '', type: 'failed' },
        { id: 'c2', name: 'MATH', lecture: '', practical: '', tutorial: '', skilling: '', type: 'failed' },
        { id: 'c3', name: 'MSWD', lecture: '', practical: '', tutorial: '', skilling: '', type: 'failed' },
        { id: 'c4', name: 'NPS', lecture: '', practical: '', tutorial: '', skilling: '', type: 'failed' },
        { id: 'c5', name: 'DBMS', lecture: '', practical: '', tutorial: '', skilling: '', type: 'failed' },
        { id: 'c6', name: 'DS', lecture: '', practical: '', tutorial: '', skilling: '', type: 'failed' },
        { id: 'c7', name: 'Ctood', lecture: '', practical: '', tutorial: '', skilling: '', type: 'failed' },
        { id: 'c8', name: 'Os', lecture: '', practical: '', tutorial: '', skilling: '', type: 'failed' },
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleComponentChange = this.handleComponentChange.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { courses } = this.state;
    const username = getSession("sid");
  
    const failedCourses = courses.filter(course => course.lecture !== "" || course.practical !== "" || course.tutorial !== "" || course.skilling !== "");
  
    const courseData = failedCourses.map(course => ({
      userName: username,
      courseId: course.id,
      courseName: course.name,
      lecture: course.lecture,
      practical: course.practical,
      tutorial: course.tutorial,
      skilling: course.skilling,
      type: course.type, // Include the type field
    }));
  
    const url = 'http://localhost:5000/failedregistration/submit';
    const data = JSON.stringify({ courses: courseData });
  
    try {
      callApi('POST', url, data, this.handleSuccess.bind(this), errorResponse);
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

  handleSuccess(res) {
    alert(res);
  }

  handleComponentChange(event, courseId, componentName) {
    const { value } = event.target;
    this.setState(prevState => ({
      courses: prevState.courses.map(course => 
        course.id === courseId ? { ...course, [componentName]: value } : course
      )
    }));
  }

  render() {
    const { courses } = this.state;

    return (
      <div className='full-height'>
        <section className="containerplace">
          <header>Failed Course Registration Form</header>
          <form className="form" onSubmit={this.handleSubmit}>
            <table className='table-course'>
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Lecture</th>
                  <th>Practical</th>
                  <th>Tutorial</th>
                  <th>Skilling</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.name}</td>
                    <td>
                      <select
                        value={course.lecture}
                        onChange={event => this.handleComponentChange(event, course.id, 'lecture')}
                      >
                        <option value="">Select Lecture</option>
                        <option value="S-11">S-11</option>
                        <option value="S-12">S-12</option>
                        <option value="S-13">S-13</option>
                      </select>
                    </td>
                    <td>
                      <select
                        value={course.practical}
                        onChange={event => this.handleComponentChange(event, course.id, 'practical')}
                      >
                        <option value="">Select Practical</option>
                        <option value="S-11">S-11</option>
                        <option value="S-12">S-12</option>
                        <option value="S-13">S-13</option>
                      </select>
                    </td>
                    <td>
                      <select
                        value={course.tutorial}
                        onChange={event => this.handleComponentChange(event, course.id, 'tutorial')}
                      >
                        <option value="">Select Tutorial</option>
                        <option value="S-11">S-11</option>
                        <option value="S-12">S-12</option>
                        <option value="S-13">S-13</option>
                      </select>
                    </td>
                    <td>
                      <select
                        value={course.skilling}
                        onChange={event => this.handleComponentChange(event, course.id, 'skilling')}
                      >
                        <option value="">Select Skilling</option>
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

export default Failedreg;
