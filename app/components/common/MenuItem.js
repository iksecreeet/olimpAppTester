import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
  } from 'react-native';

import { Left } from '../common';

import OlimpIcon from '../../styles/Icons';

const styles = {
	buttonStyle: {
		flexDirection: 'row',
    paddingVertical: 12,
    paddingLeft: 35,
    flex: 1
	},
  iconStyle: {
      color: '#c5dcfc',
      fontSize: 18,
      width: 22,
      textAlign: 'center'
  },
  textStyle: {
      color: '#c5dcfc',
      fontSize: 14,
      marginLeft: 10,
      fontFamily: 'LatoRegular',
      justifyContent: 'center'
  },
};
const MenuItem = ({ text, onPress, name }) => {
  const { buttonStyle, textStyle, iconStyle } = styles;
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={buttonStyle}>
        <Left>
          <OlimpIcon name={name} style={iconStyle} />
        </Left>
        <Text style={textStyle}>{text}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};
/*
<Right>
  <View style={{justifyContent: 'center', backgroundColor: 'green', borderRadius:50, width: 18, height:18}}><Text style={{color: 'white', fontSize: 12, textAlign:'center'}}>1</Text></View>
</Right>
*/
export { MenuItem };

