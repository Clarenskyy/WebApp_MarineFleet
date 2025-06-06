import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  const members = [
    { name: 'Aceron, Ramuel', image: '/images/ramuel.jpg' },
    { name: 'Belicina, Andrei Lester', image: '/images/andrei.jpg' },
    { name: 'Betasa, Mark Ian', image: '/images/mark.jpg' },
    { name: 'Crisostomo, Joshua', image: '/images/joshua.jpg' },
    { name: 'Dela Cruz, Clarence Kieth', image: '/images/klay.jpg' },
    { name: 'Diaz, Jestro', image: '/images/jestro.jpg' },
    { name: 'Egana, Mary Elizabeth', image: '/images/mary.jpg' },
    { name: 'Geva, Niño Mynel', image: '/images/mynel.jpg' },
    { name: 'Lauron, Clarence Cristopher', image: '/images/lauron.jpg' }
  ];

  return (
    <div className='footer-container'>
      <div className='footer-members'>
        <h2>About Us</h2>
        <div className='member-row'>
          {members.map((member, index) => (
            <div className='member-item' key={index}>
              <img
                src={member.image}
                alt={member.name}
                className='member-photo'
              />
              <p>{member.name}</p>
            </div>
          ))}
        </div>
      </div>

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