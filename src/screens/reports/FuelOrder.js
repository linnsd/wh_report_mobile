import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  LogBox,
  FlatList,
  RefreshControl,
} from "react-native";

import Fonts from "@styles/Fonts";
import { t, getLang } from "@services/Localization";
import Header from "@components/Header";
import { DrawerActions } from "@react-navigation/native";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import Styles from "@styles/Styles";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { orderApi } from "@apis/Url";
import { commaString } from "@services/CommaString";
const axios = require("axios");

export default class FuelOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order_date: moment(new Date()).format("DD-MM-YYYY"),
      data: [],
      tempData: [],
      shop_id: null,
      isLoading: false,
      refreshing: false,
      flatListReady: false,
      locale: null,
    };
    this.page = 1;
  }
  _handleOnpress() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }

  componentDidMount = async () => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);

    var shop_id = await AsyncStorage.getItem("shop_id");
    var access_token = await AsyncStorage.getItem("access_token");
    const res = await getLang();
    this.setState({
      shop_id: shop_id,
      access_token: access_token,
      locale: res,
    });
    this.get_order_list(this.page);
  };

  get_order_list(page) {
    var self = this;
    let appuser = {
      shop_id: this.state.shop_id,
      date: this.state.order_date,
      page: page,
    };

    axios
      .post(orderApi, appuser, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        self.setState({
          data: [...self.state.data, ...response.data.order_list.data],
          refreshing: false,
          isLoading: false,
          // total: response.data.total,
          tempData: response.data.order_list.data,
        });
      })
      .catch(function (error) {
        console.log("Order List Error:", error);
        alert("Something went wrong!");
        self.setState({
          refreshing: false,
          isLoading: false,
        });
      });
  }

  get_orderlist_date(date) {
    this.page = 1;

    var self = this;
    let appuser = {
      shop_id: this.state.shop_id,
      date: date,
      page: this.page,
    };

    axios
      .post(orderApi, appuser, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        self.setState({
          data: response.data.order_list.data,
          refreshing: false,
          isLoading: false,
          // total: response.data.total,
          tempData: response.data.order_list,
        });
      })
      .catch(function (error) {
        console.log("Order List Error:", error);
        // alert("Something went wrong!");
        self.setState({
          refreshing: false,
          isLoading: false,
        });
      });
  }

  _scrolled() {
    this.setState({ flatListReady: true });
  }

  //on refresh
  onRefresh = () => {
    this.setState({
      data: [],
      refreshing: true,
      isLoading: false,
    });
    this.page = 1;
    this.get_order_list(this.page);
  };

  handleLoadMore = () => {
    this.setState({ isFooterLoading: true }); // Start Footer loading
    this.page = this.page + 1; // increase page by 1
    this.get_order_list(this.page); // method for API call
  };

  noti_click() {
    this.props.navigation.dispatch(
      CommonActions.navigate({
        name: "NotiList",
      })
    );
  }

  render() {
    const { data } = this.state;
    const dataList = data;
    return (
      <View style={{ flex: 1 }}>
        <Header
          img={require("@images/threeline.png")}
          Onpress={() => this._handleOnpress()}
          handleNoti={() => this.noti_click()}
          serach={true}
          text={t("fuel_order", this.state.locale)}
        />
        <View style={styles.container}>
          <DatePicker
            date={this.state.order_date}
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
              this.setState({ order_date: date });
              this.get_orderlist_date(date);
            }}
          />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 5 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataList}
            onScroll={this._scrolled.bind(this)}
            extraData={this.state}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
            renderItem={({ item }) => (
              <View style={{ marginTop: 5 }}>
                <TouchableOpacity
                  style={styles.card_view}
                  onPress={() =>
                    this.props.navigation.dispatch(
                      CommonActions.navigate({
                        name: "OrderDetail",
                        params: { data: item, backroute: "FuelOrder" },
                      })
                    )
                  }
                >
                  <View style={styles.card_body}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={require("@images/energy_red.png")}
                        style={{ resizeMode: "contain", width: 27, height: 25 }}
                      ></Image>
                      <Text
                        style={{ marginLeft: 10, fontFamily: Fonts.primary }}
                      >
                        {item.fuel_type}
                      </Text>
                    </View>
                    <Text style={styles.text_color}>
                      {item.pre_status == null
                        ? item.pre_arrival_date
                          ? moment(item.pre_arrival_date).format("DD-MM-YYYY")
                          : "-"
                        : item.pre_status == 1
                        ? item.pre_received_date
                          ? moment(item.pre_received_date).format("DD-MM-YYYY")
                          : "-"
                        : "-"}
                    </Text>
                  </View>
                  <View style={styles.card_row}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={require("@images/fuel_truck_green.png")}
                        style={{ resizeMode: "contain", width: 30, height: 25 }}
                      ></Image>
                      <Text
                        style={{ marginLeft: 10, fontFamily: Fonts.primary }}
                      >
                        {commaString(item.pre_capacity)} gal
                      </Text>
                    </View>
                    {item.pre_status == null ? (
                      <Text
                        style={{ color: "#D69A29", fontFamily: Fonts.primary }}
                      >
                        Pending
                      </Text>
                    ) : item.pre_status == 1 ? (
                      <Text
                        style={{ color: "#0D7119", fontFamily: Fonts.primary }}
                      >
                        Received
                      </Text>
                    ) : (
                      <Text
                        style={{ color: "#A21111", fontFamily: Fonts.primary }}
                      >
                        Cancel
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={(x) => {
              this.handleLoadMore();
            }}
          />
        </View>
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
  card_body: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 7,
    marginTop: 10,
    marginBottom: 5,
  },
  card_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 7,
    marginTop: 10,
    marginBottom: 10,
  },
  text_color: { color: "#3D266A", fontFamily: Fonts.primary },
});
