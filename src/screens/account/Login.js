import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Fonts from "@styles/Fonts";
import { t, getLang } from "@services/Localization";
//const url
import { loginApi } from "@apis/Url";

const axios = require("axios");

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginId: null,
      password: null,
      isOnline: false,
      editable: true,
      locale: null,
    };
  }

  componentDidMount = async () => {
    const res = await getLang();
    this.setState({ locale: res });
    NetInfo.addEventListener((state) => {
      this.setState({ isOnline: state.isConnected });
    });
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this.setState({ editable: true, loginId: null });
    });
  };

  _handle_login() {
    // console.log(loginApi);
    var self = this;
    self.setState({
      editable: false,
    });
    if (this.state.isOnline) {
      if (this.state.loginId == null) {
        alert("Login ID is required!");
        self.setState({ editable: true });
      } else if (this.state.password == null) {
        alert("Password is required!");
        self.setState({ editable: true });
      } else {
        let appuser = {
          login_id: this.state.loginId,
          password: this.state.password,
        };
        // console.log(loginApi);
        axios
          .post(loginApi, appuser, {
            headers: {
              Accept: "application/json",
            },
          })
          .then(function (response) {
            // console.log("Login", response.data.data);
            if (response.data.status == 1) {
              AsyncStorage.multiSet(
                [
                  ["access_token", response.data.access_token],
                  ["id", response.data.data.id.toString()],
                  ["shop_id", response.data.data.shop_id.toString()],
                  ["loginId", response.data.data.loginId],
                  ["owner", response.data.data.owner],
                  ["role_id", response.data.data.role_id.toString()],
                  ["lic_expire_date", response.data.data.lic_expire_date],
                  ["lic_issue_date", response.data.data.lic_issue_date],
                  ["shop_name", response.data.data.shop_name],
                  ["shop_status", response.data.data.shop_status.toString()],
                  ["shop_type", response.data.data.shop_type.toString()],
                  ["profile_path", response.data.data.profile_path != null ? response.data.data.profile_path : ""],
                  ["profile_name", response.data.data.profile_name != null ? response.data.data.profile_name : ""],
                  ["state_division", response.data.data.state_division != null ? response.data.data.state_division : ""],
                  ["tsh_name_en", response.data.data.tsh_name_en],
                  ["tsh_name_mm", response.data.data.tsh_name_mm],
                  ["u_by", response.data.data.u_by],
                  ["address", response.data.data.address],
                ],
                (err) => {
                  if (err) {
                    alert("Asynstorage Error");
                    self.setState({ editable: true });
                  } else {
                    self.props.navigation.navigate("RoutesApp");
                    self.setState({ editable: true });
                  }
                }
              );
            } else {
              alert(response.data.message);
              self.setState({ editable: true });
            }
          })
          .catch(function (error) {
            console.log("Error:", error);
            alert("Something went wrong!");
            self.setState({ editable: true });
          });
      }
    } else {
      alert("Please check your internet connection!");
      self.setState({ editable: true });
    }
  }
  render() {
    // alert(this.props.navigation.getParam("logout_route"))
    return (
      <View style={{ flex: 1, backgroundColor: "#3D266A" }}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            source={require("@images/logo.png")}
            style={{ width: 110, height: 110 }}
          />
        </View>
        <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              marginBottom: 5,
            }}
          >
            Welcome Back To PPRD
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            We miss you! Login to get Started
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: "100%",
            marginTop: 30,
            paddingHorizontal: 30,
          }}
        >
          <View style={{ marginTop: 30, marginBottom: 15 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {t("login", this.state.locale)}
            </Text>
          </View>
          <View style={[styles.input_container, { marginBottom: 10 }]}>
            <TextInput
              style={styles.input_style}
              value={this.state.loginId}
              onChangeText={(value) => this.setState({ loginId: value })}
              placeholder={t("loginId", this.state.locale)}
             
            ></TextInput>
            <Image
              source={require("@images/login_user.png")}
              style={{ marginRight: 10 }}
            ></Image>
          </View>
          <View style={styles.input_container}>
            <TextInput
              style={styles.input_style}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={(value) => this.setState({ password: value })}
              placeholder={t("password", this.state.locale)}
            ></TextInput>
            <Image
              source={require("@images/login_password.png")}
              style={{ marginRight: 10 }}
            ></Image>
          </View>
          <View style={styles.btn_container}>
            <TouchableOpacity
              style={styles.login_btn}
              onPress={() => this._handle_login()}
            >
              <Text style={styles.btn_text}>
                {t("btn_login", this.state.locale)}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: "center",
              flex: 1,
              justifyContent: "flex-end",
              marginBottom: 250,
            }}
          >
            <Text style={{ textDecorationLine: "underline", color: "#3D266A" }}>
              Privacy Policy
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input_container: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
  },
  input_style: {
    borderColor: "#707070",
    paddingHorizontal: 10,
    fontSize: 15,
    width: "90%",
    height: 40,
    fontFamily: Fonts.primary,
    // backgroundColor:"red"
  },
  btn_container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    //   marginBottom:80
  },
  login_btn: {
    backgroundColor: "#3D266A",
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btn_text: { color: "white", fontSize: 16, fontFamily: Fonts.primary },
});
