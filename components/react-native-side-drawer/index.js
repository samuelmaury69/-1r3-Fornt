import React from "react"
import { Animated, Dimensions, StyleSheet, View, SafeAreaView, Platform, TouchableOpacity} from "react-native"
import {connect} from 'react-redux';
import {Show_menu} from '../../Config/Dispatch'
import PropTypes from "prop-types"

const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height
const isIOS = Platform.OS === "ios"
const VERSION = parseInt(Platform.Version, 10)

class MenuDrawer extends React.Component {
  constructor(props) {
    super(props)
    this.leftOffset = new Animated.Value(0)
    this.state = {
      expanded: false,
      fadeAnim: new Animated.Value(1)
    }
  }
  openDrawer = () => {
    this.props.Show_menu(true)
    const { drawerPercentage, animationTime, opacity } = this.props
    const DRAWER_WIDTH = SCREEN_WIDTH * (drawerPercentage / 100)

    Animated.parallel([
      Animated.timing(this.leftOffset, {
        toValue: DRAWER_WIDTH,
        duration: animationTime,
        useNativeDriver: true
      }),
      Animated.timing(this.state.fadeAnim, {
        toValue: opacity,
        duration: animationTime,
        useNativeDriver: true
      })
    ]).start()
  }

  closeDrawer = () => {
    this.props.Show_menu(false)
    const { animationTime } = this.props

    Animated.parallel([
      Animated.timing(this.leftOffset, {
        toValue: 0,
        duration: animationTime,
        useNativeDriver: true
      }),
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: animationTime,
        useNativeDriver: true
      })
    ]).start()
  }

  drawerFallback = () => {
    return (
      <TouchableOpacity onPress={this.closeDrawer}>
        <Text>Close</Text>
      </TouchableOpacity>
    )
  }

  componentDidUpdate() {
    const { open } = this.props

    open ? this.openDrawer() : this.closeDrawer()
  }

  renderPush = () => {
    const { children, drawerContent, drawerPercentage } = this.props
    const { fadeAnim } = this.state
    const animated = { transform: [{ translateX: this.leftOffset }] }
    const DRAWER_WIDTH = SCREEN_WIDTH * (drawerPercentage / 100)

    if (isIOS && VERSION >= 11) {
      return (
        <Animated.View style={[animated, styles.main,{width: SCREEN_WIDTH + DRAWER_WIDTH,}] }>
          <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View
              style={[
                styles.drawer,
                {
                  width: DRAWER_WIDTH,
                  left: -DRAWER_WIDTH
                },
              ]}
            >
              {drawerContent ? drawerContent : this.drawerFallback()}
            </View>
            <Animated.View
              style={[
                styles.container,
                {
                  opacity: fadeAnim
                }
              ]}
            >
              {children}
            </Animated.View>
          </SafeAreaView>
        </Animated.View>
      )
    }

    return (
      <Animated.View style={[animated, styles.main,{width: SCREEN_WIDTH + DRAWER_WIDTH,}]}>
        <View
          style={[
            styles.drawer,
            {
              width: DRAWER_WIDTH,
              left: -DRAWER_WIDTH
            },
          ]}
        >
          {drawerContent ? drawerContent : this.drawerFallback()}
        </View>
        <Animated.View
          style={[
            styles.container,
            {
              opacity: fadeAnim
            }
          ]}
        >
          {children}
        </Animated.View>
      </Animated.View>
    )
  }

  renderOverlay = () => {
    const { children, drawerContent, drawerPercentage } = this.props
    const { fadeAnim } = this.state
    const animated = { transform: [{ translateX: this.leftOffset }] }
    const DRAWER_WIDTH = SCREEN_WIDTH * (drawerPercentage / 100)
if(this.props.open){

    if (isIOS && VERSION >= 11) {
      return (
        <SafeAreaView style={[styles.main,{width: SCREEN_WIDTH + DRAWER_WIDTH,}]}>
          <Animated.View
            style={[animated, styles.drawer,{ width: DRAWER_WIDTH, left: -DRAWER_WIDTH }]}
          >
            {drawerContent ?<TouchableOpacity style={{flex:1}} onPress={()=>{this.closeDrawer()}}>{drawerContent}</TouchableOpacity> : this.drawerFallback()}
          </Animated.View>
          <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            {children}
          </Animated.View>
        </SafeAreaView>
      )
    }

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Animated.View
          style={[
            animated,
            styles.drawer,
            {
              width: DRAWER_WIDTH,
              left: -DRAWER_WIDTH
            }
          ]}
        >
          {drawerContent ?<TouchableOpacity style={{flex:1}} onPress={()=>{this.closeDrawer()}}>{drawerContent}</TouchableOpacity> : this.drawerFallback()}
        </Animated.View>
        <Animated.View
          style={[
            styles.container,
            {
              opacity: fadeAnim
            }
          ]}
        >
          {children}
        </Animated.View>
      </View>)
}return children
    
  }

  render() {
    const { overlay } = this.props

    return overlay ? this.renderOverlay() : this.renderPush()
  }
}

MenuDrawer.defaultProps = {
  open: false,
  drawerPercentage: 45,
  animationTime: 200,
  overlay: true,
  opacity: 0.4
}

MenuDrawer.propTypes = {
  open: PropTypes.bool,
  drawerPercentage: PropTypes.number,
  animationTime: PropTypes.number,
  overlay: PropTypes.bool,
  opacity: PropTypes.number
}

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    left: 0,
    zIndex: 0
  },
  container: {
    position: "absolute",
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    zIndex: 0
  },
  drawer: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    zIndex: 1
  }
})
const mapStateProps = (state) =>({
  Menu:state.ReducerMenu
})
const mapDispatchProps = (dispatch) => {
  return {
     Show_menu: (data) => {
      dispatch(Show_menu(data))
    },
  }
}

export default connect(mapStateProps, mapDispatchProps)(MenuDrawer);
