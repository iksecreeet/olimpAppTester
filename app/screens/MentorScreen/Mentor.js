// Mentor screen

import React, { Component } from 'react';

import { View, Text, AsyncStorage, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import ChatBot from 'react-native-chatbot';

import MentorTask from '../../components/MentorTask';
import TextTask from '../../components/MentorTasks/TextTask';
import Questions from '../../components/MentorTasks/Questions';
import styles from '../../styles/MainScreenStyles';
const steps = [
    {
      id: '0',
      component: <MentorTask botText='Ты прослушал задание?' />,
    },
    /*{
      id: 'task',
      component: 
      <TextTask botText='Ты прослушал задание?' />,
      trigger: 'name',
    },
    {
      id: 'name',
      component: 
      <Questions />,
      trigger: 'task2',
      waitAction: true
    },
    {
      id: 'task2',
      component: <TextTask botText='Ты знаешь как тебе развиваться?' />,
      trigger: 'name2',
      delay: 5000
    },
      {
      id: 'name2',
      options: [
        { value: 'yes', label: 'Да', trigger: '3' },
        { value: 'no', label: 'Нет', trigger: '3' },
      ],
    },
    {
      id: '3',
      component: 
      <TextTask botText='Сейчас время когда знания открыты почти каждому,вы создали интернет, но почему снова остаются вопросы?  '/>,
      trigger: '4',
    },
    {
      id: '4',
      component: 
      <TextTask botText='Ты готов подождать?' />,
      trigger: 'gender',
    },
    {
      id: 'gender',
      options: [
        { value: 'Готов подождать', label: 'Да', trigger: '5' },
        { value: 'Пофиг', label: 'Нет', trigger: '5' },
      ],
      //user: true,
    },
    {
      id: '5',
      component: <TextTask botText='На сегодня все. Пока' />,
      end: true
    }*/
];

export default class MentorScreen extends Component {
    constructor() {
    super();
    this.state = {
        textInput: '',
        loading: true,
        todos: [],
    };
  }
  componentDidMount() {
    this.handleEnd = this.handleEnd.bind(this);
  }

  handleEnd({ steps, values, renderedSteps }) {
    console.log(steps);
    console.log(values);
    console.log(renderedSteps);
    //alert(`Chat handleEnd callback! Number: ${values[0]}`);
  }
	render() {
      return (
        <View style={{ backgroundColor: '#17478d', flex: 1 }}>
        <View style={styles.daysSliderWrapper}>
          <View style={styles.activeDayBtn}>
             <Text style={styles.activeDay}>1 ДЕНЬ</Text>
          </View>
        </View>
        <ChatBot
            hideUserAvatar={true}
            hideBotAvatar={true}
            steps={steps}
            handleEnd={this.handleEnd}
            userFontColor={'#FFF'}
            userBubbleColor={'#FFF'}
            botBubbleColor={'#FFF'}
            botFontColor={'#203348'}
            customLoadingColor={'#FFF'}
            placeholder={'Сообщение...'}
            bubbleStyle={{ backgroundColor: '#3dae58' }}
        />
        </View>
    );
    }
}

/*
          <View style={styles.inactiveDayBtn}>
             <Text style={styles.inactiveDay}>2</Text>
          </View>
          <View style={styles.inactiveDayBtn}>
             <Text style={styles.inactiveDay}>3</Text>
          </View>
          <View style={styles.inactiveDayBtn}>
             <Text style={styles.inactiveDay}>4</Text>
          </View>
*/