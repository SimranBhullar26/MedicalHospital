import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import './PatientBooking.css';

const PatientBooking = ({ patientId }) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctorSnapshot = await getDocs(collection(db, 'doctors'));
      const doctorList = doctorSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDoctors(doctorList);
    };
    fetchDoctors();
  }, []);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = {
      doctorId: selectedDoctor,
      patientId,
      date,
      time,
      status: 'Upcoming',
      notes: '',
    };

    try {
      await addDoc(collection(db, 'appointments'), appointmentData);
      setSuccess('Appointment booked successfully!');
      setDate('');
      setTime('');
      setSelectedDoctor('');
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Book an Appointment</h2>
      {success && <p className="alert alert-success">{success}</p>}
      <form onSubmit={handleBookingSubmit}>
        <div className="mb-3">
          <label htmlFor="doctor" className="form-label">Select Doctor</label>
          <select
            className="form-select"
            id="doctor"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            required
          >
            <option value="">Choose Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Select Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label">Select Time</label>
          <input
            type="time"
            className="form-control"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Book Appointment</button>
      </form>
    </div>
  );
};

export default PatientBooking;
