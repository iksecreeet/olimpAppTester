import React from 'react';

import { View } from 'react-native';

const Container = (props) => {
	return (
		<View style={styles.container}>
			{props.children}
		</View>
	);
}

const styles = {
	container: {
		paddingBottom: 10,
		paddingTop: 10,
		paddingLeft: 5,
		paddingRight: 5
	}
}
export {Container}