import React from 'react';
import './Services.css';

const Services = () => {
  const servicesData = [
    {
      title: 'General Checkup',
      description: 'Regular health checkups to ensure you stay healthy and prevent any serious conditions.',
      icon: '🩺',
    },
    {
      title: 'Pediatrics',
      description: 'Comprehensive healthcare for children, including routine checkups, immunizations, and care for illnesses.',
      icon: '👶',
    },
    {
      title: 'Cardiology',
      description: 'Specialized heart care services, including ECGs, consultations, and treatments for heart conditions.',
      icon: '❤️',
    },
    {
      title: 'Dermatology',
      description: 'Expert care for skin, hair, and nail conditions with personalized treatment plans.',
      icon: '🧴',
    },
    {
      title: 'Radiology',
      description: 'Advanced imaging services such as X-rays, MRIs, and CT scans for accurate diagnoses.',
      icon: '🩻',
    },
    {
      title: 'Orthopedics',
      description: 'Treatment and care for bone and joint issues, including fractures, arthritis, and physical therapy.',
      icon: '🦴',
    },
  ];

  return (
    <div className="services-page">
      <h1>Our Medical Services</h1>
      <div className="services-container">
        {servicesData.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
