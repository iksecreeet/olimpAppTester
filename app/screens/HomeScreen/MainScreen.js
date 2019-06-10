import React from 'react';
import { 
  View, 
  Text, 
  ScrollView,
  SafeAreaView, 
  TouchableOpacity,
  FlatList,
  StatusBar, 
  ImageBackground,
} from 'react-native';

import firebase from 'react-native-firebase';
import NavigationService from '../../actions/NavigationService';
import styles from '../../styles/MainScreenStyles';
import ListItem from '../../components/ListItem';
import { Container, Loader } from '../../components/common';
import NextSeason from '../../components/NextSeason';
import LastSeasonCourse from '../../components/LastSeasonCourse';

export default class MainScreen extends React.Component {
    constructor() {
      super();
      this.ref = firebase.firestore().collection('courses').orderBy('id', 'asc');
      this.unsubscribe = null;
      this.state = {
        courses: [],
        loading: true,
      };
    }

    componentWillMount() {
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }
    componentWillUnmount() {
      this.unsubscribe();
    }

  onCollectionUpdate = (querySnapshot) => {
    const courses = [];
    querySnapshot.forEach((doc) => {
      const { image, name, purchased, thumb, price } = doc.data();
      courses.push({
        key: doc.id, // Document ID
        doc, // DocumentSnapshot
        name,
        thumb,
        price,
        image,
        purchased
      });
    });
    this.setState({
      courses,
      loading: false,
   });
  }
  renderCourses() {
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <View>
        <FlatList
          data={this.state.courses}
          renderItem={({ item }) => <ListItem item={item} onPress={() => NavigationService.navigate('Course', { titleName: item.name, purchased: item.purchased })} /> }
          horizontal={false}
          numColumns={2}
        />
      </View>
    );
  }
  render() {
    const { scroll, headline, headlineWrap, seasonText } = styles;
    return (
      <View style={{ flex:1 }}>
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
                  marginTop: 5
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
                  source={require('../../../assets/images/lego.png')}
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
                  source={require('../../../assets/images/hidden.png')}
                >
                  <Text style={[styles.text, styles.textBlockParam]}>
                    {'Квест 2'.toUpperCase()}
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
