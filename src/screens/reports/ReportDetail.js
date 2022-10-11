import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import HeaderList from "@components/HeaderList";
import Fonts from "@styles/Fonts";
import { CommonActions } from "@react-navigation/native";
import moment from "moment";
import { t, getLang } from "@services/Localization";
import { reportDetailApi } from "@apis/Url";
import { commaString } from "@services/CommaString";

const axios = require("axios");

export default class ReportDetail extends React.Component {
  // this.props.route.params.data.id
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      report_id: this.props.route.params.data.id,
      refreshing: false,
      isLoading: false,
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
    this.setState({ isLoading: true, locale: res });
    this.get_report_data(data.id);
  };

  get_report_data(report_id) {
    var self = this;
    let appuser = {
      report_id: report_id,
    };

    axios
      .post(reportDetailApi, appuser, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        // console.log(response.data.daily_detail);
        self.setState({
          data: response.data.daily_detail,
          refreshing: false,
          isLoading: false,
        });
      })
      .catch(function (error) {
        console.log("Dashboard Error:", error);
        self.setState({
          refreshing: false,
          isLoading: false,
        });
        alert("Something went wrong!");
      });
  }

  onRefresh = () => {
    this.setState({
      refreshing: true,
      isLoading: true,
    });
    this.get_report_data(this.props.route.params.data.id);
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1 }}>
          <HeaderList
            Onpress={() =>
              this.props.navigation.dispatch(
                CommonActions.navigate({
                  name: "DailyReport",
                  params: { name: "Report Detail" },
                })
              )
            }
            name={t("report_detail", this.state.locale)}
          />
          <View style={styles.loadingView}>
            <ActivityIndicator size="large" />
          </View>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <HeaderList
          Onpress={() =>
            this.props.navigation.dispatch(
              CommonActions.navigate({
                name: "DailyReport",
                params: { name: "Report Detail" },
              })
            )
          }
          name={t("report_detail", this.state.locale)}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        >
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={20}
            behavior={"padding"}
          >
            <View style={styles.container}>
              <View style={styles.input_container}>
                <Text style={styles.label}>{t("date", this.state.locale)}</Text>
                <TextInput
                  style={styles.text_input}
                  value={
                    this.state.data
                      ? moment(this.state.data.created_at).format(
                          "DD-MM-YYYY"
                        ) +
                        " " +
                        this.state.data.report_time
                      : null
                  }
                  editable={false}
                ></TextInput>
              </View>
              <View style={styles.input_container}>
                <Text style={styles.label}>
                  {t("fuel_type", this.state.locale)}
                </Text>
                <TextInput
                  style={styles.text_input}
                  value={this.state.data ? this.state.data.fuel_type : null}
                  editable={false}
                ></TextInput>
              </View>
              <View style={styles.input_container}>
                <Text style={styles.label}>
                  {t("storage_capacity", this.state.locale)}
                </Text>
                <TextInput
                  style={styles.text_input}
                  value={
                    this.state.data
                      ? commaString(this.state.data.max_capacity) +
                        t("gal", this.state.locale)
                      : null
                  }
                  editable={false}
                ></TextInput>
              </View>
              <View style={styles.input_container}>
                <Text style={styles.label}>
                  {t("bal_capacity", this.state.locale)}
                </Text>
                <TextInput
                  style={styles.text_input}
                  value={
                    this.state.data
                      ? commaString(this.state.data.fuel_balance) +
                        t("gal", this.state.locale)
                      : null
                  }
                  editable={false}
                ></TextInput>
              </View>
              <View style={styles.input_container}>
                <Text style={styles.label}>
                  {t("sale_capacity", this.state.locale)}
                </Text>
                <TextInput
                  style={styles.text_input}
                  value={
                    this.state.data
                      ? commaString(this.state.data.daily_sale_capacity) +
                        t("gal", this.state.locale)
                      : null
                  }
                  editable={false}
                  placeholder="1,000 gal"
                ></TextInput>
              </View>
              <View style={styles.input_container}>
                <Text style={styles.label}>
                  {t("avg_sale_capacity", this.state.locale)}
                </Text>
                <TextInput
                  style={styles.text_input}
                  value={
                    this.state.data
                      ? commaString(this.state.data.avg_sale_capacity) +
                        t("gal", this.state.locale)
                      : null
                  }
                  editable={false}
                  placeholder="250 gal"
                ></TextInput>
              </View>
              <View style={styles.input_container}>
                <Text style={styles.label}>
                  {t("stock_avail_day", this.state.locale)}
                </Text>
                <TextInput
                  style={styles.text_input}
                  value={
                    this.state.data
                      ? this.state.data.available_day + " Days"
                      : null
                  }
                  editable={false}
                  placeholder="12 Days"
                ></TextInput>
              </View>
              <View style={styles.input_container}>
                <Text style={styles.label}>
                  {t("fuel_order", this.state.locale)}
                </Text>
                <TextInput
                  style={styles.text_input}
                  value={
                    this.state.data
                      ? this.state.data.pre_order_capacity
                        ? commaString(this.state.data.pre_order_capacity) +
                          t("gal", this.state.locale)
                        : "-"
                      : null
                  }
                  editable={false}
                ></TextInput>
              </View>
              <View style={styles.input_container}>
                <Text style={styles.label}>
                  {t("arrival_date", this.state.locale)}
                </Text>
                <TextInput
                  style={styles.text_input}
                  editable={false}
                  value={
                    this.state.data
                      ? this.state.data.arrival_date
                        ? moment(this.state.data.arrival_date).format(
                            "DD-MM-YYYY"
                          )
                        : "-"
                      : null
                  }
                  placeholder="10-07-2022"
                ></TextInput>
              </View>
              <View style={styles.input_container}>
                <Text style={styles.label}>
                  {t("remark", this.state.locale)}
                </Text>
                <TextInput
                  style={styles.remark_style}
                  editable={false}
                  multiline={true}
                  numberOfLines={10}
                  value={this.state.data ? this.state.data.remark : null}
                  placeholder="Terminal 002 Supplier2 မှ မှာယူထားပါသဖြင့် 10-07-2022 တွင် ရောက်ရှိပါမည်။"
                ></TextInput>
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
    paddingHorizontal: 10,
    backgroundColor: "white",
    paddingBottom: 10,
  },
  label: { fontSize: 15, color: "#3D266A", fontFamily: Fonts.primary },
  text_input: {
    borderColor: "#707070",
    borderWidth: 1,
    height: 40,
    borderRadius: 7,
    paddingHorizontal: 5,
    fontSize: 15,
    fontFamily: Fonts.primary,
  },
  remark_style: {
    borderColor: "#707070",
    borderWidth: 1,
    height: 40,
    borderRadius: 7,
    paddingHorizontal: 5,
    fontSize: 15,
    minHeight: 50,
    marginBottom: 10,
    fontFamily: Fonts.primary,
  },
  input_container: { marginTop: 10 },
  loadingView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
