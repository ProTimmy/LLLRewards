import React from 'react'
import {
  Alert,
  Clipboard,
  StyleSheet,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  View,
  Linking
} from 'react-native'
import { MapView } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import Swiper from 'react-native-swiper'

import Colors from '../constants/Colors'

let iconName = Platform.OS === 'ios' ? `ios-arrow-back` : 'md-arrow-back'

let tiles = {
  about: 0,
  map: 1,
  code: 2
}

const position = [51.505, -0.09]
export default class Info extends React.Component {
  constructor (props) {
    super(props)

    const { navigation } = this.props
    this.state = {
      title: navigation.getParam('title', 'Error'),
      category: navigation.getParam('category', 'Error'),
      currentTile: tiles.about
    }

    this._changeTile = this._changeTile.bind(this)
  }

  _back = () => {
    const { navigate } = this.props.navigation
    navigate('Home')
  }

  _changeTile = (currentTile) => {
    let scroll = currentTile - this.state.currentTile
    this.swiper.scrollBy(scroll, true)

    this.setState({
      currentTile: currentTile
    })
  }

  _updateTile = (currentTile) => {
    this.setState({
      currentTile: currentTile
    })
  }

  render () {
    return (
      <View style={styles.container} >
        <TouchableOpacity
          style={styles.iconStyle}
          onPress={this._back}
        >
          <Ionicons
            name={iconName}
            style={{color: 'white'}}
            size={25}
          />
        </TouchableOpacity>
        <View style={styles.navbar}>
          <View style={styles.logo}>
            <Image
              source={require('../assets/llanada.png')}
              style={{
                width: 64,
                height: 64
              }}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{this.state.title}</Text>
            <Text style={styles.subinfo}>{this.state.category}</Text>
            <Text style={styles.subinfo}>Location: 144 Sample Rd, Weston, FL</Text>
            <Text style={styles.dealinfo}>Deal: Sample deal, 50% off</Text>
          </View>
          <View style={styles.optionsBar}>
            <TouchableOpacity onPress={() => this._changeTile(tiles.about)}>
              <Text style={styles.optionsText}>ABOUT</Text>
              { this.state.currentTile === tiles.about &&
                <View style={styles.underlineBar}></View>
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._changeTile(tiles.map)}>
              <Text style={styles.optionsText}>MAP</Text>
              { this.state.currentTile === tiles.map &&
                <View style={styles.underlineBar}></View>
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._changeTile(tiles.code)}>
              <Text style={styles.optionsText}>CODE</Text>
              { this.state.currentTile === tiles.code &&
                <View style={styles.underlineBar}></View>
              }
            </TouchableOpacity>
          </View>
        </View>
        <Swiper
          horizontal
          loop={false}
          style={styles.tilesContainer}
          ref={(swiper) => {this.swiper = swiper}}
          onIndexChanged={(index) => this._updateTile(index)}
        >
          <View style={styles.tiles}>
            <Text>Something</Text>
          </View>
          <MapView
            style={styles.tiles}
            initialRegion={{
              latitude: 35.9052477,
              longitude: -79.0646833,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            onPress={() => {
              const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
              const latLng = `35.9052477, -79.0646833`
              const label = 'Foo Place'

              Linking.openURL(
                Platform.select({
                  ios: `${scheme}${label}@${latLng}`,
                  android: `${scheme}${latLng}(${label})`
                })
              )
            }}
            onLongPress={() => {
              Clipboard.setString('something')
              Alert.alert('Address copied to clipboard.','',
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                {cancelable: false}
              )
            }}
            scrollEnabled={false}
          >
            <MapView.Marker
              coordinate={{
                latitude: 35.9052477,
                longitude: -79.0646833,
                title: 'Foo Place',
                description: 'Something'
              }}
            />
          </MapView>
          <View style={styles.tiles}>
            <Text>Something even else</Text>
          </View>
        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  navbar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: Colors.infoNav,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    elevation: 3,

    paddingLeft: 30,
    paddingRight: 30
  },
  logo: {
    paddingTop: 30
    // paddingTop: 50
  },
  infoContainer: {
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: Colors.infoText
  },
  subinfo: {
    color: Colors.infoText,
    fontWeight: 'bold',
    fontSize: 16,
  },
  dealinfo: {
    color: Colors.infoText,
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 30,
  },
  iconStyle: {
    position: 'absolute',
    zIndex: 2,
    top: 50,
    left: 10,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionsBar: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  optionsText: {
    color: Colors.infoText,
    fontFamily: 'Ubuntu-Bold',
    fontSize: 18,
    letterSpacing: 3,
    paddingBottom: 5,
    textAlign: 'center'
  },
  underlineBar: {
    backgroundColor: 'white',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    height: 5
  },
  tilesContainer: {
  },
  tiles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 20,
    backgroundColor: 'white'
  }
})
