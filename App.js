import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { MenuProvider } from "react-native-popup-menu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RootNavigator from "@navigators/RootNavigator";
import AccountNavigator from "./src/navigators/AccountNavigator";
import * as Font from 'expo-font';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      fontsLoaded: false,
    };
  }

  async componentDidMount() {
    var access_token = await AsyncStorage.getItem("access_token");
    this.setState({
      access_token: access_token,
    });
    try {
      let primaryFont = require("@fonts/myanmar-sagar.ttf");
      let primaryFontBold = require("@fonts/myanmar-sagar.ttf");

      await Font.loadAsync({
        "Primary-Font": primaryFont,
        "Primary-Font-Bold": primaryFontBold,
        "Eng-Font": require("@fonts/Roboto-Regular.ttf"),
        "Eng-Font-Bold": require("@fonts/Roboto-Bold.ttf")
      });
      this.setState({ fontsLoaded: true });
    } catch (err) { }
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <SafeAreaProvider>
          <StatusBar style='light' backgroundColor='#1A1F2B' />
          <MenuProvider>
            <NavigationContainer>

              {
                this.state.access_token != null ?
                  <RootNavigator /> : <AccountNavigator />
              }

            </NavigationContainer>
          </MenuProvider>
        </SafeAreaProvider>
      )
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
