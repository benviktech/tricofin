import React from 'react';
import './index.css';

export const Button = ({name}) => (
    <button>{name}</button>
);

export const Input = ({type}) => (
    <input type={type} />
);