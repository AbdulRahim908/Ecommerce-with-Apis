import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNavigator from './pages/navigations'
import { Provider } from 'react-redux'
import {mystore} from './redux/store'
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/integration/react'
let persistor=persistStore(mystore)
const App = () => {
  return (
    <Provider store={mystore}>
      <PersistGate persistor={persistor}>
    <AppNavigator/>
    </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})