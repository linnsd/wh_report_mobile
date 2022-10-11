import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Fonts from "@styles/Fonts";
import { t, getLang } from "@services/Localization";
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      licence_no: "",
      lic_exp_date: "",
      count: "",
      locale: "",
      change_color: null,
    };
  }

  async componentDidMount() {
    // alert(this.props.exp_text)
    var licence_no = await AsyncStorage.getItem("loginId");
    var exp_date = await AsyncStorage.getItem("lic_expire_date");
    // console.log(exp_date);
    const res = await getLang();

    var msDiff = new Date(exp_date).getTime() - new Date().getTime(); //Future date - current date
    var day_diff = Math.floor(msDiff / (1000 * 60 * 60 * 24));
    // console.log(day_diff);
    if (day_diff < 0) {
      this.setState({ change_color: "#AC2727" });
    } else if (day_diff < 3 || day_diff == 0) {
      this.setState({ change_color: "#D69A29" });
    } else {
      this.setState({ change_color: "white" });
    }

    this.setState({
      licence_no: licence_no,
      lic_exp_date:exp_date ?  moment(exp_date).format("DD-MM-YYYY") : null,
      locale: res,
    });
  }

  _OnPress() {
    if (this.props.Onpress) {
      this.props.Onpress();
    }
  }

  handleNoti() {
    if (this.props.handleNoti) {
      this.props.handleNoti();
    }
  }

  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "#3D266A",
          paddingTop: Platform.OS === "android" ? 25 : 0,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
        forceInset={{ top: 0, horizontal: "never", bottom: "never" }}
      >
        <StatusBar hidden={false} />
        <View style={styles.container}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this._OnPress()}
              style={{
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Image
                source={require("@images/menu_header.png")}
                style={{ width: 25, height: 23 }}
              />
            </TouchableOpacity>

            <Image
              source={require("@images/logo.png")}
              style={{ width: 55, height: 55, marginTop: 10 }}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.handleNoti()}
              style={{
                height: 50,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Image
                source={require("@images/whitebell.png")}
                style={{ width: 20, height: 25 }}
              />
              {this.state.count == 0 ? null : (
                <View style={{ position: "absolute", top: 0, marginTop: 5 }}>
                  <View
                    style={{
                      backgroundColor: "red",
                      width: 18,
                      height: 18,
                      borderRadius: 9,
                      justifyContent: "center",
                      position: "absolute",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 10 }}>
                      {this.state.count}
                    </Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              // alignItems: "center",
              justifyContent: "space-between",
              marginTop: 5,
              marginLeft: 15,
            }}
          >
            <View>
              <Text style={[styles.textHeader, { color: "white" }]}>
                {t("licence_no", this.state.locale)} : {this.state.licence_no}
              </Text>
              <Text
                style={[styles.textHeader, { color: this.state.change_color }]}
              >
                {t("expire_date", this.state.locale)} :{" "}
                {this.state.lic_exp_date}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.textHeader,
                  { textAlign: "right", color: "white" },
                ]}
              >
                {this.props.text}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3D266A",
    height: 125,

    paddingHorizontal: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  text: {
    textAlign: "center",
    flex: 1,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 30,
  },
  img: {
    width: 25,
    height: 25,
  },
  textHeader: {
    paddingLeft: 5,
    paddingTop: 7,
    fontWeight: "bold",
    fontFamily: Fonts.primary,
  },
});
