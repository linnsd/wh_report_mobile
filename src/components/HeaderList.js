import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";
import Fonts from "@styles/Fonts";
export default class HeaderList extends React.Component {
  constructor(props) {
    super(props);
  }
  _OnPress() {
    if (this.props.Onpress) {
      this.props.Onpress();
    }
  }

  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "#3D266A",
          paddingTop: Platform.OS === "android" ? 25 : 0,
        }}
        forceInset={{ top: 0, horizontal: "never", bottom: "never" }}
      >
        <StatusBar hidden={false} />
        <View
          style={[
            styles.container,
            {
              backgroundColor: "#3D266A",
            },
          ]}
        >
          {
            this.props.is_show != false ?<TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this._OnPress()}
            style={{
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              alignItems: "flex-start",
              marginLeft: 5,
            }}
          >
            <Image
              source={
                this.props.img ? this.props.img : require("@images/back.png")
              }
              style={{
                width: this.props.widthheader ? this.props.widthheader : 22,
                height: this.props.heightheader ? this.props.heightheader : 22,
                marginLeft: 10,
                resizeMode: "contain",

                // marginLeft: 10,
              }}
            />
          </TouchableOpacity> :null
          }
          
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.text}>{this.props.name}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FE7F0A",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 10,
  },
  text: {
    // textAlign: "center",
    // flex: 1,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily:Fonts.primary
  },
  img: {
    width: 25,
    height: 25,
  },
});
