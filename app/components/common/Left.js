import React from 'react';

import { View, Text } from 'react-native';

const Left = (props) => {
	return (
		<View style={{alignSelf: 'center', alignItems: 'flex-start'}}>
			{props.children}
		</View>
	);
};

export { Left };
