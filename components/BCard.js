import React from 'react'
import {
  Image,
  Text,
  StyleSheet,
  View,
  Platform,
  TouchableOpacity
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../constants/Colors'

let iconName = Platform.OS === 'ios' ? `ios-arrow-forward` : 'md-arrow-forward'

export default class BCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: 'Something',
      category: 'Business',
      deal: 'Up to 50% off select items'
    }
  }

  _onPress = () => {
    const { navigate } = this.props.navigation
    navigate('Info', {
      title: this.state.title,
      category: this.state.category
    })
  }

  render () {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={this._onPress}
      >
        <View style={styles.container}>
          <Image
            source={require('../assets/llanada.png')}
            style={styles.cardLogo}
          />
          <View style={styles.cardInfo}>
            <Text
              style={styles.title}
              adjustsFontSizeToFit={true}
            >{this.state.title}</Text>
            <Text style={styles.category}>{this.state.category}</Text>
            {/* 25 char limit */}
            <Text style={styles.deal}>{this.state.deal}</Text>
          </View>
          <Ionicons
            name={iconName}
            style={styles.icon}
            size={18}
          />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,

    width: 330,
    minHeight: 140,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,

    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,

    flexDirection: 'row',
    alignItems: 'center'
  },

  cardLogo: {
    height: 64,
    width: 64,
    margin: 20
  },

  cardInfo: {
    flexDirection: 'column',
    width: 190
  },

  title: {
    fontWeight: 'bold',
    fontSize: 26,
    paddingTop: 20
  },

  category: {
    paddingBottom: 20
  },

  deal: {
    fontWeight: 'bold',
    fontSize: 17,
    paddingBottom: 20
  },

  icon: {
    position: 'absolute',
    right: 0,
    paddingRight: 20
  }
})
