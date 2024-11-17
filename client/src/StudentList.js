import React, { useState, useEffect } from 'react';
import './StudentList.css';
import Axios from 'axios';

const URL = "https://mern-attendance-app-api.onrender.com";

function StudentList({ studentList, attendanceData, handleAttendanceChange }) {
  const [searchResults, setSearchResults] = useState(studentList);
  const [defaultAttendanceData, setDefaultAttendanceData] = useState({});
  const [downloadDate, setDownloadDate] = useState('');

  // Single search query
  const [searchQuery, setSearchQuery] = useState('');

  // Set default attendance state for all students
  useEffect(() => {
    const defaultData = {};
    studentList.forEach((student) => {
      defaultData[student._id] = 'absent';
    });
    setDefaultAttendanceData(defaultData);
  }, [studentList]);

  // Filter students dynamically as the query changes
  useEffect(() => {
    const filteredResults = studentList.filter((student) => {
      const matchesName = student.Name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBranch = student.Branch_of_studying.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegisterNumber = student.Register_number.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesName || matchesBranch || matchesRegisterNumber;
    });
    setSearchResults(filteredResults);
  }, [searchQuery, studentList]);

  const handleUpdateAttendance = () => {
    const defaultAttendanceArray = Object.keys(defaultAttendanceData).map((studentId) => ({
      studentId,
      attendance: 'absent',
    }));

    const combinedAttendanceArray = [
      ...defaultAttendanceArray,
      ...Object.entries(attendanceData).map(([studentId, attendance]) => ({
        studentId,
        attendance,
      })),
    ];

    const resultMap = new Map();
    for (let i = combinedAttendanceArray.length - 1; i >= 0; i--) {
      const item = combinedAttendanceArray[i];
      if (!resultMap.has(item.studentId)) {
        resultMap.set(item.studentId, item);
      }
    }

    const uniqueAttendanceList = Array.from(resultMap.values());

    Axios.post(`${URL}/attendance`, { attendanceData: uniqueAttendanceList })
      .then(() => {
        console.log('Attendance recorded successfully');
      })
      .catch((error) => {
        console.error('Error recording attendance:', error);
      });
  };

  const handleDownloadToday = () => {
    Axios.get(`${URL}/attendanceToday/${downloadDate}`, { responseType: 'arraybuffer' })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `attendance-${downloadDate}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error('Error downloading attendance:', error);
      });
  };

  return (
    <div className="StudentList">
      {/* Search Form */}
      <div className="SearchComponent">
        <input
          type="text"
          placeholder="Search by Name, Branch, or Register Number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Student List */}
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Course</th>
            <th style={{ textAlign: 'center' }}>Register Number</th>
            <th style={{ textAlign: 'center' }}>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((student) => (
            <tr key={student._id}>
              <td>{student.Name}</td>
              <td>{student.Branch_of_studying}</td>
              <td>{student.Register_number}</td>
              <td>
                <div className="attendance-container">
                  <label>
                    <input
                      type="radio"
                      name={`attendance-${student._id}`}
                      value="present"
                      checked={attendanceData[student._id] === 'present'}
                      onChange={() => handleAttendanceChange(student._id, 'present')}
                    />
                    Present
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`attendance-${student._id}`}
                      value="absent"
                      checked={attendanceData[student._id] === 'absent'}
                      onChange={() => handleAttendanceChange(student._id, 'absent')}
                    />
                    Absent
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Attendance Buttons */}
      <button className="UpdateButton" onClick={handleUpdateAttendance}>
        Update
      </button>
      <input type="date" value={downloadDate} onChange={(e) => setDownloadDate(e.target.value)} />
      <button className="downloadTodayAttendance" onClick={handleDownloadToday}>
        Download
      </button>
    </div>
  );
}

export default StudentList;
