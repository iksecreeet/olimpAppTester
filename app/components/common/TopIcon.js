import React from 'react';
import { TouchableOpacity } from 'react-native';
import OlimpIcon from '../../styles/Icons';

const styles = {
  textStyle: {
    fontSize: 16, 
    color: '#FFF'
  }
};

const TopIcon = ({ name, onPress }) => {
  const { textStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress}>
      <OlimpIcon name={name} style={textStyle} />
    </TouchableOpacity>
  );
};

export { TopIcon };
