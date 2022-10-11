import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import { DrawerActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dashboardApi, version_update_api } from "@apis/Url";
import { commaString } from "@services/CommaString";
import { CommonActions } from "@react-navigation/native";
import Fonts from "@styles/Fonts";
const axios = require("axios");
import { t, getLang } from "@services/Localization";
import appjson from "@appjson";

//import component
import Header from "@components/Header";
import ExpireAlert from "@components/ExpireAlert";
import VersionCheckModal from "@components/VersionCheckModal";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fuel_balance_at: null,
      fuel_list: [],
      isOpenExpireModal: false,
      expire_date: null,
      diff: null,
      locale: "",
      isOpenVersionModal: false,
      version_name: null,
      update_version: null,
      url: null,
      refreshing: false,
      isLoading: false,
      shop_id: null,
    };
  }

  componentDidMount = async () => {
    var shop_id = await AsyncStorage.getItem("shop_id");
    // var exp_date = await AsyncStorage.getItem("lic_expire_date");

    const res = await getLang();

    this.setState({ locale: res, version_name: appjson.expo.version, shop_id });

    await this.get_dashboard_data(shop_id);
    await this.get_version();
  };

  get_dashboard_data = async (shop_id) => {
    var self = this;
    let appuser = {
      shop_id: shop_id,
    };
    // console.log(appuser);
    axios
      .post(dashboardApi, appuser, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(async (response) => {
        // console.log("Login", response.data.fuel_list);
        self.setState({
          fuel_balance_at: response.data.report_date,
          fuel_list: response.data.fuel_list,
          expire_date: response.data.expire_date,
          refreshing: false,
          isLoading: false,
        });

        // console.log(self.state.expire_date);
        await AsyncStorage.setItem(
          "lic_expire_date",
          response.data.expire_date
        );

        if (response.data.expire_date == null) {
          self.setState({ isOpenExpireModal: false });
        } else {
          var msDiff =
            new Date(response.data.expire_date).getTime() -
            new Date().getTime(); //Future date - current date
          var day_diff = Math.floor(msDiff / (1000 * 60 * 60 * 24));
          // console.log(day_diff);
          if (day_diff < 3) {
            self.setState({ isOpenExpireModal: true, diff: day_diff });
          }
        }
      })
      .catch(function (error) {
        this.setState({
          refreshing: false,
          isLoading: false,
        });
        console.log("Dashboard Error:", error);
        alert("Something went wrong!");
      });
  };

  get_version = async () => {
    var self = this;

    axios
      .post(version_update_api + "/2", {
        headers: {
          Accept: "application/json",
        },
      })
      .then(async (response) => {
        // console.log("Login", response.data);
        if (self.state.version_name != response.data.version.version_name) {
          self.setState({
            isOpenVersionModal: true,
            update_version: response.data.version.version_name,
            url: response.data.version.appstore_url,
            refreshing: false,
            isLoading: false,
          });
        }
      })
      .catch(function (error) {
        console.log("Version Check Error:", error);
        alert("Something went wrong!");
        this.setState({
          refreshing: false,
          isLoading: false,
        });
      });
  };

  onRefresh = () => {
    this.setState({
      refreshing: true,
      isLoading: true,
    });
    this.get_dashboard_data(this.state.shop_id);
    this.get_version();
  };

  _handleOnpress() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }

  noti_click() {
    this.props.navigation.dispatch(
      CommonActions.navigate({
        name: "NotiList",
      })
    );
  }

  _handleOnCloseModal() {
    this.setState({ isOpenExpireModal: false });
  }

  _closeVersionModal() {
    this.setState({ isOpenVersionModal: false });
  }

  _handleOpenLink() {
    Linking.openURL(this.state.url);
    this.setState({ isOpenVersionModal: false });
  }

  render() {
    // console.log(this.state.expire_date)
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1 }}>
          <Header
            img={require("@images/threeline.png")}
            Onpress={() => this._handleOnpress()}
            handleNoti={() => this.noti_click()}
            text={t("main", this.state.locale)}
            exp_text={this.state.expire_date ? this.state.expire_date : null}
          />
          <View style={styles.loadingView}>
            <ActivityIndicator size="large" />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Header
          img={require("@images/threeline.png")}
          Onpress={() => this._handleOnpress()}
          handleNoti={() => this.noti_click()}
          text={t("main", this.state.locale)}
          exp_text={this.state.expire_date ? this.state.expire_date : null}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        >
          <View style={styles.second_container}>
            <ExpireAlert
              isOpen={this.state.isOpenExpireModal}
              onClose={() => this._handleOnCloseModal()}
              expiredate={this.state.expire_date}
              diff={this.state.diff}
            />
            <VersionCheckModal
              isOpen={this.state.isOpenVersionModal}
              onClose={() => this._closeVersionModal()}
              version_name={this.state.update_version}
              openLink={() => this._handleOpenLink()}
            />

            <Text style={styles.report_time_text}>
              {t("fuel_balance_at", this.state.locale)}:{" "}
              {this.state.fuel_balance_at}
            </Text>

            <View style={styles.card_view}>
              <View style={styles.card_header_view}>
                <Text style={styles.card_header_text}>
                  {t("fuel_type", this.state.locale)}
                </Text>
                <Text style={styles.card_header_text}>
                  {t("max_capacity", this.state.locale)}
                </Text>
                <Text style={styles.card_header_text}>
                  {t("balance", this.state.locale)}
                </Text>
              </View>
              <View style={styles.card_body_view}>
                {this.state.fuel_list.map((data, index) => {
                  return (
                    <View style={styles.card_row_view} key={index}>
                      <Text style={[styles.card_body_text, { width: "30%" }]}>
                        {data.fuel_type}
                      </Text>
                      <Text
                        style={[
                          styles.card_body_text,
                          { width: "40%", textAlign: "center" },
                        ]}
                      >
                        {commaString(data.max_capacity)}{" "}
                        {t("gal", this.state.locale)}
                      </Text>
                      <Text
                        style={[
                          styles.card_body_text,
                          { width: "30%", textAlign: "right" },
                        ]}
                      >
                        {commaString(data.opening_balance)}{" "}
                        {t("gal", this.state.locale)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={styles.card_view}>
              <View style={styles.card_header_view}>
                <Text style={styles.card_header_text}>
                  {t("fuel_type", this.state.locale)}
                </Text>
                <Text style={styles.card_header_text}>
                  {t("avg_capacity", this.state.locale)}
                </Text>
                <Text style={styles.card_header_text}>
                  {t("remain_day", this.state.locale)}
                </Text>
              </View>
              <View style={styles.card_body_view}>
                {this.state.fuel_list.map((data, index) => {
                  return (
                    <View style={styles.card_row_view} key={index}>
                      <Text style={[styles.card_body_text, { width: "30%" }]}>
                        {data.fuel_type}
                      </Text>
                      <Text
                        style={[
                          styles.card_body_text,
                          { width: "40%", textAlign: "center" },
                        ]}
                      >
                        {commaString(data.avg_balance)}{" "}
                        {t("gal", this.state.locale)}
                      </Text>
                      <Text
                        style={[
                          styles.card_body_text,
                          { width: "30%", textAlign: "right" },
                        ]}
                      >
                        {data.available_days} {t("day", this.state.locale)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  second_container: { marginTop: 10, paddingHorizontal: 10 },
  report_time_text: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#3D266A",
    fontFamily: Fonts.primary,
  },
  card_view: {
    borderColor: "#3D266A",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  card_header_view: {
    flexDirection: "row",
    backgroundColor: "#3D266A",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  card_header_text: { fontSize: 16, color: "white", fontFamily: Fonts.primary },
  card_body_view: {
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  card_body_text: { fontSize: 16, color: "#707070", fontFamily: Fonts.primary },
  card_row_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    paddingHorizontal: 10,
  },
  loadingView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
