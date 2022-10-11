import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Fonts from "@styles/Fonts";
import HeaderList from "@components/HeaderList";
import { CommonActions } from "@react-navigation/native";
import ErrorText from "@components/ErrorText";
import { changePasswordApi } from "@apis/Url";
import AsyncStorage from "@react-native-async-storage/async-storage";
const axios = require("axios");
import { t, getLang } from "@services/Localization";

export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_password: null,
      new_password: null,
      confirm_password: null,
      auth_id: null,
      access_token: null,
      locale: "",

      ISCURRENTPASSWORD: false,
      ISNEWPASSWORD: false,
      ISCONFIRMPASSWORD: false,
    };
  }

  componentDidMount = async () => {
    var auth_id = await AsyncStorage.getItem("id");
    const res = await getLang();
    var access_token = await AsyncStorage.getItem("access_token");
    this.setState({ auth_id, access_token, locale: res });
  };

  redirect_login = async () => {
    const self = this;
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(asyncStorageKeys);

    self.props.navigation.dispatch(
      CommonActions.navigate({
        name: "Login",
      })
    );
  };

  change_password() {
    let isError = false;

    if (!this.state.current_password) {
      this.setState({ ISCURRENTPASSWORD: true });
      isError = true;
    }
    if (!this.state.new_password) {
      this.setState({ ISNEWPASSWORD: true });
      isError = true;
    }
    if (!this.state.confirm_password) {
      this.setState({ ISCONFIRMPASSWORD: true });
      isError = true;
    }

    if (!isError) {
      if (this.state.new_password == this.state.confirm_password) {
        let appdata = {
          old_password: this.state.current_password,
          new_password: this.state.new_password,
          shop_auth_id: this.state.auth_id,
        };
        // console.log(appdata);
        var self = this;
        axios
          .post(changePasswordApi, appdata, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.state.access_token,
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then(function (response) {
            // console.log(response.data);
            if (response.data.status == 1) {
              // alert(response.data.message)
              Alert.alert("Success", response.data.message, [
                {
                  text: "OK",
                  onPress: () => self.redirect_login(),
                },
              ]);
            } else {
              Alert.alert("Warning! ", response.data.message, [
                {
                  text: "OK",
                  onPress: () => self.props.navigation.navigate("Home"),
                },
              ]);
            }
          })
          .catch(function (error) {
            self.setState({ editable: true });
            console.log("Save Order API:", error);
          });
      } else {
        alert("Password does not match");
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderList
          Onpress={() =>
            this.props.navigation.dispatch(
              CommonActions.navigate({
                name: "Home",
                params: { name: "Change Password" },
              })
            )
          }
          name={t("change_password", this.state.locale)}
        />
        <ScrollView style={{ paddingHorizontal: 5, marginTop: 5 }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={20}
            behavior={"padding"}
          >
            <View style={styles.container}>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("@images/logo.png")}
                  style={{ width: 100, height: 100 }}
                ></Image>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#3D266A",
                    fontFamily: Fonts.primary,
                  }}
                >
                  {t("current_password", this.state.locale)}
                </Text>
                <View style={styles.input_container}>
                  <Image
                    source={require("@images/password.png")}
                    style={{ marginLeft: 5 }}
                  ></Image>
                  <TextInput
                    style={styles.input_style}
                    secureTextEntry={true}
                    value={this.state.current_password}
                    onChangeText={(value) =>
                      this.setState({
                        current_password: value,
                        ISCURRENTPASSWORD: false,
                      })
                    }
                  ></TextInput>
                </View>
                <ErrorText
                  errMessage="Please Fill Current Password"
                  isShow={this.state.ISCURRENTPASSWORD}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#3D266A",
                    fontFamily: Fonts.primary,
                  }}
                >
                  {t("new_password", this.state.locale)}
                </Text>
                <View style={styles.input_container}>
                  <Image
                    source={require("@images/password.png")}
                    style={{ marginLeft: 5 }}
                  ></Image>
                  <TextInput
                    style={styles.input_style}
                    secureTextEntry={true}
                    value={this.state.new_password}
                    onChangeText={(value) =>
                      this.setState({
                        new_password: value,
                        ISNEWPASSWORD: false,
                      })
                    }
                  ></TextInput>
                </View>
                <ErrorText
                  errMessage="Please Fill New Password"
                  isShow={this.state.ISNEWPASSWORD}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#3D266A",
                    fontFamily: Fonts.primary,
                  }}
                >
                  {t("confirm_password", this.state.locale)}
                </Text>
                <View style={styles.input_container}>
                  <Image
                    source={require("@images/password.png")}
                    style={{ marginLeft: 5 }}
                  ></Image>
                  <TextInput
                    style={styles.input_style}
                    secureTextEntry={true}
                    value={this.state.confirm_password}
                    onChangeText={(value) =>
                      this.setState({
                        confirm_password: value,
                        ISCONFIRMPASSWORD: false,
                      })
                    }
                  ></TextInput>
                </View>
                <ErrorText
                  errMessage="Please Fill Confirm Password"
                  isShow={this.state.ISCONFIRMPASSWORD}
                />
              </View>
              <View style={styles.btn_container}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => this.change_password()}
                >
                  <Text style={styles.btn_text}>
                    {t("save", this.state.locale)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  input_container: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    borderWidth: 1,
    height: 40,
    borderRadius: 7,
    alignItems: "center",
  },
  input_style: {
    borderColor: "#707070",
    paddingHorizontal: 5,
    fontSize: 15,
    width: "90%",
    height: 40,
    fontFamily: Fonts.primary,
  },
  btn_container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  btn: {
    backgroundColor: "#3D266A",
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btn_text: { color: "white", fontSize: 16, fontFamily: Fonts.primary },
});
