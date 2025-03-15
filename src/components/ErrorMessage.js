import React from 'react';

const ErrorMessage = ({ errors }) => {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="alert alert-danger mt-3" role="alert">
      <h5>Errors:</h5>
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorMessage;
