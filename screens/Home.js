import React from 'react'
import {
  Platform,
  StatusBar,
  StyleSheet,
  Image,
  ScrollView,
  View,
  Text
} from 'react-native'
import { AppLoading, Asset, Font } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import { SearchBar } from 'react-native-elements'

// Constants
import Colors from '../constants/Colors'

// Components
import BCard from '../components/BCard'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoadingComplete: false,
      events: []
    }
  }

  componentWillMount () {
    let events = []
    for (var i = 0; i < 40; i++) {
      let event = i
      events = [event].concat(events)
    }

    this.setState({
      events: events
    })
  }

  render () {
    const { navigate } = this.props.navigation

    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar translucent barStyle='light-content' />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}

          <View style={styles.navbar}>
            <Image
              source={require('../assets/llanada.png')}
              style={{height: 96, width: 103}}
            />
          </View>

          <View style={styles.searchContainer}>
            <SearchBar
              noIcon={true}
              containerStyle={styles.searchBar}
              inputContainerStyle={{
                height: 45,
                backgroundColor: Colors.searchBar
              }}
              inputStyle={{
                color: 'white'
              }}
              placeholder='Search'
            />
          </View>

          <ScrollView contentContainerStyle={styles.cardView}>
            {/* {this.state.events.map(event => <Text key={event}>{event}</Text>)} */}
            {this.state.events.map(event => <BCard key={event} navigation={this.props.navigation}/>)}
          </ScrollView>
        </View>
      )
    }
  }

  // Load all assets here
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('../assets/llanada.png')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        'Ubuntu': require('../assets/fonts/Ubuntu-Regular.ttf'),
        'Ubuntu-Bold': require('../assets/fonts/Ubuntu-Bold.ttf'),
        ...Ionicons.font
      })
    ])
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  navbar: {
    // Top padding is height of status bar
    paddingTop: 18,
    backgroundColor: Colors.statusBar,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    elevation: 3
  },
  searchBar: {
    backgroundColor: Colors.searchBar,
    height: 60,
    borderWidth: 0,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center'
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: Colors.statusBar
  },
  cardView: {
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 20
  }
})
