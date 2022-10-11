import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Fonts from "@styles/Fonts";
export default class CustomDropdown extends React.Component {
  handleOnSelect(value, label,fuel_data) {
    // console.log(fuel_data);
    if (this.props.onSelect) {
      this.props.onSelect(value, label,fuel_data);
    }
  }

  _renderMenuOptions() {
    // console.log("Options",this.props.options);
    let optionsArray = [];
    if (this.props.options) {
      if (this.props.options.length > 0) {
        this.props.options.forEach((data, index,fuel_data) => {
          optionsArray.push(
            <MenuOption
              disabled={this.props.value.value == data.value ? true : false}
              key={index}
              value={data}
              text={data.label}
              fuel_data={fuel_data}
              customStyles={{ backgroundColor: "red" }}
            />
          );
        });
      }
    }
    return optionsArray;
  }

  _renderMenuTrigger() {
    const placeholder = this.props.placeholder
      ? this.props.placeholder
      : "Select";
    return (
      <MenuTrigger customStyles={triggerStyles}>
        <Text style={[styles.triggerText]}>
          {this.props.value.label ? this.props.value.label : placeholder}
        </Text>
        <View style={styles.downArrowIconWrapper}>
          <Image
            style={styles.downArrow}
            source={require("@images/down-arrow.png")}
          />
        </View>
      </MenuTrigger>
    );
  }

  render() {
    return (
      <View style={this.props.style}>
        <Menu
          onSelect={({ value, label,fuel_data }) => this.handleOnSelect(value, label,fuel_data)}
        >
          {this._renderMenuTrigger()}
          <MenuOptions
            customStyles={menuOptionsStyles}
            optionsContainerStyle={{
              maxHeight: Dimensions.get("window").height,
              width: this.props.optionsContainerWidth
                ? this.props.optionsContainerWidth
                : "96%",
              marginTop: this.props.marginTop ? this.props.marginTop : 0,
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>{this._renderMenuOptions()}</ScrollView>
          </MenuOptions>
        </Menu>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  downArrowIconWrapper: {
    // justifyContent: "center",
    // alignItems: "center",
    padding: 5,
    // borderLeftWidth: 1,
    width: 30,
    // backgroundColor:"green"
  },
  triggerText: {
    flex: 1,
    fontSize: 14,
    // margin: 10,
    // alignItems:"center",
    // justifyContent:"center",
    marginLeft: 10,
    // marginTop: 20,
    // backgroundColor:"red"
    fontFamily:Fonts.primary
  },
  activeText: {
    color: "black",
  },
  inactiveText: {
    color: "gray",
  },
  downArrow: {
    width: 21,
    height: 12,
  },
});

const triggerStyles = {
  triggerWrapper: {
    borderRadius: 5,
    flexDirection: "row",
    borderWidth: 1,
    // backgroundColor: "white",
    height: 40,
    // height:props => props.triggerHeight ? props.triggerHeight : 37,
    // height:this.props.trigerHeight ? this.props.trigerHeight : 37,
    // width: 200,
    // marginTop: 10,
    borderColor: "#707070",
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "red",
    // width: 234,
  },
};

const menuOptionsStyles = {
  optionsWrapper: {},
  optionWrapper: {
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgray",
    borderStyle: "solid",
  },
  OptionTouchableComponent: TouchableOpacity,
  optionTouchable: {
    activeOpacity: 0.3,
  },
  optionText: {
    margin: 5,
    // fontFamily: Fonts.primary,
    fontSize: 14,
  },
};
