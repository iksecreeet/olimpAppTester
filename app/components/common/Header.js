import React from 'react';
import { StatusBar, View, Platform } from 'react-native';

const Header = (props) =>  {
		return (
			<View>
			<View style={styles.statusBar}>
			    <StatusBar translucent backgroundColor="#133a72" />
		    </View>
			<View style={styles.headerBody}>
				{props.children}
			</View>
			</View>
		);
};
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
export { Header };
