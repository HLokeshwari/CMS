import React, { useState, useEffect } from 'react';
import './Viewstudents.css'; // Import CSS file for styling

const ViewFaculty = () => {
    const [facultyData, setFacultyData] = useState([]);
    const [filteredFacultyData, setFilteredFacultyData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        fetchFacultyData();
    }, []);

    useEffect(() => {
        // Filter faculty data based on search term
        const filteredData = facultyData.filter(faculty =>
            faculty.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faculty.sub.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFacultyData(filteredData);
    }, [searchTerm, facultyData]);

    const handleDelete = async (facultyIdToDelete) => {
        const url = `http://localhost:5000/faculty/delete`;

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
            setFacultyData(prevFacultyData =>
                prevFacultyData.filter(faculty => faculty.facultytId !== facultyIdToDelete)
            );
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };
    const fetchFacultyData = () => {
        const url = 'http://localhost:5000/facultyview/submit';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setFacultyData(data);
                setError(null); // Clear any previous errors
            })
            .catch(error => {
                console.error('Error fetching faculty data:', error);
                setError(error.message);
            });
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', color: 'blue', textDecoration: 'underline' }}>Faculty Data</h2>
            <div className="button10-container">
                <button1 onClick={handlePrint} className="custom-button10">🖨️Print</button1>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by first name or subject"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ width: '165px', height: '2px', fontSize: '12px' }} // Adjust size and font as needed

                />
            </div>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>} {/* Display error message */}
            <table className="trip-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Contact Number</th>
                        <th>Email id</th>
                        <th>Qualification</th>
                        <th>Year Of Join</th>
                        <th>Experience</th>
                        <th>Subject</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {filteredFacultyData.map((faculty, index) => (
                        <tr key={index}>
                            <td>{faculty.firstname}</td>
                            <td>{faculty.lastname}</td>
                            <td>{faculty.contactno}</td>
                            <td>{faculty.emailid}</td>
                            <td>{faculty.qlc}</td>
                            <td>{faculty.yoj}</td>
                            <td>{faculty.exp}</td>
                            <td>{faculty.sub}</td>
                            <td><button1 className='custom-button11' onClick={() => handleDelete(faculty.facultyId)}>🚮Delete</button1></td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewFaculty;
