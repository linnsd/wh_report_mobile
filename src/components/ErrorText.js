import React from "react";
import { Text, StyleSheet } from "react-native";

export default class ErrorText extends React.Component {
  render() {
    return  (
      <Text style={styles.errText}>{ this.props.isShow ?this.props.errMessage:''}</Text>
    ) ;
  }
}

const styles = StyleSheet.create({
  errText: {
    color: "red",
    fontSize: 14,
    // marginLeft:5
  }
});
