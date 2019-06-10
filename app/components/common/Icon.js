import React from 'react';
import OlimpIcon from '../../styles/Icons';

const Icon = ({ name, size, color }) => {
  return (
      <OlimpIcon name={name} style={[size,color]}/>
  );
};

export { Icon };
