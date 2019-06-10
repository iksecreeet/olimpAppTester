/*              <HeaderBackground>
      <Header>
        <Left>
        <ActionTopButton 
          onPress={() => this.props.navigation.openDrawer()}
          pressIcon='o-menu'
        />
        </Left>
        <Title text='Отчеты' />
        <Right>   
        <View style={styles.rows}>
            <Text style={styles.topIconText}>5000</Text>
             <OlimpIcon name='o-diamond' style={styles.topIcon} />
          </View>
        </Right>
      </Header>
      <NavButton4
        buttonText1='ОТЧЕТЫ'
        buttonText2='ЗЕВС'
        onPress1={() => this.props.navigation.navigate('Reports')}
        onPress2={() => this.props.navigation.navigate('Mentor')}
      />
      </HeaderBackground>*/
import React from 'react';

import { View, Text } from 'react-native';
import { 
  Left, 
  Right, 
  HeaderBackground, 
  NavButton4, 
  Header, 
  Title, 
  ActionTopButton,
  } from '../../components/common';
  import OlimpIcon from '../../styles/Icons';
export default class ReportScreen extends React.Component {
	render() {
		return (
			<View style={{ backgroundColor: '#17478d', flex: 1 }}>
      		<View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      			<Text style={{fontSize:20, color: '#FFF', fontFamily:'LatoBold'}}>Отчеты</Text>
      		</View>
			</View>
		);
	}
}

const styles = {
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
}
