/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */

import React from 'react';
import { ButtonSpinner } from './ButtonSpinner';
import './index.css';

export const Button = ({
  name, onClick, type = 'button', disabled, showSpinner,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={disabled ? 'button-disabled' : 'button-active'}
  >
    <span>{name}</span>
    {showSpinner && <span><ButtonSpinner /></span>}
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
