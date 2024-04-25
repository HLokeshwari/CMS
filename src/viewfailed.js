import React, { useState, useEffect } from 'react';
import './Viewstudents.css'; // Import CSS file for styling

const Viewfailed = () => {
    const [coursesData, setCoursesData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null); // State to handle errors
    useEffect(() => {
        fetchCoursesData('http://localhost:5000/failedview/submit'); // Fetch data from the first URL
    }, []);
    
    const fetchCoursesData = (url) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCoursesData(prevData => [...prevData, ...data]); // Merge data from the new URL with existing data
                setError(null); // Clear any previous errors
            })
            .catch(error => {
                console.error('Error fetching course data:', error);
                setError(error.message);
            });
    };
    
    const handlePrint = () => {
        window.print();
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = async (courseIdToDelete) => {
        const url = `http://localhost:5000/failed/delete`;
    
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            // Update coursesData state by removing the deleted course
            setCoursesData(prevCoursesData =>
                prevCoursesData.filter(course => course.courseId !== courseIdToDelete)
            );
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };
    const filteredCoursesData = coursesData.filter(course =>
        course.courseName && course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    

    return (
        <div>
            <h2 style={{ textAlign: 'center', color: 'blue', textDecoration: 'underline' }}>Students Failed Courses Data</h2>
            <div className="button10-container">
                <button1 onClick={handlePrint} className="custom-button10">🖨️Print</button1>
            </div>
            <input
                type="text"
                placeholder="Search by Course Name"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ width: '155px', height: '2px', fontSize: '12px' }} // Adjust size and font as needed
            />
            {error && <p style={{ color: 'red' }}>Error: {error}</p>} {/* Display error message */}
            <table className="trip-table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Academic Year</th>
                        <th>Course Id</th>
                        <th>Course Name</th>
                        <th>Lecture Sec</th>
                        <th>Practical Sec</th>
                        <th>Tutorial Sec</th>
                        <th>Skilling Sec</th>
                        <th>Course Status</th>
                        <th>Action</th>
                        {/* <th>Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {filteredCoursesData.map((course, index) => (
                        <tr key={index}>
                            <td>{course.userName}</td>
                            <td>2024-2025</td>
                            <td>{course.courseId}</td>
                            <td>{course.courseName}</td>
                            <td>{course.lecture}</td>
                            <td>{course.practical}</td>
                            <td>{course.tutorial}</td>
                            <td>{course.skilling}</td>
                            <td>{course.type}</td>
                            <td><button1 className='custom-button11' onClick={() => handleDelete(course.courseId)}>🚮Delete</button1></td>
                            {/* <td><button1 className='custom-button11'>Update</button1></td> */}
                        </tr>
                    ))}
                </tbody>
            </table>

          
        </div>
    );
}

export default Viewfailed;
