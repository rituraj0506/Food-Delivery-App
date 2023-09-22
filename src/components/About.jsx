

import React from 'react';
import aboutImage from "../components/img/3d6da0176211015.Y3JvcCwxNjEzLDEyNjEsMCww.webp"; // Replace with your actual image

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1 className="about-us-heading">About Us</h1>
      <p className="about-us-content">
        Welcome to City Fresh Vegetables! We are dedicated to providing you
        with the finest and freshest selection of vegetables. Our mission is
        to encourage healthy eating and support local farmers.
      </p>
      <p className="about-us-content">
        Our team is committed to sourcing every vegetable directly from local
        farms. We believe in sustainable farming practices that bring nature's
        goodness to your table.
      </p>
      <p className="about-us-content">
        Whether you're a culinary enthusiast or a beginner, you'll discover a
        diverse range of vegetables to suit your needs. We are dedicated to
        delivering top-quality produce at affordable prices.
      </p>
      <p className="about-us-content">
        Thank you for choosing City Fresh Vegetables. Join us in our journey
        towards a healthier and greener world.
      </p>
      <img
        src={aboutImage}
        alt="Fresh Vegetables"
        className="about-us-image"
      />
    </div>
  );
};

export default AboutUs;

