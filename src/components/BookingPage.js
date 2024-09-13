import React, { useState } from 'react';

const BookingPage = () => {
  const [appointmentDetails, setAppointmentDetails] = useState({
    doctor: '',
    date: '',
    time: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleBooking = (e) => {
    e.preventDefault();
    alert('Appointment booked successfully!');
  };

  return (
    <div className="container">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleBooking}>
        <div className="form-group">
          <label>Doctor's Name</label>
          <input
            type="text"
            className="form-control"
            name="doctor"
            value={appointmentDetails.doctor}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={appointmentDetails.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            className="form-control"
            name="time"
            value={appointmentDetails.time}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Book Appointment</button>
      </form>
    </div>
  );
};

export default BookingPage;
