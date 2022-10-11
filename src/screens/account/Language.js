import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from "react-native";
import HeaderList from "@components/HeaderList";
import Fonts from "@styles/Fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import { CommonActions } from "@react-navigation/native";

//import Localization
import { t, getLang } from "@services/Localization";

export default class Language extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: null,
      mmCheck: false,
      enCheck: false,
    };
  }

  async componentDidMount() {
    const res = await getLang();
    if (res == "EN") {
      this.setState({ enCheck: true });
    } else {
      this.setState({ mmCheck: true });
    }
    this.setState({ locale: res });
  }

  _check_mm = async () => {
    // alert("HI")
    this.setState({ mmCheck: true, enCheck: false });
    AsyncStorage.removeItem("language");
    AsyncStorage.multiSet([["language", "MM"]], (err) => {
      if (err) {
        alert("Asynstorage Error");
      } else {
        console.log("Success");
      }
    });
    Updates.reloadAsync();
  };

  _check_en = async () => {
    this.setState({ enCheck: true, mmCheck: false });
    AsyncStorage.removeItem("language", (err) => {
      if (err) {
        console.log("Error");
      } else {
        console.log("Remove Success");
      }
    });
    AsyncStorage.multiSet([["language", "EN"]], (err) => {
      if (err) {
        alert("Asynstorage Error");
      } else {
        console.log("Success");
      }
    });
    Updates.reloadAsync();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderList
          Onpress={() =>
            this.props.navigation.dispatch(
              CommonActions.navigate({
                name: "Language",
                params: { name: "Language" },
              })
            )
          }
          name={t("language", this.state.locale)}
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
                <Text style={styles.header_text}>
                  {t("translation", this.state.locale)}
                </Text>
              </View>

              <View style={styles.card}>
                <View style={styles.card_header}>
                  <Text style={styles.card_header_style}>
                    {t("choose_lang", this.state.locale)}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.dispatch(
                        CommonActions.navigate({
                          name: "Home",
                        })
                      )
                    }
                  >
                    <Image
                      source={require("@images/close.png")}
                      style={{ width: 25, height: 25 }}
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={
                    this.state.mmCheck == true
                      ? [styles.lang_btn, { backgroundColor: "#D0CDCD" }]
                      : styles.lang_btn
                  }
                  onPress={() => this._check_mm()}
                >
                  <Image
                    source={require("@images/myanmar.png")}
                    style={{ width: 35, height: 35 }}
                  ></Image>

                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10,
                      fontFamily: Fonts.primary,
                    }}
                  >
                    {t("myanmar", this.state.locale)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    this.state.enCheck == true
                      ? [styles.lang_btn, { backgroundColor: "#D0CDCD" }]
                      : styles.lang_btn
                  }
                  onPress={() => this._check_en()}
                >
                  <Image
                    source={require("@images/english.png")}
                    style={{ width: 35, height: 35 }}
                  ></Image>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10,
                      fontFamily: Fonts.primary,
                    }}
                  >
                    {t("english", this.state.locale)}
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
  container: { alignItems: "center", marginTop: 25 },
  header_text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3D266A",
    fontFamily: Fonts.primary,
  },
  card: {
    marginTop: 20,
    backgroundColor: "white",
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  card_header: {
    flexDirection: "row",
    backgroundColor: "#3D266A",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  card_header_style: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: Fonts.primaryBold,
    color: "white",
  },
  lang_btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "white",
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 5,
    margin: 5,
    paddingVertical: 5,
  },
});
