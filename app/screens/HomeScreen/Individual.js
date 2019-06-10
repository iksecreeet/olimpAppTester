/*
      <HeaderBackground>
      <Header>
        <Left>
        <ActionTopButton 
          onPress={() => this.props.navigation.navigate('Home')}
          pressIcon='o-goback'
        />
        </Left>
        <Title text='Индивидульные курсы' />
       <Right>   
        <View style={rows}>
            <Text style={styles.topIconText}>5000</Text>
             <OlimpIcon name='o-diamond' style={styles.topIcon} />
          </View>
        </Right>
      </Header>
      <NavButton2
        buttonText1='СЮЖЕТНЫЕ КУРСЫ'
        buttonText2='ИНДВИДУАЛЬНЫЕ КУРСЫ'
        onPress1={() => this.props.navigation.navigate('Home')}
        onPress2={() => this.props.navigation.navigate('SecondHome')}
      />
      </HeaderBackground>
*/
import React from 'react';

import { 
  View,
  SafeAreaView,
  StatusBar, 
  Text, 
  Button, 
  StyleSheet,

  
  ImageBackground, 
  TouchableOpacity 
} from 'react-native';
import OlimpIcon from '../../styles/Icons';
import { HeaderBackground, NavButton2, Header, Container, ActionTopButton, Left, Title, Right } from '../../components/common';

export default class Individual extends React.Component {
	render() {
    const { 
      flexRow, 
      headlineWrap, 
      headline, 
      courseItem, 
      ImageParam,
      shadowSet,
      text,
      rows,
      textBlockParam 
    } = styles;
		return (
      <SafeAreaView style={{ flex: 1,backgroundColor: '#0c3d84' }}>
        <Container>
        <View style={{marginTop: 10}}>
            <View style={flexRow}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('CourseNew')}
                style={courseItem}
              >
                <ImageBackground
                  resizeMode={'cover'}
                  borderRadius={3}
                  style={[ImageParam, shadowSet]}
                  source={require('../../../assets/images/own_1.jpg')}
                >
                  <Text style={[text, textBlockParam]}>
                    {'Идеальный образ'.toUpperCase()}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <View style={{
                width: '50%',
                height: '70%', 
              backgroundColor: '#bec1f8', 
              justifyContent:'center', 
              alignItems: 'flex-start',alignSelf:'center', elevation: 8, borderBottomRightRadius: 5, borderTopRightRadius: 5}}>
                <Text style={{paddingLeft: 30, fontFamily: 'LatoBold', fontSize: 16, lineHeight:20, color: '#000'}} numberOfLines={2}>
                {'Идеальный образ'.toUpperCase()}</Text>
              <Text style={{paddingHorizontal: 30, paddingTop: 5, fontFamily: 'LatoRegular'}}>Опция</Text>
              </View>
            </View>
              
            </View>
            <View style={flexRow}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('CourseNew')}
                style={courseItem}
              >
                <ImageBackground
                  resizeMode={'cover'}
                  borderRadius={3}
                  style={[ImageParam, shadowSet]}
                  source={require('../../../assets/images/own_2.jpg')}
                >
                  <Text style={[text, textBlockParam]}>
                    {'Идеальный образ'.toUpperCase()}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <View style={{
                width: '50%',
                height: '70%', 
              backgroundColor: '#fccbc0', 
              justifyContent:'center', 
              alignItems: 'flex-start',alignSelf:'center', elevation: 8, borderBottomRightRadius: 5, borderTopRightRadius: 5}}>
                <Text style={{paddingHorizontal: 30, fontFamily: 'LatoBold', fontSize: 16, lineHeight:20, color: '#000'}} numberOfLines={2}>
                {'На основе теста'.toUpperCase()}</Text>
              <Text style={{paddingLeft: 30, paddingTop: 5, fontFamily: 'LatoRegular'}}>Опция</Text>
              </View>
            </View>
              
            </View>
            </View>
          </Container>

      </SafeAreaView>

		);
	}
}


const styles = StyleSheet.create({
  flexRow: {
      flexDirection: 'column',
      marginHorizontal: 5,
      flexWrap: 'wrap',
      position: 'relative'
  },
  headlineWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20
  },
  headline: {
    color: '#fffcf9',
    fontSize: 16,
    fontFamily: 'LatoBlack'
  },
  courseItem: {
    width: '50%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 12,
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
    padding: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3
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
  },
});
