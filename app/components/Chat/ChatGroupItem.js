import React from 'react';

import { View, Text, Image } from 'react-native';

export default class ChatGroupItem extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {};
	}
	componentDidMount() {
		
	}
	render() {
		return (
			<View style={styles.item}>
				<View style={styles.avatar}>
					<Image />
				</View>
					<Text style={styles.name}>
						{this.props.itemName}
					</Text>	
					<Text style={styles.status.isOnline}>
						{this.props.itemStatus}
					</Text>
			</View>
		);
	}
}

const styles = {
	item: {
		padding: 10,
		elevation: 3,
		marginBottom: 10,
		backgroundColor: '#FFF'
	},
	avatatar: {
		alignSelf: 'center', 
		alignItems: 'flex-start',
		maxWidth: 30
	},
	name: {
		fontSize: 16,
		fontFamily: 'LatoBold',
		color: '#000'
	},
	status: {
		isOnline: {
			color: 'green',
			fontSize: 12,
			fontFamily: 'LatoRegular'
		},
		isOffline: {
			color: 'grey',
			fontSize: 12,
			fontFamily: 'LatoRegular'
		}
	}
};
