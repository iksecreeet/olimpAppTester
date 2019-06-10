/*
Individual courses screen
*/

import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

class CourseIndividual extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	componentDidMount() {

	}
	render() {
		return (
			<View style={styles.container}>
				<Text>
					Индивидуальные курсы
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default CourseIndividual;
