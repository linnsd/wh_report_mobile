import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Fonts from "@styles/Fonts";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
//import component
import HeaderList from "@components/HeaderList";
import PhotoModal from "@components/PhotoModal";

import { CommonActions } from "@react-navigation/native";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormData from "form-data";

import { imgPath, profileApi, updateProfileApi } from "@apis/Url";
import { t, getLang } from "@services/Localization";
const axios = require("axios");

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shop_id: null,
      shop_name: null,
      login_id: null,
      owner: null,
      state_division: null,
      tsh_name_mm: null,
      address: null,
      issue_date: null,
      expire_date: null,
      access_token: null,
      profile_name: null,
      profile_path: null,
      locale: "",
      refreshing: false,
      isLoading: false,
      is_open: false,
      lat: null,
      lng: null,
    };
  }

  componentDidMount = async () => {
    var shop_id = await AsyncStorage.getItem("shop_id");

    const res = await getLang();
    var access_token = await AsyncStorage.getItem("access_token");
    this.setState({
      locale: res,
      shop_id,
    });

    this.get_profile_data(shop_id);
  };

  getPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission Not Granted");
    } else {
      this.setState({ is_open: true });
    }
  };

  get_profile_data = async (shop_id) => {
    var self = this;
    let app_user = {
      shop_id: shop_id,
    };
    self.setState({ isLoading: true });
    axios
      .post(profileApi, app_user, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        // console.log("Report", response.data.shop_data);
        self.setState({
          owner: response.data.shop_data.owner,
          state_division: response.data.shop_data.sd_name,
          tsh_name_mm: response.data.shop_data.tsh_name_mm,
          address: response.data.shop_data.address,
          issue_date: response.data.shop_data.lic_issue_date,
          expire_date: response.data.shop_data.lic_expire_date,
          shop_name: response.data.shop_data.shopName,
          login_id: response.data.shop_data.licence_no,
          profile_path: response.data.shop_data.profile_path,
          profile_name: response.data.shop_data.shop_profile,
          lat: response.data.shop_data.lat,
          lng: response.data.shop_data.lng,
          refreshing: false,
          isLoading: false,
        });
      })
      .catch(function (error) {
        console.log("Notification Error:", error);
        alert("Something went wrong!");
      });
  };

  //on refresh
  onRefresh = () => {
    this.setState({
      refreshing: true,
      isLoading: false,
    });
    this.get_profile_data(this.state.shop_id);
  };

  _handleModal() {
    this.getPermissions();
  }
  _closeModal() {
    this.setState({ is_open: false });
  }

  _handleOnChoose(action) {
    // alert(action)
    if (action == "PICK_PHOTO") {
      this.pickPhoto();
    }
    if (action == "TAKE_PHOTO") {
      this.takePhoto();
    }
  }

  pickPhoto = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    this.setState({ is_open: false });
    if (pickerResult.cancelled == false) {
      this._uploadProfile(pickerResult);
    }
  };

  takePhoto = async () => {
    let imagResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    this.setState({ is_open: false });
    if (imagResult.cancelled == false) {
      this._uploadProfile(imagResult);
    }
  };

  _uploadProfile = async (pickerResult) => {
    const formData = new FormData();
    formData.append("shop_id", this.state.shop_id);

    const fileName = pickerResult.uri.substr(
      pickerResult.uri.lastIndexOf("/") + 1
    );
    formData.append("photo", {
      uri: pickerResult.uri,
      name: fileName,
      type: pickerResult.type,
    });

    // console.log(formData);

    var self = this;
    self.setState({ isLoading: true });
    axios
      .post(updateProfileApi, formData, {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        self.setState({
          isLoading: true,
        });
        // console.log(response.data);
        if (response.data.status == 1) {
          self.setState({ isLoading: false });
          alert(response.data.message);
        } else {
          self.setState({ isLoading: false });
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        self.setState({ isLoading: false });
        alert(error);
        // console.log("Error:", error);
      });
  };

  getLocationAsync = async () => {
    // alert('hi');
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      //   alert(status);
      if (status !== "granted") {
        this.setState({
          errorMessage: "Permission to access location was denied",
        });
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      this.setState({ lat: location.coords.latitude });
      this.setState({ lng: location.coords.longitude });

      // this.update_lat_lng(this.state.latitude, this.state.longitude);
    } catch (err) {
      this.setState({ errorMessage: err });
      console.log("Error in getLocation", err);
    }
  };

  _handelUpdateLatLng = async () => {
    var self = this;
    self.setState({ isLoading: true });
    let app_data = {
      lat: self.state.lat,
      lng: self.state.lng,
      shop_id: self.state.shop_id,
    };
    axios
      .post(updateProfileApi, app_data, {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        self.setState({
          isLoading: true,
        });
        // console.log(response.data);
        if (response.data.status == 1) {
          self.setState({ isLoading: false });
          alert(response.data.message);
        } else {
          self.setState({ isLoading: false });
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        self.setState({ isLoading: false });
        alert(error);
        // console.log("Error:", error);
      });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1 }}>
          <HeaderList
            Onpress={() =>
              this.props.navigation.dispatch(
                CommonActions.navigate({
                  name: "Home",
                  params: { name: "Profile" },
                })
              )
            }
            name={t("profile", this.state.locale)}
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
                name: "Home",
                params: { name: "Profile" },
              })
            )
          }
          name={t("profile", this.state.locale)}
        />
        <ScrollView style={{ paddingHorizontal: 5, marginTop: 5 }}>
          <View style={styles.container}>
            <PhotoModal
              isOpen={this.state.is_open}
              onClose={() => this._closeModal()}
              onChoose={this._handleOnChoose.bind(this)}
            />
            <View style={{ alignItems: "center" }}>
              {this.state.profile_name != null ? (
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => this._handleModal()}
                >
                  <Image
                    source={{
                      uri:
                        imgPath +
                        this.state.profile_path +
                        this.state.profile_name,
                    }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                  ></Image>
                  <View
                    style={{ position: "absolute", right: 0, marginTop: 70 }}
                  >
                    <Image
                      source={require("@images/profile_camera.png")}
                      style={{ width: 20, height: 20 }}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <Image
                  source={require("@images/logo.png")}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                ></Image>
              )}

              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Fonts.primaryBold,
                  fontWeight: "bold",
                  color: "#3D266A",
                }}
              >
                {this.state.shop_name}
              </Text>
              <Text style={{ fontSize: 18, fontFamily: Fonts.primaryBold }}>
                {this.state.login_id}
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ width: "50%" }}>
                  {t("owner", this.state.locale)}
                </Text>
                <Text style={{ width: "50%" }}>{this.state.owner}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ width: "50%" }}>
                  {t("state_division", this.state.locale)}
                </Text>
                <Text style={{ width: "50%" }}>
                  {this.state.state_division}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ width: "50%" }}>
                  {t("township", this.state.locale)}
                </Text>
                <Text style={{ width: "50%" }}>{this.state.tsh_name_mm}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ width: "50%" }}>
                  {t("address", this.state.locale)}
                </Text>
                <Text style={{ width: "50%" }}>{this.state.address}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ width: "50%" }}>
                  {t("issue_date", this.state.locale)}
                </Text>
                <Text style={{ width: "50%" }}>
                  {moment(this.state.issue_date).format("DD-MM-YYYY")}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ width: "50%" }}>
                  {t("expire_date", this.state.locale)}
                </Text>
                <Text style={{ width: "50%" }}>
                  {moment(this.state.expire_date).format("DD-MM-YYYY")}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.container, { marginTop: 5 }]}>
            <Text>{t("lat", this.state.locale)}</Text>
            <View style={[styles.input_container, { marginBottom: 10 }]}>
              <TextInput
                style={styles.input_style}
                value={this.state.lat ? this.state.lat.toString() : null}
                onChangeText={(value) => this.setState({ lat: value })}
                placeholder={t("lat", this.state.locale)}
              ></TextInput>
              <TouchableOpacity onPress={() => this.getLocationAsync()}>
                <Image
                  source={require("@images/location.png")}
                  style={{ marginRight: 10, width: 20, height: 20 }}
                ></Image>
              </TouchableOpacity>
            </View>
            <Text>{t("lng", this.state.locale)}</Text>
            <View style={[styles.input_container, { marginBottom: 10 }]}>
              <TextInput
                style={styles.input_style}
                value={this.state.lng ? this.state.lng.toString() : null}
                onChangeText={(value) => this.setState({ lng: value })}
                placeholder={t("lng", this.state.locale)}
              ></TextInput>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#3D266A",
                  width: 100,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
                onPress={() => this._handelUpdateLatLng()}
              >
                <Text style={{ color: "white" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
          {this.state.lat && this.state.lng ? (
            <View style={{marginTop:10}}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{
                  height: 200,
                }}
                region={{
                  latitude: Number(this.state.lat),
                  longitude: Number(this.state.lng),
                  latitudeDelta: 0.000757,
                  longitudeDelta: 0.002866,
                }}
                mapType="satellite"
              >
                <Marker
                  coordinate={{
                    latitude: Number(this.state.lat),
                    longitude: Number(this.state.lng),
                  }}
                  onDragEnd={(e) =>
                    alert(JSON.stringify(e.nativeEvent.coordinate))
                  }
                  title={"Your Current Location"}
                  description={
                    "Check Current location is mm-link internet available"
                  }
                />
              </MapView>
              <TouchableOpacity
                onPress={() => this.getLocationAsync()}
                style={{ position: "absolute", right: 0, marginTop: 10 }}
                activeOpacity={0.8}
              >
                <Image
                  source={require("@images/current_location.png")}
                  style={{ width: 50, height: 50, marginRight: 10 }}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  input_container: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    borderWidth: 1,
    height: 40,
    borderRadius: 7,
    alignItems: "center",
  },
  input_style: {
    borderColor: "#707070",
    paddingHorizontal: 5,
    fontSize: 15,
    width: "90%",
    height: 40,
    fontFamily: Fonts.primary,
  },
  btn_container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  btn: {
    backgroundColor: "#3D266A",
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btn_text: { color: "white", fontSize: 16, fontFamily: Fonts.primary },
  loadingView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  // input_container: {
  //   flexDirection: "row",
  //   width: "100%",
  //   borderWidth: 1,
  //   height: 40,
  //   borderRadius: 20,
  //   alignItems: "center",
  // },
});
