import React from 'react';
import { Link } from 'react-router';

const NotFound = () =>
  <div className="usa-grid">
    <h1>Nothing to see here!</h1>
    <Link to="/">Head Back</Link>
  </div>;

export default NotFound;
