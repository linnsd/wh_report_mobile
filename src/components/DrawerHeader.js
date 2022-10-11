import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Fonts from "@styles/Fonts";
export default class DrawerHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shop_name: null,
    };
  }
  async componentDidMount() {
    var shop_name = await AsyncStorage.getItem("shop_name");
    this.setState({
      shop_name: shop_name,
    });
  }
  _handleOnPress(){
    if (this.props.OnPress) {
        this.props.OnPress();
    }
  }
  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "#3D266A",
          paddingTop: Platform.OS === "android" ? 25 : 0,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}
        forceInset={{ top: 0, horizontal: "never", bottom: "never" }}
      >
        <StatusBar hidden={false} />
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.container}
            onPress={() => this._handleOnPress()}
          >
            <View style={styles.imgContainer}>
              <View>
                <Image
                  source={require("@images/logo.png")}
                  style={{ width: 100, height: 100 }}
                />
                <Text
                  style={{
                    color: "white",
                    paddingTop: 10,
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 15,
                    fontFamily:Fonts.primary
                  }}
                >
                  {this.state.shop_name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3D266A",
    height: 150,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  secondContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  imgContainer: {
    alignItems: "center",
  },
});
