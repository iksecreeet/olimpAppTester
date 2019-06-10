import React from 'react';
import { 
  FlatList, 
  StyleSheet, 
  Platform, 
  Image, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  Button 
} from 'react-native';
import firebase from 'react-native-firebase';
import AddNote from './AddNote'; // we'll create this next
import OlimpIcon from '../../styles/Icons';
import { 
  Left, 
  Right, 
  HeaderBackground, 
  NavButton4, 
  Header, 
  Title, 
  ActionTopButton
  } from '../../components/common';
  
export default class NotesScreen extends React.Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('chatbot');
    this.unsubscribe = null;  
    this.state = {
        textInput: '',
        loading: true,
        todos: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
      this.unsubscribe();
  }
  onCollectionUpdate = (querySnapshot) => {
    const todos = [];
    querySnapshot.forEach((doc) => {
      const { text, complete } = doc.data();
      todos.push({
        key: doc.id,
        doc, // DocumentSnapshot
        text,
        complete,
      });
    });
    this.setState({ 
      todos,
      loading: false,
   });
  }
  AddAnswer() {
    this.ref.add({
      text: this.state.textInput,
      complete: false,
    });
    this.setState({
      textInput: '',
    });
  }
  updateTextInput(value) {
    this.setState({ textInput: value });
  }
  render() {
    if (this.state.loading) {
      return null; // or render a loading icon
    }
    return (
     <View style={{ backgroundColor: '#17478d', flex: 1 }}>
     <HeaderBackground>
      <Header>
        <Left>
        <ActionTopButton 
          onPress={() => this.props.navigation.openDrawer()}
          pressIcon='o-menu'
        />
        </Left>
        <Title text='Наставник' />
        <Right>   
        <View style={styles.rows}>
            <Text style={styles.topIconText}>5000</Text>
             <OlimpIcon name='o-diamond' style={styles.topIcon} />
          </View>
        </Right>
      </Header>
      <NavButton4
        buttonText1='ЗЕВС'
        buttonText2='ОТЧЕТЫ'
        onPress1={() => this.props.navigation.navigate('Mentor')}
        onPress2={() => this.props.navigation.navigate('Notes')}
      />
      </HeaderBackground>
        <FlatList
          data={this.state.todos}
          renderItem={({ item }) => <AddNote {...item} />}
        />
      <TextInput
          style={{borderWidth: 1, borderColor: '#ccc' }}
          placeholder={'Поделиться как сделал задание'}
          value={this.state.textInput}
          onChangeText={(text) => this.updateTextInput(text)}
      />
   
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 80,
    marginBottom: 16,
    marginTop: 32,
    width: 80,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
