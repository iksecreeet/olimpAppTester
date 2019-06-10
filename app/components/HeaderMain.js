import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View, SafeAreaView, Platform, Text, ImageBackground } from 'react-native';
import OlimpIcon from '../styles/Icons';
import { ActionTopButton, Left, Title, Right } from '../components/common';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const isAndroid = Platform.OS === 'android';
export default class HeaderMain extends Component {
	render() {
		const { title, icon } = this.props;
		return (
			<SafeAreaView>
				<View style={styles.statusBar}>
					<StatusBar translucent backgroundColor="#133a72" />
				</View>
				<View style={styles.headerBody}>
					<Left>
						<ActionTopButton
							onPress={() => this.props.navigation.openDrawer()}
							pressIcon='o-menu_m'
						/>
					</Left>
					<Title text={title} />
					<Right>
						<View style={styles.rows}>
							<Text style={styles.topIconText}>5000</Text>
							<OlimpIcon
								name='o-diamond'
								style={styles.topIcon}
							/>
						</View>
					</Right>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = {
	headerBody: {
		backgroundColor: '#17478d',
		height: Platform.OS === 'ios' ? 64 : 56,
		//paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
		paddingLeft: 16,
		paddingRight: 16,
		flexDirection: 'row',
		alignItems: 'center'
		//elevation: 4
	},
	statusBar: {
		height: STATUSBAR_HEIGHT,
		backgroundColor: '#133a72'
	},
	headerBackground: {
		alignSelf: 'stretch', 
		width: '100%', 
		height: StatusBar.currentHeight + 56,
		zIndex: 1, 
		elevation: 9,
		backgroundColor: '#0c3d84'
	},
	rows: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-end'
	},
	topIconText: {
		color: '#FFF',
		fontSize: 16,
		fontFamily: 'LatoSemibold'
	},
	topIcon: {
		color: '#FFF',
		fontSize: 20,
		paddingLeft: 8
	}
};

HeaderMain.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object
};
