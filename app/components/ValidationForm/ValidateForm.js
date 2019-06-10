import React, { Component } from 'react';

import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity } from 'react-native';

// Validate.js validates your values as an object
import validate from 'validate.js';

const constraints = {
  email: {
    presence: {
      message: "Cannot be blank."
    },
    email: {
      message: 'Please enter a valid email address'
    }
  },
  password: {
    presence: {
      message: "Cannot be blank."
    },
    length: {
      minimum: 5,
      message: 'Your password must be at least 5 characters'
    }
  }
}


const validator = (field, value) => {
  // Creates an object based on the field name and field value
  // e.g. let object = {email: 'email@example.com'}
  let object = {}
  object[field] = value

  let constraint = constraints[field]
  console.log(object, constraint)

  // Validate against the constraint and hold the error messages
  const result = validate(object, { [field]: constraint })
  console.log(object, constraint, result)

  // If there is an error message, return it!
  if (result) {
    // Return only the field error message if there are multiple
    return result[field][0]
  }

  return null
}


export default class Login extends Component {
  state = {
    email: '',
    emailError: null,
    password: '',
    passwordError: null,
  }
  logIn = () => {
    let { email, password } = this.state;
    console.log( email, password)

    let emailError = validator('email', email)
    let passwordError = validator('password', password)
    console.log( emailError, passwordError)
    this.setState({
      emailError: emailError,
      passwordError: passwordError,
    })
  }
  render() {

    const {emailError, passwordError } = this.state

    return (
        <View>

          <TextInput 
            onChangeText={(email) => this.setState({email})} 
            placeholder="Email Address" 
            keyboardType='email-address'
            autoCapitalize='none'
            />
          <Text> {emailError ? emailError : null }</Text>

          <TextInput 
            onChangeText={(password) => this.setState({password})} 
            placeholder="Password" 
            secureTextEntry={true}
            autoCapitalize='none'
            type="password" 
            />
          <Text> {passwordError ? passwordError : null }</Text>

        <TouchableOpacity onPress={this.logIn}>
          <Text>LOG IN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}