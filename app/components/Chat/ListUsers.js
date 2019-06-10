import React from 'react';
import { View, FlatList, Text } from 'react-native';

const styles = {
	container: {
		paddingVertical: 10,
		paddingHorizontal: 20
	},
	title: {
		fontSize: 12,
		fontFamily: 'LatoRegular'
	}
};

class ListUsers extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}
	render() {
		const { container } = styles;
		return (
			<View style={container}>
				<Text>Игроки</Text>
				<FlatList />
			</View>
		);
	}
}

export default ListUsers;
