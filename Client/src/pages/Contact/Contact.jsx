import './Contact.css'
import React from 'react';

const Contact = () => {
    return(
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>If you have any questions or feedback, feel free to reach out to us!</p>
      <form action="https://formspree.io/f/mqkvozok" method="POST">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" cols="30" rows="6" required></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
    );
}

export default Contact