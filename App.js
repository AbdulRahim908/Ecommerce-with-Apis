import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNavigator from './pages/navigations'
import { Provider } from 'react-redux'
import store from './redux/store'
const App = () => {
  return (
    <Provider store={store}>
    <AppNavigator/>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})