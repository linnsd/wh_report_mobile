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
import { t, getLang } from "@services/Localization";
import { CommonActions } from "@react-navigation/native";
import moment from "moment";

import { orderDetailApi } from "@apis/Url";
import { commaString } from "@services/CommaString";

const axios = require("axios");

export default class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      order_id: this.props.route.params.data.id,
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
    this.get_order_data(data.id);
  };

  get_order_data(order_id) {
    var self = this;
    let appuser = {
      order_id: order_id,
    };

    axios
      .post(orderDetailApi, appuser, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        // console.log(response.data)
        self.setState({
          data: response.data.order_detail,
          refreshing: false,
          isLoading: false,
        });
      })
      .catch(function (error) {
        // console.log("Dashboard Error:", error);
        self.setState({
          refreshing: false,
          isLoading: false,
        });
        // alert("Something went wrong!");
      });
  }

  onRefresh = () => {
    this.setState({
      refreshing: true,
      isLoading: true,
    });
    this.get_order_data(this.props.route.params.data.id);
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
            name={t("order_detail", this.state.locale)}
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
                name: "FuelOrder",
                params: { name: "Order Detail" },
              })
            )
          }
          name={t("order_detail", this.state.locale)}
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
                <Text style={styles.label}>
                  {t("order_date", this.state.locale)}
                </Text>
                <TextInput
                  style={styles.text_input}
                  value={
                    this.state.data
                      ? moment(this.state.data.created_at).format(
                          "DD-MM-YYYY hh:m A"
                        )
                      : null
                  }
                  editable={false}
                ></TextInput>
              </View>
              <View style={styles.input_container}>
                <Text style={styles.label}>
                  {t("order_status", this.state.locale)}
                </Text>
                <TextInput
                  style={styles.text_input}
                  value={
                    this.state.data
                      ? this.state.data.pre_status == null
                        ? "Pending"
                        : this.state.data.pre_status == 1
                        ? "Received"
                        : "Cancel"
                      : null
                  }
                  editable={false}
                ></TextInput>
              </View>

              <View style={styles.input_container}>
                {this.state.data ? (
                  this.state.data.pre_status == null ? (
                    <Text style={styles.label}>
                      {t("arrival_date", this.state.locale)}
                    </Text>
                  ) : this.state.data.pre_status == 1 ? (
                    <Text style={styles.label}>
                      {t("received_date", this.state.locale)}
                    </Text>
                  ) : null
                ) : null}

                {this.state.data ? (
                  this.state.data.pre_status == null ? (
                    <TextInput
                      style={styles.text_input}
                      editable={false}
                      value={
                        this.state.data
                          ? this.state.data.pre_arrival_date
                            ? moment(this.state.data.pre_arrival_date).format(
                                "DD-MM-YYYY"
                              )
                            : "-"
                          : null
                      }
                    ></TextInput>
                  ) : this.state.data.pre_status == 1 ? (
                    <TextInput
                      style={styles.text_input}
                      editable={false}
                      value={
                        this.state.data
                          ? this.state.data.pre_received_date
                            ? moment(this.state.data.pre_received_date).format(
                                "DD-MM-YYYY"
                              )
                            : "-"
                          : null
                      }
                    ></TextInput>
                  ) : null
                ) : null}
              </View>
              <View style={styles.input_container}>
                <Text style={styles.label}>
                  {t("supplier", this.state.locale)}
                </Text>
                <TextInput
                  style={styles.text_input}
                  value={this.state.data ? this.state.data.pre_comp_name : null}
                  editable={false}
                ></TextInput>
              </View>
              <View style={styles.input_container}>
                <Text style={styles.label}>
                  {t("terminal", this.state.locale)}
                </Text>
                <TextInput
                  style={styles.text_input}
                  value={this.state.data ? this.state.data.terminal : null}
                  editable={false}
                ></TextInput>
              </View>
              <View style={styles.input_container}>
                <Text style={styles.label}>
                  {t("bowser_no", this.state.locale)}
                </Text>
                <TextInput
                  style={styles.text_input}
                  value={this.state.data ? this.state.data.bowser_no : null}
                  editable={false}
                ></TextInput>
              </View>

              <View style={styles.input_container}>
                <Text style={styles.label}>
                  {t("fuel_type", this.state.locale)}
                </Text>
                <TextInput
                  style={styles.text_input}
                  value={this.state.data ? this.state.data.fuel_name : null}
                  editable={false}
                  placeholder="MS"
                ></TextInput>
              </View>

              <View style={styles.input_container}>
                <Text style={styles.label}>
                  {t("capacity", this.state.locale)}
                </Text>
                <TextInput
                  style={styles.text_input}
                  value={
                    this.state.data
                      ? commaString(this.state.data.pre_capacity) + " gal"
                      : null
                  }
                  editable={false}
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
                  value={this.state.data ? this.state.data.pre_remark : null}
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
    // backgroundColor: "white",
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
