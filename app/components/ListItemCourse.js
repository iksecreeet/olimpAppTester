import React from 'react';

import { 
	View, 
	Text, 
	TouchableOpacity,
	ImageBackground, 
	StyleSheet 
	} from 'react-native';
import OlimpIcon from '../styles/Icons';

const ListItemCourse = (onPress, active, name, image, key, order, progress) => {
	const {
		text,
		textBlockParam, 
		courseItem, 
		imageParam, 
		shadowSet, 
		courseItemActive, 
		triangleShapeCss, 
		stickerIcon,
		sticker,
		progessBar 
	} = styles;
	return (
		<TouchableOpacity
		onPress={onPress}
		style={courseItem}
		key={key}
		>
          {active === 1 ? (
            <ImageBackground
              resizeMode={'cover'}
              borderRadius={3}
              style={[imageParam, shadowSet, courseItemActive]}
              source={image}
            >
            <View style={triangleShapeCss} />
              {order === 1 ? (
                <View style={sticker}>
                  <OlimpIcon name='o-checkmark' style={stickerIcon} />
                </View>
              ) : null}

              <Text style={[text, textBlockParam]}>
                {name}
              </Text>
            </ImageBackground>
          ) : 
            <ImageBackground
              resizeMode={'cover'}
              borderRadius={3}
              style={[imageParam, shadowSet]}
              source={image}
            >
            {progress === true ? (
              <View style={progessBar} />
            ) : null }
              {order === 1 ? (
                <View style={sticker}>
                  <OlimpIcon name='o-checkmark' style={stickerIcon} />
                </View>
              ) : null}
              <Text style={[text, textBlockParam]}>
                {name}
              </Text>
            </ImageBackground>
           } 
      </TouchableOpacity>
	);
};

const styles = StyleSheet.create({
courseItem: {
    width: '50%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingLeft: 6,
    paddingBottom: 12,
    paddingRight: 6,
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
triangleShapeCSS: {
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
sticker: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 20,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: 'rgba(34, 191, 86, 0.7)'
  },
stickerIcon: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold'
  },
text: {
    color: '#FFF',
    paddingHorizontal: 5,
    fontFamily: 'LatoBold',
    fontSize: 11,
    textAlign: 'center'
  },
textBlockParam: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    padding: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3
  },
progessBar: {
    backgroundColor: 'rgba(34, 191, 86, 0.5)',
    width: '45%',
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    zIndex: 2,
    position: 'absolute',
    borderBottomLeftRadius: 3
  },
});
export default ListItemCourse;
