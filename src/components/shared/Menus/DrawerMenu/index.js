import React from "react";
import { Text } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";

import * as S from "./styles";
import NavButton from "./NavButton";
import * as Updates from "expo-updates";
import appjson from "@appjson";
import Fonts from "@styles/Fonts";
import { t, getLang } from "@services/Localization";
//import component
import DrawerHeader from "@components/DrawerHeader";
import { CommonActions } from "@react-navigation/native";
export default class DrawerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ro_status: null,
      user_role: null,
      noti_token: null,
      access_token: null,
      home_active: true,
      active_color: false,
      pre_order_active: false,
      profile_active: false,
      locale: null,
    };
  }

  async componentDidMount() {
    const res = await getLang();
    this.setState({
      locale: res,
    });
  }
  handle_home() {
    this.props.navigation.navigate("Home");

    this.setState({
      home_active: true,
      active_color: false,
      pre_order_active: false,
      profile_active: false,
    });
  }
  handle_daily_record() {
    // alert('hi');
    this.setState({
      home_active: false,
      active_color: true,
      pre_order_active: false,
      profile_active: false,
    });
    this.props.navigation.navigate("DailyReport");
  }
  handle_pre_order() {
    this.props.navigation.navigate("FuelOrder");
    this.setState({
      home_active: false,
      active_color: false,
      pre_order_active: true,
      profile_active: false,
    });
  }
  handle_create_report() {
    this.props.navigation.navigate("CreateReport");
    this.setState({
      home_active: true,
      active_color: false,
      pre_order_active: false,
      profile_active: false,
    });
  }
  handle_profile() {
    this.props.navigation.navigate("Profile");
    this.setState({
      home_active: true,
    });
  }
  handle_language() {
    this.props.navigation.navigate("Language");
    this.setState({
      home_active: true,
      active_color: false,
      pre_order_active: false,
      profile_active: false,
    });
  }
  handle_change_password() {
    this.props.navigation.navigate("ChangePassword");
    this.setState({
      home_active: true,
      active_color: false,
      pre_order_active: false,
      profile_active: false,
    });
  }
  handle_logout() {
    this.props.navigation.navigate("Logout");
    this.setState({
      home_active: true,
      active_color: false,
      pre_order_active: false,
      profile_active: false,
    });
  }
  render() {
    return (
      <S.Column>
        <DrawerHeader
          OnPress={() =>
            this.props.navigation.dispatch(
              CommonActions.navigate({
                name: "Profile",
              })
            )
          }
        />
        <DrawerContentScrollView
          contentContainerStyle={{
            paddingTop: 10,
            // marginLeft:10
          }}
        >
          <NavButton
            photo={require("@images/home_black.png")}
            text={t("main", this.state.locale)}
            active_color={this.state.home_active}
            active_photo={require("@images/home_color.png")}
            onPress={() => this.handle_home()}
            width={30}
            height={25}
            active_photo_width={30}
            active_photo_height={25}
          />
          <NavButton
            photo={require("@images/Energy11.png")}
            text={t("create_report", this.state.locale)}
            onPress={() => this.handle_create_report()}
            width={24}
            height={28}
          />
          <NavButton
            photo={require("@images/sale_history.png")}
            text={t("daily_report", this.state.locale)}
            width={26}
            height={26}
            active_color={this.state.active_color}
            active_photo={require("@images/sale_primary.png")}
            active_photo_width={26}
            active_photo_height={26}
            onPress={() => this.handle_daily_record()}
          />
          <NavButton
            photo={require("@images/fuel-truck-black.png")}
            text={t("fuel_order", this.state.locale)}
            width={35}
            height={26}
            active_color={this.state.pre_order_active}
            active_photo={require("@images/fuel-primary.png")}
            active_photo_width={35}
            active_photo_height={26}
            onPress={() => this.handle_pre_order()}
          />

          <NavButton
            photo={require("@images/language.png")}
            text={t("language", this.state.locale)}
            onPress={() => this.handle_language()}
            width={25}
            height={25}
          />
          <NavButton
            photo={require("@images/profile-user.png")}
            text={t("profile", this.state.locale)}
            onPress={() => this.handle_profile()}
            width={25}
            height={25}
          />
          <NavButton
            photo={require("@images/password.png")}
            text={t("change_password", this.state.locale)}
            onPress={() => this.handle_change_password()}
            width={26}
            height={32}
          />
          <S.Separator />
          <NavButton
            photo={require("@images/logout.png")}
            text={t("logout", this.state.locale)}
            onPress={() => this.handle_logout()}
            width={25}
            height={25}
          />
        </DrawerContentScrollView>

        <S.Footer>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
              fontFamily: Fonts.primary,
            }}
          >
            Version : {appjson.expo.version}
          </Text>
        </S.Footer>
      </S.Column>
    );
  }
}
