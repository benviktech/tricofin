/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */

import React from 'react';
import './index.css';

export const Button = ({
  name, onClick, type = 'button', disabled,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={disabled ? 'button-disabled' : 'button-active'}
  >
    {name}
  </button>
);

export const Input = ({
  type,
  handleChange,
  value,
  name,
  placeholder,
  disabled,
  checked,
  maxlength,
  className,
}) => (
  <input
    onChange={handleChange}
    type={type}
    name={name}
    value={value}
    placeholder={placeholder}
    disabled={disabled}
    checked={checked}
    maxLength={maxlength}
    style={{ textTransform: 'uppercase' }}
    className={className}
  />
);
