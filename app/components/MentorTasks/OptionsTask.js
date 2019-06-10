import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

export default class OptionsTask extends React.Component {
	state = {
		isModalVisible: false
	};
	toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });
	render() {
		return (
			<View style={{ flex: 1 }}>
				<TouchableOpacity onPress={this.toggleModal}>
						<Text>Показать окно</Text>
				</TouchableOpacity>
				<Modal style={styles.bottomModal} isVisible={this.state.isModalVisible}>
					<View style={{ flex: 1 }}>
						<Text>Тут будут вопросы!</Text>
						<TouchableOpacity onPress={this.toggleModal}>
							<Text>Скрыть</Text>
						</TouchableOpacity>
					</View>
				</Modal>
			</View>
		);
	}
}

const styles = {
	bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
};

