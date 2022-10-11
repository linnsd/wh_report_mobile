import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  LogBox,
} from "react-native";
import Fonts from "@styles/Fonts";
import Header from "@components/Header";
import { DrawerActions } from "@react-navigation/native";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import Styles from "@styles/Styles";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dailyReportApi } from "@apis/Url";
import { commaString } from "@services/CommaString";
import { t, getLang } from "@services/Localization";
const axios = require("axios");

export default class DailyReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report_date: moment(new Date()).format("DD-MM-YYYY"),
      report_list: [],
      shop_id: null,
      locale: "",
    };
  }

  componentDidMount = async () => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);

    var shop_id = await AsyncStorage.getItem("shop_id");
    const res = await getLang();
    this.setState({ shop_id: shop_id, locale: res });
    this.get_report_list(shop_id);
  };

  get_report_list(shop_id) {
    var self = this;
    let appuser = {
      shop_id: shop_id,
      date: moment(new Date()).format("DD-MM-YYYY"),
    };
    // console.log(dashboardApi);
    axios
      .post(dailyReportApi, appuser, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        // console.log("Report", response.data);
        self.setState({
          report_list: response.data.daily_lists,
        });
      })
      .catch(function (error) {
        console.log("Daily Report Error:", error);
        alert("Something went wrong!");
      });
  }

  get_report_date(date) {
    var self = this;
    let appuser = {
      shop_id: this.state.shop_id,
      date: date,
    };
    // console.log(dashboardApi);
    axios
      .post(dailyReportApi, appuser, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        // console.log("Report", response.data);
        self.setState({
          report_list: response.data.daily_lists,
        });
      })
      .catch(function (error) {
        console.log("Dashboard Error:", error);
        alert("Something went wrong!");
      });
  }
  _handleOnpress() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }

  go_detail(data) {
    this.props.navigation.dispatch(
      CommonActions.navigate({
        name: "ReportDetail",
        params: { data: data, backroute: "DailyReport" },
      })
    );
  }

  noti_click() {
    this.props.navigation.dispatch(
      CommonActions.navigate({
        name: "NotiList",
      })
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          img={require("@images/threeline.png")}
          Onpress={() => this._handleOnpress()}
          handleNoti={() => this.noti_click()}
          serach={true}
          handleOnPress={() => this.props.navigation.navigate("Noticeboard")}
          text={t("daily_report", this.state.locale)}
        />
        <View style={styles.container}>
          <DatePicker
            date={this.state.report_date}
            mode="date"
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="01-01-1990"
            maxDate="01-01-2030"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require("@images/calendar.png")}
            style={Styles.filter_date_container}
            customStyles={{
              dateIcon: Styles.filter_date_icon,
              dateInput: Styles.filter_date_input,
              datePicker: {
                backgroundColor: "#222",
              },
              datePickerCon: {
                backgroundColor: "#333",
              },
            }}
            onDateChange={(date) => {
              this.setState({ report_date: date });
              this.get_report_date(date);
            }}
          />
        </View>
        <ScrollView style={{ flex: 1, paddingHorizontal: 5 }}>
          {this.state.report_list.length > 0 ? (
            this.state.report_list.map((data, index) => {
              return (
                <TouchableOpacity
                  style={styles.card_view}
                  onPress={this.go_detail.bind(this, data)}
                  key={index}
                >
                  <View style={styles.card_container}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={require("@images/energy_report.png")}
                        style={{ resizeMode: "contain", width: 27, height: 25 }}
                      ></Image>
                      <Text
                        style={{ marginLeft: 10, fontFamily: Fonts.primary }}
                      >
                        {data.fuel_type}
                      </Text>
                    </View>
                    <Text style={styles.date_style}>
                      {moment(data.created_at).format("DD-MM-YYYY")}{" "}
                      {data.report_time}
                    </Text>
                  </View>
                  <View style={styles.card_row}>
                    <Image
                      source={require("@images/oil_can.png")}
                      style={{ resizeMode: "contain", width: 25, height: 25 }}
                    ></Image>
                    <Text style={{ marginLeft: 10, fontFamily: Fonts.primary }}>
                      {commaString(data.opening_balance)} gal
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      paddingHorizontal: 10,
                      paddingBottom: 10,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{ width: 350, fontFamily: Fonts.primary }}
                    >
                      {data.remark}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View
              style={{ alignItems: "center", position: "relative", top: 200 }}
            >
              <Text>{t("no_data", this.state.locale)}</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 10,
    marginRight: 10,
  },
  card_view: {
    backgroundColor: "white",
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10,
    marginTop: 10,
  },
  card_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 7,
    marginTop: 10,
    marginBottom: 10,
  },
  card_row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  date_style: { color: "#3D266A", fontFamily: Fonts.primary },
});
