import React from 'react';
import { View } from 'react-native';

const styles = {
	container: {
		backgroundColor: '#FFF',
		marginBottom: 5,
		elevation: 3
	},

};

const ContainerGroup = (props) => {
  const { container } = styles;
  return (
    <View style={container}>
		{props.children}
    </View>
  );
};

export { ContainerGroup };
