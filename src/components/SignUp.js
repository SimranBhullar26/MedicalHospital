import React, { useState } from 'react';
import { auth, db } from './firebase'; // Import Firebase Auth and Firestore
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase Authentication
import { setDoc, doc } from 'firebase/firestore'; // Firebase Firestore
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Capture the name input
  const [role, setRole] = useState('User'); // Default role is User
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid; // Get the newly created user's UID

      // Store user data in Firestore with role (User or Doctor)
      await setDoc(doc(db, 'users', userId), {
        name: name,
        email: email,
        role: role // Role is either "User" or "Doctor"
      });

      setSuccess('User registered successfully!');
      setEmail('');
      setPassword('');
      setName('');
    } catch (error) {
      setError(`Registration failed: ${error.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      {error && <p className="alert alert-danger">{error}</p>}
      {success && <p className="alert alert-success">{success}</p>}
      <form onSubmit={handleSignUp}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <select
            className="form-select"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="User">User</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
