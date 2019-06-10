import React from 'react';

import { View } from 'react-native';

const Right = (props) => { 
	return (
		<View style={{ flex: 1, alignSelf: 'center', alignItems: 'flex-end' }}>
			{props.children}
		</View>
	);
};

export { Right };
