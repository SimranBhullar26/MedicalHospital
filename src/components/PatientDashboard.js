import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import FeedbackForm from './FeedbackForm'; 
import './PatientDashboard.css';

const stripePromise = loadStripe('pk_test_51PxeCCI4N1Y5k58AvXa4busSy9jqPV07pYuhr7JyiHRM3eG2EbMHWSxMRniCUfeEj0vpJkf6XPcuLKLGBXO7Tnug006MX3M2qD');

const PatientDashboard = () => {
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [paymentStep, setPaymentStep] = useState(false); // Payment step state
  const navigate = useNavigate();

  const patientId = auth.currentUser?.uid;
  const patientName = auth.currentUser?.email; // You can change this to actual patient name if stored

  // Fetch existing appointments
  const fetchAppointments = async () => {
    try {
      const q = query(collection(db, 'appointments'), where('patientId', '==', patientId));
      const querySnapshot = await getDocs(q);
      const appointmentsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(appointmentsList);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // Check if the selected date and time is already booked
  const isTimeSlotBooked = async () => {
    const q = query(
      collection(db, 'appointments'),
      where('date', '==', date),
      where('time', '==', time),
      where('doctor', '==', doctor)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // If there's any result, the time slot is already booked
  };

  // Handle booking form submission
  const handleBooking = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Check if time slot is already booked
    const alreadyBooked = await isTimeSlotBooked();
    if (alreadyBooked) {
      setError('This appointment slot is already booked. Please choose a different time.');
      return;
    }

    // Move to the payment step
    setPaymentStep(true);
  };

  // Handle payment success
  const handlePaymentSuccess = async () => {
    try {
      // Add new appointment
      await addDoc(collection(db, 'appointments'), {
        patientId: patientId,
        patientName: patientName,
        doctor: doctor,
        date: date,
        time: time,
      });
      setSuccess('Appointment booked and payment successful!');
      setDoctor('');
      setDate('');
      setTime('');
      setPaymentStep(false); // Reset payment step
      fetchAppointments(); // Refresh appointments
    } catch (error) {
      setError('Failed to book appointment: ' + error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="container">
      <h2>Patient Dashboard</h2>

      {/* Booking Form */}
      <h3>Book an Appointment</h3>
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}
      {paymentStep ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm onPaymentSuccess={handlePaymentSuccess} />
        </Elements>
      ) : (
        <form onSubmit={handleBooking}> 
          <div className="form-group">
            <label>Doctor</label>
            <select
              className="form-control"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              required
            >
              <option value="">Select a Doctor</option>
              <option value="Dr. Smith">Dr. Smith</option>
              <option value="Dr. Jones">Dr. Jones</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Proceed to Payment
          </button>
        </form>
      )}

      {/* Display Existing Appointments */}
      <h3 className="mt-5">Your Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments booked.</p>
      ) : (
        <ul className="list-group">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="list-group-item">
              {appointment.date} at {appointment.time} with {appointment.doctor}
            </li>
          ))}
        </ul>
      )}

      {/* Feedback Form */}
      <h3 className="mt-5">Submit Feedback</h3>
      <FeedbackForm />

      {/* Sign Out Button */}
      <button className="btn btn-danger mt-5" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default PatientDashboard;
