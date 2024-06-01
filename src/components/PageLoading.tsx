import React from 'react';
import { Spinner } from 'react-bootstrap';

const PageLoading: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default PageLoading;
