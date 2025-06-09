import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];
const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  to,
  isAnchor = false
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  const buttonClass = `btn ${checkButtonStyle} ${checkButtonSize}`;

  // 1. Internal scroll link (anchor)
  if (isAnchor && to) {
    return (
      <a href={to} className={`btn-mobile ${buttonClass}`} onClick={onClick}>
        {children}
      </a>
    );
  }

  // 2. React Router navigation
  if (to) {
    return (
      <Link to={to} className='btn-mobile'>
        <button className={buttonClass} onClick={onClick} type={type}>
          {children}
        </button>
      </Link>
    );
  }

  // 3. Plain button
  return (
    <button className={buttonClass} onClick={onClick} type={type}>
      {children}
    </button>
  );
};
