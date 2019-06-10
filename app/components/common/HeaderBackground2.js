import React from 'react';

import {
	StyleSheet,  
	ImageBackground,
	View,
	Text,
	StatusBar,
	Platform 
	} from 'react-native';

export default class HeaderBackground2 extends React.Component {
static navigationOptions = ({ navigation }) => ({ 
	title: navigation.state.params.title || 'default title'
});

	render() {
		return (
			<View>
			<View style={styles.statusBar}>
			    <StatusBar animated translucent backgroundColor="#133a72" />
		    </View>
			<View style={styles.headerBody}>
			</View>
			</View>
		);
	}
}

const styles = {
	headerBody: {
		backgroundColor: '#17478d',
		height: Platform.OS === 'ios' ? 64 : 56,
        //marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight, 
		paddingLeft: 16,
		paddingRight: 16,
		flexDirection: 'row',
		alignItems: 'center',
		//elevation: 4
	},
	statusBar: {
		height: StatusBar.currentHeight,
		backgroundColor: '#133a72'
	}
};

export { HeaderBackground2 };
