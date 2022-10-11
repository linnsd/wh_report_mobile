import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, Alert } from "react-native";
import Fonts from "@styles/Fonts";
import HeaderList from "@components/HeaderList";
import { CommonActions } from "@react-navigation/native";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { t, getLang } from "@services/Localization";
import { imgPath } from "../../apis/Url";

export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      locale: "",
    };
  }

  componentDidMount = async () => {
    this.init();
    this.didFocusSubscription = this.props.navigation.addListener(
      "focus",
      () => {
        this.init();
      }
    );
  };

  init = async () => {
    var data = this.props.route.params.data;
    const res = await getLang();
    this.setState({ isLoading: true, locale: res, data });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderList
          Onpress={() =>
            this.props.navigation.dispatch(
              CommonActions.navigate({
                name: "NotiList",
                params: { name: "NotiDetail" },
              })
            )
          }
          name={t("noti_detail", this.state.locale)}
        />
        <ScrollView style={{ paddingHorizontal: 5, marginTop: 5 }}>
          <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
              {this.state.data ? (
                this.state.data.photo ? (
                  <Image
                    source={{
                      uri:
                        imgPath + this.state.data.path + this.state.data.photo,
                    }}
                    style={{ width: "100%", height: 200 }}
                  ></Image>
                ) : (
                  <Image
                    source={require("@images/logo.png")}
                    style={{ width: 200, height: 200 }}
                  ></Image>
                )
              ) : (
                <Image
                  source={require("@images/logo.png")}
                  style={{ width: 200, height: 200 }}
                ></Image>
              )}
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={[styles.text, { textAlign: "right" }]}>
                {this.state.data
                  ? moment(this.state.data.publish_date).format("DD-MM-YYYY")
                  : null}
              </Text>
              <Text style={styles.text}>
                {this.state.data ? this.state.data.title : null}
              </Text>
              <Text style={styles.text}>
                {this.state.data ? this.state.data.description : null}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: { fontSize: 16, fontFamily: Fonts.primary },
});
