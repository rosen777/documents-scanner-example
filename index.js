/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
//
// AppRegistry.registerComponent(appName, () => App);

import {Navigation} from 'react-native-navigation'

import Welcome from './screens/Welcome'
import SignIn from './screens/SignIn'
import ReceiptScanner from './screens/ReceiptScanner'

Navigation.registerComponent('Welcome', () => Welcome)
Navigation.registerComponent('SignIn', () => SignIn)
Navigation.registerComponent('ReceiptScanner', () => ReceiptScanner)

Navigation.events().registerAppLaunchedListener(() => {
  // Sets the root of the application
  Navigation.setRoot({
    root: {
  // Sets the root to a component and the name of the component is welcome
      stack: {
        id:'AppStack',
        children: [
          {
            component: {
              name: 'Welcome',
              options: {
                topBar: {
                  title:
                    {
                      text: 'Welcome'
                    }
                }
              }
            },
          },
        ]
      }
    }
  })
});
