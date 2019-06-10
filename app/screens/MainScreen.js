import React from 'react';
import { 
	View, 
	Text, 
	ScrollView, 
	TouchableOpacity,
  FlatList, 
	ImageBackground,
  StatusBar 
} from 'react-native';
import Svg, { Path, Symbol, Circle, Image } from 'react-native-svg';
import styles from '../styles/MainScreenStyles';

import { FullHeader, HeaderButton, Container, Left, Right, Title } from '../components/common';
import NextSeason from '../components/NextSeason';
import LastSeasonCourse from '../components/LastSeasonCourse';
import OlimpIcon from '../styles/Icons';
import Courses from '../data/Courses.json';

export default class MainScreen extends React.Component {
	renderCourses() {
		return Courses.map(course => 
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Course', {
              titleName: course.name
            })}
        style={styles.courseItem}
        key={course.name}
      >
          {course.active === 1 ? (
            <ImageBackground
              resizeMode={'cover'}
              borderRadius={3}
              style={[styles.ImageParam, styles.shadowSet, styles.courseItemActive]}
              source={course.image}
            >
            <View style={styles.TriangleShapeCSS} />
              {course.order === 1 ? (
                <View style={styles.sticker}>
                  <OlimpIcon name='o-checkmark' style={styles.stickerIcon} />
                </View>
              ) : null}

              <Text style={[styles.text, styles.textBlockParam]}>
                {course.name.toUpperCase()}
              </Text>
            </ImageBackground>
          ) : 
            <ImageBackground
              resizeMode={'cover'}
              borderRadius={3}
              style={[styles.ImageParam, styles.shadowSet]}
              source={course.image}
            >
            
            {course.progress === true ? (
              <View style={styles.progessBar} />
            ) : null }
              {course.order === 1 ? (
                <View style={styles.sticker}>
            <Svg
                 viewBox="0 0 54 99"
                 preserveAspectRatio="xMidYMin meet"
                 width="35"
                 height="38"
              > 
            <Path
                d="M453,574h62a10,10,0,0,1,10,10v62a10,10,0,0,0-10-10H473a10,10,0,0,1-10-10V584A10,10,0,0,0,453,574Z" 
                transform="translate(-453 -574)"
                fill="rgb(36, 191,83)"
            />
            </Svg>
              <OlimpIcon name='o-checkmark' style={styles.stickerIcon} />
                </View>
    
              ) :            <View style={styles.stickerBuy}>
            <Svg
                 viewBox="0 0 150 99"
                 preserveAspectRatio="xMidYMin meet"
                 width="120"
                 height="38"
              > 
            <Path
                d="M818,1099h222a10,10,0,0,1,10,10v62a10,10,0,0,0-10-10H838a10,10,0,0,1-10-10v-42A10,10,0,0,0,818,1099Z" transform="translate(-818 -1099)"
                fill="rgb(1,29,30, 0.5)"
            />
            </Svg>
            <Text style={{fontFamily: 'LatoBold',position: 'absolute', top: 1, fontSize: 14, right: 42, color: '#FFF'}}>2100</Text>
            <OlimpIcon name='o-diamond' style={{ color: '#7ef2a3',
    fontSize: 22,
    position: 'absolute', 
    top: 1, 
    right: 6}} />
                </View>}
              <Text style={[styles.text, styles.textBlockParam, styles.progressBarTitle]}>
                {course.name.toUpperCase()}
              </Text>

            </ImageBackground>
           } 
      </TouchableOpacity>
		);
	} 
	render() {
		const { scroll, rows, headlineWrap, headerBody, headerBackground,  headline, seasonText, headerContent, topIconText, topIcon } = styles;
    return (
			<View style={{ flex:1 }}>
      <FullHeader>
        <Left>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <OlimpIcon name='o-menu' style={{ fontSize: 14, color: '#FFF' }} />
          </TouchableOpacity>
        </Left>
        <Title text='Твой путь' />
        <Right>   
        <View style={rows}>
            <Text style={styles.topIconText}>5000</Text>
             <OlimpIcon name='o-diamond' style={styles.topIcon} />
          </View>
        </Right>
      </FullHeader>
			<ScrollView contentContainerStyle={scroll}>
      <Container>
				<View style={headlineWrap}>
          <Text style={[headline, seasonText]}> 
            {'1 cезон'.toUpperCase()}
          </Text>
          <Text style={headline}>
            {'Вспомнить себя'.toUpperCase()}
          </Text>
    	   </View>
            	<View
		              style={{
		                flexDirection: 'row',
		                flexWrap: 'wrap',
		              }}
		            >
              {this.renderCourses()}
            </View>
            <LastSeasonCourse />
            <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}
                >
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Mentor')}
                style={styles.courseItem}
              >
                <ImageBackground
                  resizeMode={'cover'}
                  borderRadius={3}
                  style={[styles.ImageParam, styles.alignEnd]}
                  source={require('../../assets/images/lego.png')}
                >
                  <Text style={[styles.text, styles.textBlockParam]}>
                    {'Квест 1'.toUpperCase()}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Mentor')}
                style={styles.courseItem}
              >
                <ImageBackground
                  resizeMode={'cover'}
                  borderRadius={3}
                  style={[styles.ImageParam, styles.alignEnd]}
                  source={require('../../assets/images/hidden.png')}
                >
                  <Text style={[styles.text, styles.textBlockParam]}>
                    {'Квест 2'.toUpperCase()}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              </View>
            <View
              style={[styles.headlineWrap, { marginTop: 15, marginBottom: 0 }]}
            >
              <Text style={styles.headline}>
                {'Индивидуальные курсы'.toUpperCase()}
              </Text>

            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: 5,
                position: 'relative'
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Course')}
                style={styles.courseItem}
              >
                <ImageBackground
                  resizeMode={'cover'}
                  borderRadius={3}
                  style={[styles.ImageParam, styles.shadowSet]}
                  source={require('../../assets/images/own_1.jpg')}
                >
                  <Text style={[styles.text, styles.textBlockParam]}>
                    {'Идеальный образ'.toUpperCase()}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Mentor')}
                style={styles.courseItem}
              >
                <ImageBackground
                  resizeMode={'cover'}
                  borderRadius={3}
                  style={[styles.ImageParam, styles.shadowSet]}
                  source={require('../../assets/images/own_2.jpg')}
                >
                  <Text style={[styles.text, styles.textBlockParam]}>
                    {'На основе теста'.toUpperCase()}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <NextSeason />
          </Container> 
			</ScrollView>
			</View>
		);
	}
}
