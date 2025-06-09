import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link className='social-logo'>
              GROUP 2
              <i className='fas fa-ship' />
            </Link>
          </div>
          <small className='website-rights'>GROUP 2 © 2025</small>
          <div className='social-icons'>
            <Link className='social-icon-link facebook' aria-label='Facebook'>
              <i className='fab fa-facebook-f' />
            </Link>
            <Link className='social-icon-link instagram' aria-label='Instagram'>
              <i className='fab fa-instagram' />
            </Link>
            <Link className='social-icon-link youtube' aria-label='Youtube'>
              <i className='fab fa-youtube' />
            </Link>
            <Link className='social-icon-link twitter' aria-label='Twitter'>
              <i className='fab fa-twitter' />
            </Link>
            <Link className='social-icon-link linkedin' aria-label='LinkedIn'>
              <i className='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
