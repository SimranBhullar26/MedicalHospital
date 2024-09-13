import React, { useState } from 'react';
import { db } from './firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import './DoctorAvailability.css';

const DoctorAvailability = () => {
  const [days, setDays] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [interval, setInterval] = useState('');
  const [success, setSuccess] = useState('');

  const handleAvailabilitySubmit = async (e) => {
    e.preventDefault();

    const availabilityData = {
      days,
      startTime,
      endTime,
      interval,
    };

    try {
      await addDoc(collection(db, 'doctor_availability'), availabilityData);
      setSuccess('Availability saved successfully!');
    } catch (error) {
      console.error('Error setting availability:', error);
    }
  };

  const handleDaysChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setDays([...days, value]);
    } else {
      setDays(days.filter((day) => day !== value));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Set Your Availability</h2>
      {success && <p className="alert alert-success">{success}</p>}
      <form onSubmit={handleAvailabilitySubmit}>
        <div className="mb-3">
          <label>Select Days:</label><br />
          <label><input type="checkbox" value="Monday" onChange={handleDaysChange} /> Monday</label>
          <label><input type="checkbox" value="Tuesday" onChange={handleDaysChange} /> Tuesday</label>
          <label><input type="checkbox" value="Wednesday" onChange={handleDaysChange} /> Wednesday</label>
          <label><input type="checkbox" value="Thursday" onChange={handleDaysChange} /> Thursday</label>
          <label><input type="checkbox" value="Friday" onChange={handleDaysChange} /> Friday</label>
        </div>
        <div className="mb-3">
          <label htmlFor="startTime" className="form-label">Start Time</label>
          <input
            type="time"
            className="form-control"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endTime" className="form-label">End Time</label>
          <input
            type="time"
            className="form-control"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="interval" className="form-label">Appointment Interval (minutes)</label>
          <input
            type="number"
            className="form-control"
            id="interval"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Availability</button>
      </form>
    </div>
  );
};

export default DoctorAvailability;
