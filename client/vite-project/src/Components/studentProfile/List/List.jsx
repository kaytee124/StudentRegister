import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './List.css';

const List = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3002/list');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='list-items'>
            <div className='list-header'>
                <h2>Probation</h2>
            </div>
            <table width='100%'>
                <tbody>
                    <tr>
                        <td>Name</td>
                        {students.map((student, index) => (
                            <td key={`name-${index}`}>{student.full_name}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>GPA</td>
                        {students.map((student, index) => (
                            <td key={`gpa-${index}`}>{student.GPA}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Year Group</td>
                        {students.map((student, index) => (
                            <td key={`year-${index}`}>{student.YearGroup}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default List;
