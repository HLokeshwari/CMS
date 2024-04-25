import React, { useState, useEffect } from 'react';
import './Viewstudents.css'; // Import CSS file for styling

const Viewcer = () => {
    const [cerData, setCerData] = useState([]);
    const [filteredCerData, setFilteredCerData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        fetchCerData();
    }, []);

    useEffect(() => {
        // Filter certificate data based on search term
        const filteredData = cerData.filter(cer =>
            cer.FullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cer.Email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCerData(filteredData);
    }, [searchTerm, cerData]);

    const fetchCerData = () => {
        const url = 'http://localhost:5000/certificateview/submit';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCerData(data);
                setError(null); // Clear any previous errors
            })
            .catch(error => {
                console.error('Error fetching certificate data:', error);
                setError(error.message);
            });
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', color: 'blue', textDecoration: 'underline' }}>Student Certification  Data</h2>
            <div className="button10-container">
                <button1 onClick={handlePrint} className="custom-button10">🖨️Print</button1>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by First Name or Email"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ width: '165px', height: '2px', fontSize: '12px' }} // Adjust size and font as needed
                />
            </div>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>} {/* Display error message */}
            <table className="trip-table">
                <thead>
                    <tr>
                        <th>Academic Year</th>
                        <th>Full Name</th>
                        <th>Email Id</th>
                        <th>Phone Number</th>
                        <th>Certification</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCerData.map((cer, index) => (
                        <tr key={index}>
                            <td>{cer.AcademicYear}</td>
                            <td>{cer.FullName}</td>
                            <td>{cer.Email}</td>
                            <td>{cer.PhoneNumber}</td>
                            <td>{cer.certification}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Viewcer;
