import { createStackNavigator } from 'react-navigation'
import Home from './screens/Home'
import Info from './screens/Info'

const App = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    Info: {
      screen: Info,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen'
  }
)

export default App
