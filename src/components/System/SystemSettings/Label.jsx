/* eslint-disable react/prop-types */

import React from 'react';

export default function Label({ name, icon }) {
  const withOutIcon = {
    width: '150px',
  };

  const withIcon = { display: 'flex', alignItems: 'flex-start' };

  return (
    <label htmlFor="name" style={icon ? withIcon : withOutIcon} className="form-label">
      {name && <>{name}</>}
      {icon && (
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#D7D7D7',
            width: '20px',
            height: '20px',
            borderRadius: '20px',
            padding: '2px',
            marginLeft: '3px',
          }}
        >
          {icon}
        </span>
      )}
    </label>
  );
}
