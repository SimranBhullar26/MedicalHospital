import React from 'react';
import './PrivacyPolicy.css'; // Optional: Add CSS for styling

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      <p>Effective Date: [Insert Date]</p>

      <h2>1. Information We Collect</h2>
      <p>We collect personal information such as:</p>
      <ul>
        <li>Your name, email address, phone number, and medical information.</li>
        <li>Usage information such as IP addresses, browser type, and site activity.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information to provide and improve services, such as scheduling medical appointments and sending reminders.</p>

      <h2>3. How We Protect Your Information</h2>
      <p>We implement security measures such as encryption to protect your data.</p>

      <h2>4. Sharing Your Information</h2>
      <p>Your data may be shared with healthcare providers, service providers, and in compliance with legal obligations.</p>

      <h2>5. Your Rights</h2>
      <p>You have the right to access, update, or delete your personal data and to withdraw consent where applicable.</p>

      <h2>6. Cookies and Tracking Technologies</h2>
      <p>We may use cookies to enhance your experience on our website.</p>

      <h2>7. Contact Us</h2>
      <p>If you have any questions or concerns about our Privacy Policy, please contact us at:</p>
      <p>Email: [Your Email] <br/>Phone: [Your Phone Number]</p>
    </div>
  );
};

export default PrivacyPolicy;
