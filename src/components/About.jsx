import React from "react";
//import aboutImage from "../components/img/3d6da0176211015.Y3JvcCwxNjEzLDEyNjEsMCww.webp"; // Replace with your actual image
import aboutImage from "../components/img/sun-planet.jpg"; // Replace with your actual image

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1 className="about-us-heading">About Us</h1>
      <p className="about-us-content">
        Welcome to [ City Restaurant]! We are dedicated to providing you with
        the finest dining experience, combining exquisite flavors with
        exceptional service.
      </p>
      <p className="about-us-content">
        Our culinary team is committed to sourcing the freshest ingredients,
        ensuring every dish is a masterpiece of taste and presentation.
      </p>
      <p className="about-us-content">
        Whether you're a food connoisseur or simply looking for a delightful
        meal, our menu offers a diverse selection of dishes crafted with passion
        and creativity.
      </p>
      <p className="about-us-content">
        Thank you for choosing [City Restaurant]. Join us in our culinary
        journey as we strive to exceed your expectations and create memorable
        dining experiences.
      </p>
      <img src={aboutImage} alt="Fresh Vegetables" className="about-us-image" />
    </div>
  );
};

export default AboutUs;
