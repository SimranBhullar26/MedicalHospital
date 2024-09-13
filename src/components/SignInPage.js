import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import './SignIn.css';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User'); // Default role is 'User' for Sign In
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between sign in and sign up
  const navigate = useNavigate();

  // Handle Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Fetch the user's role from Firestore
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role; // 'User' for patients, 'Doctor' for doctors

        // Check if the selected role matches the role from Firestore
        if (userRole !== role) {
          setError(`Incorrect role selected. Please select "${userRole}".`);
          return;
      }
      

        // Redirect based on role
        if (userRole === 'Doctor') {
          navigate('/doctor-dashboard'); // Redirect to Doctor's Dashboard
        } else if (userRole === 'User') {
          navigate('/patient-dashboard'); // Redirect to Patient's Dashboard
        } else {
          setError('Role not assigned. Please contact support.');
        }
      } else {
        setError('No user data found.');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  // Handle Sign Up (Always default role to 'User')
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Store user data in Firestore with the default role 'User'
      await setDoc(doc(db, 'users', userId), {
        email: email,
        role: 'User', // Default role is 'User' (Patient)
      });

      // Redirect to Patient's Dashboard
      navigate('/patient-dashboard');
    } catch (error) {
      setError('Sign up failed. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        {/* Role selection only for Sign In */}
        {!isSignUp && (
          <>
            <label>Select Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="User">Patient</option>
              <option value="Doctor">Doctor</option>
            </select>
          </>
        )}

        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        {error && <p>{error}</p>}
      </form>

      {/* Toggle between Sign In and Sign Up */}
      <p>
        {isSignUp
          ? 'Already have an account? '
          : "Don't have an account? "}
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
};

export default SignInPage;