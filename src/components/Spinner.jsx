import React from "react";
import '../style/Spinner.css';

// Spinner component for indicating loading state
const Spinner = () => (
    <div className="spinner">
        <div className="loading-spinner"></div> {/* Spinner animation */}
        <p>Loading...</p> {/* Loading text */}
    </div>
);

export default Spinner;
