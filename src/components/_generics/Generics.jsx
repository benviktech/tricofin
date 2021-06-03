import React from 'react';
import './index.css';

export const Button = ({name, onClick, type="button"}) => (
    <button
    type={type}
    onClick={onClick}
    >{name}</button>
);

export const Input = ({type, handleChange, value, name, placeholder, disabled,checked}) => (
    <input
    onChange={handleChange}
    type={type}
    name={name}
    value= {value} 
    placeholder={placeholder}
    disabled={disabled}
    checked={checked}
    />
);