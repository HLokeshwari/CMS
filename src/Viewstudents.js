import React, { useState, useEffect } from 'react';
import './Viewstudents.css'; // Import CSS file for styling

const Viewstudents = () => {
    const [studentData, setStudentData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchStudentData();
    }, []);

    const fetchStudentData = () => {
        const url = 'http://localhost:5000/studentregistration/submit'; // Change the URL as per your backend endpoint

        // Make an HTTP GET request to fetch student registration data
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Update the studentData state with the fetched student registration data
                setStudentData(data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error fetching student registration data:', error);
            });
    };

    const handlePrint = () => {
        window.print();
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = async (studentIdToDelete) => {
        const url = `http://localhost:5000/student/delete`;

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

            // Update studentData state by removing the deleted student
            setStudentData(prevStudentData =>
                prevStudentData.filter(student => student.studentId !== studentIdToDelete)
            );
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const filteredStudentData = studentData.filter(student =>
        student.firstname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h2 style={{ textAlign: 'center', color: 'blue', textDecoration: 'underline' }}>Students Data</h2>
            <div className="button10-container">
                <button1 onClick={handlePrint} className="custom-button10">🖨️Print</button1>
            </div>
            <input
                type="text"
                placeholder="Search by First Name"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ width: '155px', height: '2px', fontSize: '12px' }} // Adjust size and font as needed
            />
            <table className="trip-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Contact No</th>
                        <th>Email id</th>
                        <th>Action</th>
                        <th>Video</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudentData.map((student, index) => (
                        <tr key={index}>
                            <td>{student.firstname}</td>
                            <td>{student.lastname}</td>
                            <td>{student.contactno}</td>
                            <td>{student.emailid}</td>
                            <td>
                {student.videourl && (
                           <a href={require('./images/video/' + student.videourl)} download>
                           Download
                           </a>
                            )}
                         </td>            
                        
                            <td><button1 className='custom-button11' onClick={() => handleDelete(student.studentId)}>🚮Delete</button1></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Viewstudents;
