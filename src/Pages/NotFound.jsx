import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p> Classified Jurassic sience 🦖, run while you still can  </p>
      <Link to="/">Go Back to Narnia</Link>
    </div>
  );
}

export default NotFound;