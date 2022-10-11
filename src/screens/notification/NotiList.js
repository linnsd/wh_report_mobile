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
import HeaderList from "@components/HeaderList";

import moment from "moment";

import { CommonActions } from "@react-navigation/native";

import { notiApi, imgPath } from "@apis/Url";

import { t, getLang } from "@services/Localization";
const axios = require("axios");

export default class NotiList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tempData: [],
      locale: "",
      isLoading: false,
      refreshing: false,
      flatListReady: false,
      isFooterLoading: false,
    };
    this.page = 1;
  }

  componentDidMount = async () => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);

    const res = await getLang();
    this.setState({ locale: res });
    this.get_noti_list(this.page);
  };

  // componentWillUnmount() {
  //   // Remove the event listener
  //   this.focusListener.remove();
  // }

  get_noti_list(page) {
    var self = this;

    axios
      .get(notiApi + "?page=" + page, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        // console.log("Report", response.data);
        self.setState({
          data: [...self.state.data, ...response.data.noti_list.data],
          refreshing: false,
          isLoading: false,
          tempData: response.data.noti_list.data,
        });
      })
      .catch(function (error) {
        console.log("Notification Error:", error);
        alert("Something went wrong!");
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
    this.get_noti_list(this.page);
  };

  handleLoadMore = () => {
    this.setState({ isFooterLoading: true }); // Start Footer loading
    this.page = this.page + 1; // increase page by 1
    this.get_noti_list(this.page); // method for API call
  };

  go_detail(data) {
    this.props.navigation.dispatch(
      CommonActions.navigate({
        name: "NotiDetail",
        params: { data: data, backroute: "NotiList" },
      })
    );
  }

  render() {
    const { data } = this.state;
    const dataList = data;

    return (
      <View style={{ flex: 1 }}>
        <HeaderList
          Onpress={() =>
            this.props.navigation.dispatch(
              CommonActions.navigate({
                name: "Home",
                params: { name: "Noti List" },
              })
            )
          }
          name={t("notification", this.state.locale)}
        />

        <View style={{ paddingHorizontal: 10, flex: 1 }}>
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
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "white",
                    borderRadius: 5,
                    paddingHorizontal: 5,
                    shadowOffset: { width: -2, height: 4 },
                    shadowColor: "#171717",
                    shadowOpacity: 0.1,
                  }}
                  onPress={() => this.go_detail(item)}
                >
                  <View style={{ width: "30%" }}>
                    <Image
                      source={{ uri: imgPath + item.path + item.photo }}
                      style={{ width: 100, height: 100 }}
                    />
                  </View>
                  <View style={{ width: "70%" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text numberOfLines={1} style={{ width: 150,fontFamily:Fonts.primary }}>
                        {item.title}
                      </Text>
                      <Text style={{fontFamily:Fonts.primary}}>
                        {moment(item.publish_date).format("DD-MM-YYYY")}
                      </Text>
                    </View>
                    <Text numberOfLines={3} style={{ width: 230,fontFamily:Fonts.primary }}>
                      {item.description}
                    </Text>
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
