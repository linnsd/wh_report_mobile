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
import HeaderList from "@components/HeaderList";
import Fonts from "@styles/Fonts";
import { t, getLang } from "@services/Localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: "",
    };
  }
  componentDidMount = async () => {
    const res = await getLang();
    this.setState({
      locale: res,
    });
  };
  handle_logout = async () => {
    // alert('hi');
    const self = this;
    // const asyncStorageKeys = await AsyncStorage.getAllKeys();
    // await AsyncStorage.multiRemove(asyncStorageKeys);
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("id");
    await AsyncStorage.removeItem("shop_id");
    await AsyncStorage.removeItem("loginId");
    await AsyncStorage.removeItem("owner");
    await AsyncStorage.removeItem("role_id");
    await AsyncStorage.removeItem("lic_expire_date");
    await AsyncStorage.removeItem("lic_issue_date");
    await AsyncStorage.removeItem("shop_name");
    await AsyncStorage.removeItem("shop_status");
    await AsyncStorage.removeItem("shop_type");
    await AsyncStorage.removeItem("tsh_name_en");
    await AsyncStorage.removeItem("tsh_name_mm");
    await AsyncStorage.removeItem("u_by");
    await AsyncStorage.removeItem("address");
    await AsyncStorage.removeItem("lic_expire_date");
    await self.props.navigation.dispatch(DrawerActions.closeDrawer());
    self.props.navigation.dispatch(
      CommonActions.navigate({
        name: "Login",
      })
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderList
          Onpress={() =>
            this.props.navigation.dispatch(
              CommonActions.navigate({
                name: "Logout",
                params: { name: "Logout" },
              })
            )
          }
          name={t("logout", this.state.locale)}
          is_show={false}
        />
        <ScrollView>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={20}
            behavior={"padding"}
          >
            <View>
              <View style={styles.container}>
                <Image
                  source={require("@images/logo.png")}
                  style={{ width: 100, height: 100 }}
                ></Image>
                <Text style={styles.header_title}>
                  {t("logging_out", this.state.locale)}
                </Text>
              </View>

              <View style={styles.card_container}>
                <Text style={styles.card_header}>
                  {t("are_you_sure", this.state.locale)}
                </Text>
                <View style={styles.btn_container}>
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#3D266A" }]}
                    onPress={() => this.handle_logout()}
                  >
                    <Text style={styles.btn_text}>
                      {t("ok", this.state.locale)}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#AC2424" }]}
                    onPress={() =>
                      this.props.navigation.dispatch(
                        CommonActions.navigate({
                          name: "Home",
                        })
                      )
                    }
                  >
                    <Text style={styles.btn_text}>
                      {t("cancel", this.state.locale)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginTop: 25 },
  header_title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3D266A",
    fontFamily: Fonts.primary,
  },
  card_container: {
    marginTop: 20,
    backgroundColor: "white",
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingHorizontal: 10,
  },
  card_header: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  btn_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  btn: {
    height: 40,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btn_text: { color: "white", fontSize: 16, fontFamily: Fonts.primary },
});
