import React from "react";
import playstore from "../components/img/app-store.png";
import appstore from "../components/img/play-store.png";
import logo3 from "../components/img/logo.png";

export default function Footer() {
    return (
        <footer className="footer">
          <h2>Downlaoad Our App</h2>
            <div className="footer-row">
                <div className="footer-col">
                    <div className="app-logo">
                        <img src={playstore} alt="Play Store" />
                        <img src={appstore} alt="App Store" />
                    </div>
                </div>
                <div className="footer-col">
                    <div className="app-logo">
                        <img src={logo3} alt="Logo" />
                    </div>
                    <p>Download app for iOS and Android</p>
                </div>
                <div className="footer-col">
                    <h4>Useful Links</h4>
                    <ul>
                        <li>Coupons</li>
                        <li>Blog Post</li>
                        <li>Return Policy</li>
                        <li>Join Affiliate</li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Follow Us</h4>
                    <ul>
                        <li>Facebook</li>
                        <li>Instagram</li>
                        <li>Twitter</li>
                        <li>Youtube</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="copyright">Copyright 2023-City</p>
        </footer>
    );
}
