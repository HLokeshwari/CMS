import React, { Component } from 'react';
import { callApi, errorResponse, getSession } from './main';
import './Courseform.css';

class fCoursereg extends Component {
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
      ],
    };
    this.Courseregister = this.Courseregister.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async Courseregister(event) {
    event.preventDefault();

    const { courses } = this.state;
    const username = getSession("sid");

    // Filter out the courses that have not been selected
    const selectedCourses = courses.filter(course => (
      course.lecture !== '' || course.practical !== '' || course.tutorial !== '' || course.skilling !== ''
    ));

    const courseData = selectedCourses.map(course => ({
      userName: username,
      courseId: course.id,
      courseName: course.name,
      lecture: course.lecture,
      practical: course.practical,
      tutorial: course.tutorial,
      skilling: course.skilling,
      type: course.type,
    }));

    const url = 'http://localhost:5000/fcourseregistration/submit';
    const data = JSON.stringify({ courses: courseData });

    try {
      callApi('POST', url, data, this.CourseregisteredSuccess.bind(this), errorResponse);
    } catch (error) {
      errorResponse(error);
    }
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
          <header>Course Registration Form</header>
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
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.name}</td>
                    <td>
                      <select name={`${course.id}-lecture`} value={course.lecture} onChange={(event) => this.handleChange(event, course.id, 'lecture')}>
                        <option value="">Select Lecture</option>
                        <option value="S-11">S-11</option>
                        <option value="S-12">S-12</option>
                        <option value="S-13">S-13</option>
                      </select>
                    </td>
                    <td>
                      <select name={`${course.id}-practical`} value={course.practical} onChange={(event) => this.handleChange(event, course.id, 'practical')}>
                        <option value="">Select Practical</option>
                        <option value="S-11">S-11</option>
                        <option value="S-12">S-12</option>
                        <option value="S-13">S-13</option>
                      </select>
                    </td>
                    <td>
                      <select name={`${course.id}-tutorial`} value={course.tutorial} onChange={(event) => this.handleChange(event, course.id, 'tutorial')}>
                        <option value="">Select Tutorial</option>
                        <option value="S-11">S-11</option>
                        <option value="S-12">S-12</option>
                        <option value="S-13">S-13</option>
                      </select>
                    </td>
                    <td>
                      <select name={`${course.id}-skilling`} value={course.skilling} onChange={(event) => this.handleChange(event, course.id, 'skilling')}>
                        <option value="">Select Skilling</option>
                        <option value="S-11">S-11</option>
                        <option value="S-12">S-12</option>
                        <option value="S-13">S-13</option>
                      </select>
                    </td>
                    <td>{course.type}</td>
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

export default fCoursereg;
