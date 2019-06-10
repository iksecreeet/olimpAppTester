import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const styles = {
	buttonStyle: {
		flex: 1,
    alignSelf: 'stretch',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ffb94d',
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: '#fff'
	},
  textStyle: {
    alignSelf: 'center',
    color: '#ffb94d',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
};

const Button = ({ text, onPress }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export { Button };
