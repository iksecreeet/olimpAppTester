// Next Season

import React from 'react';

import { View, Text, ImageBackground } from 'react-native';

const NextSeason = () => {
  const { 
   nextSeasonTitle,
   nextSeasonTitleText, 
   seasonBlock, 
   courseItemNext, 
   imageParam, 
   progressBarTitle,
   text
 } = styles;
  return (
    <View>
    <View style={nextSeasonTitle}>
        <Text style={nextSeasonTitleText}>
          {'Проголосуй за следующий сезон'.toUpperCase()}
        </Text>
    </View>
    <View style={seasonBlock}>
              <View style={courseItemNext}>
                <ImageBackground
                  resizeMode={'cover'}
                  borderBottomLeftRadius={5}
                  borderTopLeftRadius={5}
                  style={imageParam}
                  source={require('../../assets/images/1_4.jpg')}
                />
                <View style={progressBarTitle}>
                  <Text style={text}>{'Деньги'.toUpperCase()}</Text>
                </View>
              </View>
              <View style={courseItemNext}>
                <ImageBackground
                  resizeMode={'cover'}
                  borderBottomRightRadius={5}
                  borderTopRightRadius={5}
                  style={imageParam}
                  source={require('../../assets/images/1_2.jpg')}
                />
                <View style={progressBarTitle}>
                  <Text style={text}>{'Отношения'.toUpperCase()}</Text>
                </View>
              </View>
              <View style={courseItemNext}>
                <ImageBackground
                  resizeMode={'cover'}
                  borderBottomLeftRadius={5}
                  borderTopLeftRadius={5}
                  style={imageParam}
                  source={require('../../assets/images/1_3.jpg')}
                />
                <View style={progressBarTitle}>
                  <Text style={text}>{'Здоровье'.toUpperCase()}</Text>
                </View>
              </View>
              <View style={courseItemNext}>
                <ImageBackground
                  resizeMode={'cover'}
                  borderBottomRightRadius={5}
                  borderTopRightRadius={5}
                  style={imageParam}
                  source={require('../../assets/images/1_1.jpg')}
                />
                <View style={progressBarTitle}>
                  <Text style={text}>
                    {'Предназначение'.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          </View>
  );
}

const styles = {
  nextSeasonTitle: {
    justifyContent: 'center',
    width: '100%',
    marginTop: 30,
    marginBottom: 20
  },
  nextSeasonTitleText: {
    fontFamily: 'LatoRegular',
    color: '#b9d3ea',
    fontSize: 16,
    textAlign: 'center'
  },
  seasonBlock: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 30,
    backgroundColor: '#0c3c82',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 8
  },
  courseItemNext: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    aspectRatio: 16 / 9,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0
  },
  imageParam: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    height: null,
    borderRadius: 0
  },
  text: {
    color: '#FFF',
    paddingLeft: 2,
    paddingRight: 2,
    fontFamily: 'LatoBold',
    fontSize: 12,
    textAlign: 'center'
  },
  progressBarTitle: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    zIndex: 1,
    position: 'absolute',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3
  }
};
export default NextSeason;

