import React from 'react';

import { View, Text, FlatList } from 'react-native';

class UsersList extends React.Component {
	render() {
		return (
			<View>
				<Text>Список пользователей</Text>
					<FlatList />
			</View>
		);
	}
}

export default UsersList;
