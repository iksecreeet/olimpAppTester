import React from 'react';
import { TouchableOpacity, ImageBackground, Text } from 'react-native';

export default class CourseBox extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={onPress} key={key}>
        <ImageBackground
          resizeMode={'cover'}
          borderRadius={3}
          style={[styles.imageParam, styles.shadowSet]}
          source={thumb}
        />
        <Text style={[styles.text, styles.textBlockParam]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}
const styles = {
  imageParam: {
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
    backgroundColor: '#0c3c82',
    elevation: 7,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexGrow: 1
  },
  text: {
    color: '#FFF',
    paddingHorizontal: 5,
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
  }
};
