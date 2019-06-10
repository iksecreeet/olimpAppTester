import React from 'react';

import { 
  View, 
  Text, 
  Button,
  ScrollView, 
  StyleSheet,
  ImageBackground, 
  TouchableOpacity 
} from 'react-native';
import OlimpIcon from '../styles/Icons';
import { HeaderBackground2, Header, Container, ActionTopButton, Left, Title, Right } from '../components/common';

export default class Wisdom extends React.Component {
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
      <View style={{ flex: 1 }}>
      <Header>
        <Left>
        <ActionTopButton 
          onPress={() => this.props.navigation.navigate('Common')}
          pressIcon='o-goback'
        />
        </Left>
        <Title text='Мудрость' />
       <Right>   
        <View style={rows}>
            <Text style={styles.topIconText}>5000</Text>
             <OlimpIcon name='o-diamond' style={styles.topIcon} />
          </View>
        </Right>
      </Header>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>{'Мудрость'.toUpperCase()}</Text>
          </View>
      </View>

		);
	}
}


const styles = StyleSheet.create({
  flexRow: {
      flexDirection: 'column',
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
