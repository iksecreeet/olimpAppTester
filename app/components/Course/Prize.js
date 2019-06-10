import React from 'react';
import {
	View,
	Text,
	Image,
	Dimensions,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

import * as Animatable from 'react-native-animatable';

const win = {
	fullHeight: Dimensions.get('window').height,
	fullWidth: Dimensions.get('window').width
};
export default class Prize extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 1
		};
	}
	renderContent() {
		if (this.state.activeIndex === 1) {
			return (
				<View style={styles.textContain}>
					<Image
						source={require('../../../assets/images/vertical_lines.png')}
						style={{ height: 23, width: 3, marginLeft: 38 }}
					/>

					<Text style={styles.textColor}>
						В данном курсе ты найдешь 1 пазл для квеста 1, чтоб
						раскрыть скрытый курс
					</Text>
				</View>
			);
		}
		if (this.state.activeIndex === 2) {
			return (
				<View style={styles.textContain}>
					<Image
						source={require('../../../assets/images/vertical_lines.png')}
						style={{
							height: 23,
							width: 3,
							marginLeft: 0,
							alignSelf: 'center'
						}}
					/>
					<Text style={styles.textColor}>
						В данном курсе ты найдешь 100 кристалов
					</Text>
				</View>
			);
		}
		if (this.state.activeIndex === 3) {
			return (
				<View style={styles.textContain}>
					<Image
						source={require('../../../assets/images/vertical_lines.png')}
						style={{
							height: 23,
							width: 3,
							marginRight: 38,
							alignSelf: 'flex-end'
						}}
					/>
					<Text style={styles.textColor}>
						В данном курсе ты найдешь мобильный телефон
					</Text>
				</View>
			);
		}
	}
	render() {
		return (
			<View style={{ marginVertical: 30 }}>
				<View style={styles.wrapper}>
					<View
						style={
							this.state.activeIndex === 1
								? styles.selected
								: styles.notselected
						}
					>
						<TouchableOpacity
							onPress={() => this.setState({ activeIndex: 1 })}
						>
							<Image
								style={styles.image}
								source={require('../../../assets/images/prize1.png')}
							/>
						</TouchableOpacity>
					</View>
					<View
						style={
							this.state.activeIndex === 2
								? styles.selected
								: styles.notselected
						}
					>
						<TouchableOpacity
							onPress={() => this.setState({ activeIndex: 2 })}
						>
							<Image
								style={styles.image}
								source={require('../../../assets/images/prize2.png')}
							/>
						</TouchableOpacity>
					</View>
					<View
						style={
							this.state.activeIndex === 3
								? styles.selected
								: styles.notselected
						}
					>
						<TouchableOpacity
							onPress={() => this.setState({ activeIndex: 3 })}
						>
							<Image
								style={styles.image}
								source={require('../../../assets/images/prize3.png')}
							/>
						</TouchableOpacity>
					</View>
				</View>
				{this.renderContent()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	notselected: {
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		width: 90,
		height: 90
	},
	selected: {
		backgroundColor: '#02265b',
		borderRadius: 90 / 2,
		justifyContent: 'center',
		alignItems: 'center',
		width: 90,
		height: 90,
		position: 'relative'
	},
	image: {
		flex: 1,
		width: 60,
		height: 60,
		resizeMode: 'contain'
	},
	textContain: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	textColor: {
		paddingTop: 5,
		color: '#FFF',
		textAlign: 'center',
		fontFamily: 'LatoRegular',
		fontSize: 16,
		lineHeight: 22
	},
	sticker: {
		borderRadius: 50,
		backgroundColor: '#3dfd77',
		color: '#203348',
		paddingVertical: 5,
		paddingHorizontal: 10,
		position: 'absolute',
		right: 1,
		fontFamily: 'LatoBold',
		fontSize: 15,
		top: 8,
		zIndex: 10
	}
});
