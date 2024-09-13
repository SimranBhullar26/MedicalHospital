import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [notes, setNotes] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'appointments'));
      const appointmentsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(appointmentsList);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchFeedback = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'feedback'));
      const feedbacks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeedbackList(feedbacks);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const updateAppointmentStatus = async (id, newStatus) => {
    try {
      const appointmentRef = doc(db, 'appointments', id);
      await updateDoc(appointmentRef, { status: newStatus });
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      const appointmentRef = doc(db, 'appointments', id);
      await deleteDoc(appointmentRef);
      fetchAppointments();
    } catch (error) {
      console.error('Error canceling appointment:', error);
    }
  };

  const saveNotes = async (id) => {
    try {
      const appointmentRef = doc(db, 'appointments', id);
      await updateDoc(appointmentRef, { notes });
      setNotes('');
      fetchAppointments();
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const deleteFeedback = async (id) => {
    try {
      const feedbackRef = doc(db, 'feedback', id);
      await deleteDoc(feedbackRef);
      fetchFeedback();
    } catch (error) {
      console.error('Error deleting feedback:', error);
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
    fetchFeedback();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Doctor Dashboard</h2>

      <button className="btn btn-danger float-right" onClick={handleSignOut}>
        Sign Out
      </button>

      <h3>Today's Appointments</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.patientName}</td>
              <td>{appointment.time}</td>
              <td>{appointment.status}</td>
              <td>
                <button className="btn btn-warning" onClick={() => updateAppointmentStatus(appointment.id, 'Rescheduled')}>
                  Reschedule
                </button>
                <button className="btn btn-danger" onClick={() => cancelAppointment(appointment.id)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={() => setSelectedAppointment(appointment.id)}>
                  Add Notes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedAppointment && (
        <div className="mt-4">
          <h4>Add Notes</h4>
          <textarea
            className="form-control"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
          <button className="btn btn-success mt-2" onClick={() => saveNotes(selectedAppointment)}>
            Save Notes
          </button>
        </div>
      )}

      <h3 className="mt-5">Patient Feedback</h3>
      {feedbackList.length > 0 ? (
        <ul className="list-group">
          {feedbackList.map((feedback) => (
            <li key={feedback.id} className="list-group-item">
              <p><strong>Name:</strong> {feedback.name}</p>
              <p><strong>Email:</strong> {feedback.email}</p>
              <p><strong>Feedback:</strong> {feedback.feedback}</p>
              <p><strong>Date:</strong> {new Date(feedback.timestamp?.seconds * 1000).toLocaleString()}</p>
              <button className="btn btn-danger mt-2" onClick={() => deleteFeedback(feedback.id)}>
                Delete Feedback
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedback available.</p>
      )}
    </div>
  );
};

export default DoctorDashboard;
