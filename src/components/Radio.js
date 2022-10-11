import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Fonts from "@styles/Fonts";
export default class Radio extends React.Component {

  setToggle() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setToggle()}
        >
          <View style={styles.radioContainer}>
            <View style={styles.largeCirle}>
              {this.props.active ? (
                <View style={styles.activeCirle} />
              ) : null}
            </View>
            <Text style={styles.label}>
              {this.props.label ? this.props.label : null}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    marginRight: 20
  },
  largeCirle: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor:"#3D266A",
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center"
  },
  activeCirle: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: "#3D266A",
  },
  label: {
    marginLeft:5,
    color: "black",
    fontSize:16,
    fontFamily:Fonts.primary
  }
});
