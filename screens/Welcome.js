import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native'
import {Navigation} from 'react-native-navigation'

class WelcomeScreen extends Component {

  goToScreen = (screenName) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName
      }
    })
  }
  render() {
    return(
      <View style={styles.container}>
        <Button title='Sign In' onPress={() => this.goToScreen('SignIn')} />
        <Button title='Sign Up' onPress={() => this.goToScreen('SignUp')} />
      </View>
    )
  }
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
