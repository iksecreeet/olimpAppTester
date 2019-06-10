import React from 'react';

import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import Modal from 'react-native-modal';
import OlimpIcon from '../../styles/Icons';

let value = 'Да';
export default class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.onOptionClick = this.onOptionClick.bind(this);
  }
	state = {
		isModalVisible: false
	};
    onOptionClick({ value }) {
    	this.props.triggerNextStep({ value });
    	this.setState({ isModalVisible: !this.state.isModalVisible });
  	}
	toggleModal = () =>
		this.setState({ isModalVisible: !this.state.isModalVisible });

	render() {
		return (
			<View>
				<TouchableOpacity onPress={this.toggleModal} style={{
					  backgroundColor: 'white',
					  paddingVertical: 12,
					  paddingHorizontal: 20,
					  marginLeft:15,
					  borderRadius: 22,
					  borderColor: '#3dae58',
					  borderRadius: 22,
					  justifyContent: 'center',
					  alignItems: 'center',
					  width: 150,
					  borderWidth: 3
				}}>
					<Text style={{fontFamily: 'LatoRegular', fontSize: 12, color: 'black'}}>ВЫБРАТЬ ОТВЕТ...</Text>
				</TouchableOpacity>
				<Modal
					style={styles.bottomModal}
					isVisible={this.state.isModalVisible}
				>
					<View
						style={{
							position: 'relative',
							justifyContent: 'flex-end'
						}}
					>
						<ImageBackground
							style={{
								width: '100%',
								height: 85,
								position: 'absolute',
								top: 50
							}}
							resizeMode='contain'
							source={require('../../../assets/images/topoptionsbg.png')}
						>
							<Text
								style={{
									left: 55,
									top: 30,
									fontFamily: 'LatoRegular',
									color: 'black'
								}}
							>
								Сделал задание?
							</Text>
						</ImageBackground>
						<View
							style={{
								paddingHorizontal: 40,
								position: 'relative',
								backgroundColor: '#FFF',
								height: '70%'
							}}
						>
							<TouchableOpacity  style={{
					  backgroundColor: 'white',
					  paddingVertical: 7,
					  paddingHorizontal: 15,
					  borderRadius: 22,
					  borderColor: '#3dae58',
					  borderRadius: 22,
					  justifyContent: 'flex-start',
					  alignItems: 'flex-start',
					  width: '70%',
					  borderWidth: 3
				}} onPress={() => this.onOptionClick({ value })}>
								<Text style={{color: 'black', fontFamily: 'LatoRegular'}}>Мне было не интересно</Text>
							</TouchableOpacity>
							<TouchableOpacity  style={{
					  backgroundColor: 'white',
					  paddingVertical: 7,
					  paddingHorizontal: 15,
					  borderRadius: 22,
					  marginTop: 10,
					  borderColor: '#3dae58',
					  borderRadius: 22,
					  justifyContent: 'flex-start',
					  alignItems: 'flex-start',
					  width: '70%',
					  borderWidth: 3
				}} onPress={() => this.onOptionClick({ value })}>
								<Text style={{color: 'black', fontFamily: 'LatoRegular'}}>Я все пропустил</Text>
							</TouchableOpacity>
						</View>

						<TouchableOpacity
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								width: 40,
								height: 40,
								borderRadius: 40 / 2,
								backgroundColor: 'white',
								position: 'absolute',
								right: 15,
								top: 85
							}}
							onPress={this.toggleModal}
						>
							<OlimpIcon name='o-close' style={{fontSize: 12, color: '#000'}} />
						</TouchableOpacity>
					</View>
				</Modal>
			</View>
		);
	}
}

const styles = {
	bottomModal: {
		position: 'relative',
		justifyContent: 'flex-end',
		margin: 0
	}
};