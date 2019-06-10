import React from 'react';

import { View, ActivityIndicator } from 'react-native';

const Loader = ({ size, color }) => {
	return (
		<View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, flex: 1 }}>
			<ActivityIndicator size={size || 'large'} color={ color || '#FFF'} />
		</View>
	);
};

export { Loader };
