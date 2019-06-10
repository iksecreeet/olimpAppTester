// Final Season 

import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import OlimpIcon from '../styles/Icons';

export default class LastSeasonCourse extends React.Component {
	render() {
		const { 
			finalCourseWrapper, 
			finalCourseWrapperShadow,
			finalCourseText,
			finalCourseIconWrapper
			 } = styles;
		return (
			  <View style={finalCourseWrapper}>
              <View style={finalCourseWrapperShadow}>
                <Text style={finalCourseText}>
                  {'Заключительный курс 1-ого сезона'.toUpperCase()}
                </Text>
              </View>
              <View style={finalCourseIconWrapper}>
                <Text style={{ color: '#FFF', fontSize: 20, fontFamily: 'LatoBold' }}>14700</Text>
                <OlimpIcon
                  name='o-diamond'
                  style={styles.finalCourseIcon}
                />
              </View>
              <View style={styles.courseItemLast}>
                <ImageBackground
                  borderRadius={3}
                  resizeMode={'cover'}
                  style={styles.ImageParam}
                  source={require('../../assets/images/1.jpg')}
                />
              </View>
              <View style={styles.courseItemLast}>
                <ImageBackground
                  borderRadius={3}
                  resizeMode={'cover'}
                  style={styles.ImageParam}
                  source={require('../../assets/images/2.jpg')}
                >
                  <View style={styles.darkBlock} />
                </ImageBackground>
              </View>
              <View style={styles.courseItemLast}>
                <ImageBackground
                  borderRadius={3}
                  resizeMode={'cover'}
                  style={styles.ImageParam}
                  source={require('../../assets/images/5.jpg')}
                >
                  <View style={styles.darkBlock} />
                </ImageBackground>
              </View>
              <View style={styles.courseItemLast}>
                <ImageBackground
                  borderRadius={3}
                  resizeMode={'cover'}
                  style={styles.ImageParam}
                  source={require('../../assets/images/6.jpg')}
                >
                  <View style={styles.darkBlock} />
                </ImageBackground>
              </View>
              <View style={styles.courseItemLast}>
                <ImageBackground
                  borderRadius={3}
                  resizeMode={'cover'}
                  style={styles.ImageParam}
                  source={require('../../assets/images/3.jpg')}
                >
                  <View style={styles.darkBlock} />
                </ImageBackground>
              </View>
              <View style={styles.courseItemLast}>
                <ImageBackground
                  borderRadius={3}
                  resizeMode={'cover'}
                  style={styles.ImageParam}
                  source={require('../../assets/images/4.jpg')}
                >
                  <View style={styles.darkBlock} />
                </ImageBackground>
              </View>
              <View style={styles.courseItemLast}>
                <ImageBackground
                  borderRadius={3}
                  resizeMode={'cover'}
                  style={styles.ImageParam}
                  source={require('../../assets/images/7.jpg')}
                >
                  <View style={styles.darkBlock} />
                </ImageBackground>
              </View>
              <View style={styles.courseItemLast}>
                <ImageBackground
                  borderRadius={3}
                  resizeMode={'cover'}
                  style={styles.ImageParam}
                  source={require('../../assets/images/8.jpg')}
                >
                  <View style={styles.darkBlock} />
                </ImageBackground>
              </View>
            </View>
		);
	}
}

const styles = {
 ImageParam: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    height: null,
    borderRadius: 3
  },
 finalCourseWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    position: 'relative'
  },
 finalCourseWrapperShadow: {
    backgroundColor: 'rgba(0, 16, 31, 0.7)',
    width: '100%',
    paddingBottom: 10,
    paddingTop: 10,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 4,
    position: 'absolute',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9
  },
 finalCourseText: {
    color: '#FFF',
    fontFamily: 'LatoBold',
    fontSize: 12
  },
 finalCourseIconWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: 'rgba(13,12,24,0.7)',
    width: '40%',
    zIndex: 1,
    alignItems: 'center'
  },
 finalCourseIcon: {
    color: '#7ef2a3',
    fontSize: 30,
    textAlign: 'center',
    paddingLeft: 10,
    paddingTop: 4
  },
 courseItemLast: {
    width: '25%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingLeft: 1,
    paddingBottom: 2,
    paddingRight: 1,
    borderColor: 'transparent'
  },
 darkBlock: {
    backgroundColor: 'rgba(0, 16, 31, 0.8)',
    width: '100%',
    height: '100%',
    borderRadius: 3
  }
}