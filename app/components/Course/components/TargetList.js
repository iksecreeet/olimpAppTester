import React, { Component } from 'react';

import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import Timeline from 'react-native-timeline-listview';

class TargetList extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.data = [
			{ title: 'Ставить большие цели' },
			{ title: 'Доводить дела до конца' },
			{ title: 'Наполнять себя энергией и мотивацией' },
			{ title: 'Фокусироваться и мыслить масштабно' },
			{ title: 'Эффективно использовать свою волю' },
			{ title: 'Преодолевать страхи и сомнения' },
			{ title: 'Принимать трудные решения' },
			{ title: 'Не расстрачивать энергию впустую' },
			{ title: 'Жить здесь и сейчас' }
		];
	}
	render() {
		return (
			<View style={styles.timLineWrapper}>
				<ImageBackground
					resizeMode='cover'
					borderRadius={5}
					style={{ flex: 1 }}
					source={require('../../../../assets/images/line_background.jpg')}
				>
					<View style={styles.title}>
						<Text style={styles.titleText}>
							ТЫ ИСПЫТАЕШЬ{'\n'}НА СЕБЕ КАК:
						</Text>
					</View>
					<Timeline
						titleStyle={styles.timeLineTitle}
						showTime={false}
						circleSize={12}
						lineWidth={2}
						columnFormat='single-column-left'
						listViewStyle={{
							paddingLeft: 20,
							marginRight: 40
						}}
						circleColor='#19b3a6'
						lineColor='#19b3a6'
						data={this.data}
					/>
				</ImageBackground>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	timLineWrapper: {
    	borderRadius: 5,
  	},
  	title: {
  		marginLeft: 65,
		marginBottom: 30,
		marginTop: 40
  	},
  	titleText: {
  		color: '#203348',
		fontFamily: 'LatoBlack',
		fontSize: 16,
		lineHeight: 23,
		marginRight: 20,
		paddingBottom: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#e8e6e7'
  	},
  	timeLineTitle: {
  		color: '#203348',
		fontSize: 14,
		marginTop: -13,
		marginLeft: 5,
		paddingBottom: 10,
		fontFamily: 'LatoLight'
  	}

});

export default TargetList;

