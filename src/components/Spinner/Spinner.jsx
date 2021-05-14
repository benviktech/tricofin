import React from 'react';
import Loader from 'react-loader-spinner';

export default function Spinner() {
  return (
    <Loader
      type="Puff"
      color="#F3F2F1"
      height={200}
      width={200}
    />
  );
}
