import React from 'react';
import Display from '../Display';
import Footer from '../Footer';
import './Stream.css';

function Stream() {
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <Display />
      </div>
      <Footer />
    </div>
  );
}

export default Stream;
