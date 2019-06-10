import React, { Component } from 'react';
import {
	View,
	Text,
	ImageBackground,
	TouchableOpacity,
	TouchableNativeFeedback,
	Dimensions,
	Platform,
	StyleSheet
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { PropTypes } from 'prop-types';
import OlimpIcon from '../styles/Icons';

const win = {
	fullHeight: Dimensions.get('window').height,
	fullWidth: Dimensions.get('window').width
};

class ListItem extends Component {
	render() {
		const { item, onPress } = this.props;
		return (
			<TouchableOpacity
				onPress={onPress}
				style={styles.courseItem}
				key={item.name}
			>
				{item.active === 1 ? (
					<ImageBackground
						resizeMode={'cover'}
						borderRadius={3}
						style={[
							styles.ImageParam,
							styles.shadowSet,
							styles.courseItemActive
						]}
						source={{ uri: item.thumb }}
					>
						<View style={styles.TriangleShapeCSS} />
						{item.purchased === true ? (
							<View style={styles.sticker}>
								<OlimpIcon
									name='o-checkmark'
									style={styles.stickerIcon}
								/>
							</View>
						) : null}

						<Text style={[styles.text, styles.textBlockParam]}>
							{item.name.toUpperCase()}
						</Text>
					</ImageBackground>
				) : (
					<ImageBackground
						resizeMode={'cover'}
						borderRadius={3}
						style={[styles.ImageParam, styles.shadowSet]}
						source={{ uri: item.thumb }}
					>
						{item.progress === true ? (
							<View style={styles.progessBar} />
						) : null}
						{item.purchased ? (
							<View style={styles.sticker}>
								<Svg
									viewBox='0 0 54 99'
									preserveAspectRatio='xMidYMin meet'
									width='35'
									height='38'
								>
									<Path
										d='M453,574h62a10,10,0,0,1,10,10v62a10,10,0,0,0-10-10H473a10,10,0,0,1-10-10V584A10,10,0,0,0,453,574Z'
										transform='translate(-453 -574)'
										fill='rgb(36, 191,83)'
									/>
								</Svg>
								<OlimpIcon
									name='o-checkmark'
									style={styles.stickerIcon}
								/>
							</View>
						) : (
							<View style={styles.stickerBuy}>
								<Svg
									viewBox='0 0 150 99'
									preserveAspectRatio='xMidYMin meet'
									width='120'
									height='38'
								>
									<Path
										d='M818,1099h222a10,10,0,0,1,10,10v62a10,10,0,0,0-10-10H838a10,10,0,0,1-10-10v-42A10,10,0,0,0,818,1099Z'
										transform='translate(-818 -1099)'
										fill='rgb(1,29,30, 0.5)'
									/>
								</Svg>
								<Text
									style={{
										fontFamily: 'LatoBold',
										position: 'absolute',
										top: 1,
										fontSize: 14,
										right: 42,
										color: '#FFF'
									}}
								>
									{item.price}
								</Text>
								<OlimpIcon
									name='o-diamond'
									style={{
										color: '#7ef2a3',
										fontSize: 22,
										position: 'absolute',
										top: 1,
										right: 6
									}}
								/>
							</View>
						)}
						<Text
							style={[
								styles.text,
								styles.textBlockParam,
								styles.progressBarTitle
							]}
						>
							{item.name.toUpperCase()}
						</Text>
					</ImageBackground>
				)}
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	courseItem: {
		width: '50%',
		aspectRatio: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		paddingLeft: 5,
		paddingRight: 5,
		paddingBottom: 10,
		borderColor: 'transparent'
	},
	ImageParam: {
		flex: 1,
		alignSelf: 'stretch',
		width: null,
		height: null,
		borderRadius: 3
	},
	shadowSet: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.0,

		elevation: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		flexGrow: 1
	},
	courseItemActive: {
		borderWidth: 3,
		borderRadius: 5,
		borderColor: '#24bf53'
	},
	TriangleShapeCSS: {
		width: 0,
		height: 0,
		borderLeftWidth: 35,
		borderRightWidth: 35,
		borderBottomWidth: 50,
		borderStyle: 'solid',
		backgroundColor: 'transparent',
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: 'rgba(34, 191, 86, 0.7)',
		position: 'absolute',
		top: '30%'
	},
	stickerBuy: {
		position: 'absolute',
		top: 0,
		right: 0,
		zIndex: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	sticker: {
		position: 'absolute',
		top: 0,
		right: 0,
		zIndex: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	stickerIcon: {
		color: '#FFF',
		fontSize: 12,
		fontWeight: 'bold',
		position: 'absolute',
		top: 5,
		right: 6
	},
	text: {
		color: '#FFF',
		paddingHorizontal: 10,
		fontFamily: 'LatoBold',
		fontSize: 12,
		textAlign: 'center'
	},
	textBlockParam: {
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		width: '100%',
		textAlignVertical: 'center',
		padding: 5,
		minHeight: 40,
		borderBottomLeftRadius: 3,
		borderBottomRightRadius: 3
	},
	progessBar: {
		backgroundColor: 'rgba(34, 191, 86, 0.8)',
		width: '45%',
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		bottom: 0,
		left: 0,
		zIndex: 2,
		position: 'absolute',
		borderBottomLeftRadius: 3
	}
});

ListItem.propTypes = {
	item: PropTypes.object,
	onPress: PropTypes.func
};

export default ListItem;
