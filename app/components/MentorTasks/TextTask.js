import React from 'react';
import { 
  View, 
  Text, 
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Slider,
  Platform,
  StyleSheet,  
} from 'react-native';
import SkyText from './SkyText';

export default class TextTask extends React.Component {  
	render() {
		return (
			<View style={{ marginBottom: 0, marginLeft: 20 }}>
      <SkyText />
        <View 
        style={
        {
          backgroundColor: '#FFF', 
          width: 320,
          justifyContent: 'center', 
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10
        }}
        >
        <Text style={{ color: '#203348', fontFamily: 'LatoRegular', paddingLeft: 25 }}>
         {this.props.botText}
        </Text>
        <Text 
        style={{ 
          color: '#203348', 
          textAlign: 'right', 
          fontSize: 10, 
          paddingRight: 15 
        }}
        >
          12:43
        </Text>
        </View>
			</View>
		);
	}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
    padding: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(240,240,240,1)',
  },
  button: {
    backgroundColor: 'rgba(220,220,220,1)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    padding: 7,
  },
  header: {
    textAlign: 'left',
  },
  feature: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgb(180,180,180)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,230,230)',
  },
});
