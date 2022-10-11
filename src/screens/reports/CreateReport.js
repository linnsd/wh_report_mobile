import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  LogBox,
  Alert,
  Image
} from "react-native";
import HeaderList from "@components/HeaderList";
import CustomDropdown from "@components/CustomDropdown";
import ErrorText from "@components/ErrorText";
import Radio from "@components/Radio";
import Styles from "@styles/Styles";
import { CommonActions } from "@react-navigation/native";
import DatePicker from "react-native-datepicker";
import Fonts from "@styles/Fonts";
const axios = require("axios");
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  masterDataApi,
  createReportApi,
  terminalApi,
  create_report_v2,
} from "@apis/Url";

import { t, getLang } from "@services/Localization";
import moment from "moment";

const PRE_NO = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
];

const PRE_CHAR = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
  { value: "E", label: "E" },
  { value: "F", label: "F" },
  { value: "G", label: "G" },
  { value: "H", label: "H" },
  { value: "I", label: "I" },
  { value: "J", label: "J" },
  { value: "K", label: "K" },
  { value: "L", label: "L" },
  { value: "M", label: "M" },
  { value: "N", label: "N" },
  { value: "O", label: "O" },
  { value: "P", label: "P" },
  { value: "Q", label: "Q" },
  { value: "R", label: "R" },
  { value: "S", label: "S" },
  { value: "T", label: "T" },
  { value: "U", label: "U" },
  { value: "V", label: "V" },
  { value: "W", label: "W" },
  { value: "X", label: "X" },
  { value: "Y", label: "Y" },
  { value: "Z", label: "Z" },
];

export default class CreateReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report_times: [],
      report_time: { value: null, label: null },

      fuel_lists: [],
      fuel_list: { value: null, label: null, fuel_data: null },

      previous_balance: null,
      remaining_day: null,
      current_balance: null,

      fuel_order: 0,
      fuel_received: 0,

      order_company_name: null,
      order_terminal_lists: [],
      order_terminal_list: { value: null, label: null },
      order_pre_no: { value: null, label: null },
      order_pre_char: { value: null, label: null },
      order_bowser_no: null,
      order_arrival_date: null,
      order_capacity: 0,
      order_remark: null,

      received_company_name: null,
      received_terminal_lists: [],
      received_terminal_list: { value: null, label: null },
      received_pre_no: { value: null, label: null },
      received_pre_char: { value: null, label: null },
      received_bowser_no: null,
      received_date: moment(new Date()).format("DD-MM-YYYY"),
      received_capacity: 0,
      received_remark: null,
      max_capacity: 0,
      avg_sale_capacity: 0,

      ISREPORTTIMEERROR: false,
      ISFUELTYPEERROR: false,
      ISCURRENTBALANCEERROR: false,
    };
  }

  _fuel_order_yes() {
    this.setState({
      selectedData: 1,
      fuel_order: 1,
    });
  }

  _fuel_received_yes() {
    this.setState({
      selectedData: 1,
      fuel_received: 1,
    });
  }

  componentDidMount = async () => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);

    var shop_id = await AsyncStorage.getItem("shop_id");
    var shop_name = await AsyncStorage.getItem("shop_name");
    var access_token = await AsyncStorage.getItem("access_token");
    const res = await getLang();

    this.setState({
      shop_id: shop_id,
      shop_name: shop_name,
      access_token,
      locale: res,
    });
    this.get_master_data(shop_id);
    this.get_terminal_data();
  };

  get_terminal_data() {
    // console.log("Here");
    var self = this;
    axios
      .get(terminalApi, {})
      .then(function (response) {
        // console.log(response.data.terminals)

        let terminal_arr = response.data.terminals;
        let TerminalArr = [];
        terminal_arr.map((data, index) => {
          var obj = { value: data.id.toString(), label: data.company_name };
          TerminalArr.push(obj);
        });

        self.setState({
          order_terminal_lists: TerminalArr,
          received_terminal_lists: TerminalArr,
          refreshing: false,
          isLoading: false,
        });
      })
      .catch(function (error) {
        console.log("Terminal API", error);
        alert("Something went wrong!");
      });
  }

  get_master_data(shop_id) {
    var self = this;
    let appuser = {
      shop_id: shop_id,
    };
    // console.log(dashboardApi);
    axios
      .post(masterDataApi, appuser, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        // console.log("Report", response.data);
        let report_time_arr = response.data.report_times;
        let ReportTimeArr = [];
        report_time_arr.map((data, index) => {
          var obj = { value: data.id.toString(), label: data.rep_time };
          ReportTimeArr.push(obj);
        });

        let fuel_arr = response.data.fuel_lists;
        let FuelArr = [];
        fuel_arr.map((data, index) => {
          var obj = {
            value: data.id.toString(),
            label: data.fuel_type,
            fuel_data: data,
          };
          FuelArr.push(obj);
        });

        self.setState({
          report_times: ReportTimeArr,
          fuel_lists: FuelArr,
          refreshing: false,
          isLoading: false,
        });
      })
      .catch(function (error) {
        console.log("Master Data Get API:", error);
        alert("Something went wrong!");
      });
  }

  _handleReportTime(value, label) {
    this.setState({
      report_time: { value: value, label: label },
      ISREPORTTIMEERROR: false,
    });
  }

  _handleFuelType(value, label, data) {
    // console.log("Hello",data);
    this.setState({
      fuel_list: { value: value, label: label },
      previous_balance: data.opening_balance,
      remaining_day: parseInt(data.opening_balance / data.avg_balance),
      avg_sale_capacity: data.avg_balance,
      max_capacity: data.max_capacity,
      ISFUELTYPEERROR: false,
    });
  }

  _orderhandleTerminal(value, label) {
    this.setState({
      order_terminal_list: { value: value, label: label },
    });
  }

  _receivedhandleTerminal(value, label) {
    this.setState({
      received_terminal_list: { value: value, label: label },
    });
  }

  _orderhandlePreChar(value, label) {
    this.setState({
      order_pre_char: { value: value, label: label },
    });
  }

  _receivedhandlePreChar(value, label) {
    this.setState({
      received_pre_char: { value: value, label: label },
    });
  }

  _orderhandlePreNo(value, label) {
    this.setState({
      order_pre_no: { value: value, label: label },
    });
  }

  _receivedhandlePreNo(value, label) {
    this.setState({
      received_pre_no: { value: value, label: label },
    });
  }

  //save inquiry form data
  _handleSave = async () => {
    let isError = false;
    this.setState({ editable: false });
    if (this.state.report_time.value == null) {
      this.setState({ ISREPORTTIMEERROR: true, editable: true });
      isError = true;
    }
    if (this.state.fuel_list.value == null) {
      this.setState({ ISFUELTYPEERROR: true, editable: true });
      isError = true;
    }
    if (!this.state.current_balance) {
      this.setState({ ISCURRENTBALANCEERROR: true, editable: true });
      isError = true;
    }

    if (!isError) {
      let appdata = {
        shop_id: this.state.shop_id,
        fuel_type: this.state.fuel_list.value,
        report_time: this.state.report_time.label,
        previous_balance: this.state.previous_balance,
        now_balance: this.state.current_balance,
        remain_day: this.state.remaining_day,
        is_order: this.state.fuel_order,
        order_company_name: this.state.order_company_name,
        order_terminal: this.state.order_terminal_list.label,
        order_pre_no: this.state.order_pre_no.value,
        order_pre_char: this.state.order_pre_char.value,
        order_bowser_no: this.state.order_bowser_no,
        order_arrival_date: this.state.order_arrival_date,
        order_capacity: this.state.order_capacity,
        pre_remark: this.state.order_remark,
        is_received: this.state.fuel_received,
        received_company_name: this.state.received_company_name,
        received_terminal: this.state.received_terminal_list,
        received_pre_no: this.state.received_pre_no.value,
        received_pre_char: this.state.received_pre_char.value,
        received_bowser_no: this.state.received_bowser_no,
        received_date: this.state.received_date,
        received_capacity: this.state.received_capacity,
        received_remark: this.state.received_remark,
        max_capacity: this.state.max_capacity,
        avg_sale_capacity: this.state.avg_sale_capacity,
        created_name: this.state.shop_name,
      };
      // console.log(appdata);
      var self = this;
      axios
        .post(create_report_v2, appdata, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.access_token,
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then(function (response) {
          // console.log(response.data);
          if (response.data.status == 1) {
            // alert(response.data.message)
            Alert.alert("Success! ", response.data.message, [
              {
                text: "OK",
                onPress: () => self.props.navigation.navigate("Home"),
              },
            ]);
          } else {
            Alert.alert("Success! ", response.data.message, [
              {
                text: "OK",
                onPress: () => self.props.navigation.navigate("Home"),
              },
            ]);
          }
        })
        .catch(function (error) {
          self.setState({ editable: true });
          console.log("Save Order API:", error);
        });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderList
          Onpress={() =>
            this.props.navigation.dispatch(
              CommonActions.navigate({
                name: "Home",
                params: { name: "Create Report" },
              })
            )
          }
          name={t("create_report", this.state.locale)}
        />
        <ScrollView>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={20}
            behavior={"padding"}
          >
            <View style={styles.container}>
              <CustomDropdown
                value={this.state.report_time}
                optionsContainerWidth="90%"
                options={this.state.report_times}
                onSelect={(value, label) =>
                  this._handleReportTime(value, label)
                }
                placeholder={t("select_report_time", this.state.locale)}
                style={{ marginTop: 10 }}
              />
              <ErrorText
                errMessage={t("select_report_time", this.state.locale)}
                isShow={this.state.ISREPORTTIMEERROR}
              />

              <CustomDropdown
                value={this.state.fuel_list}
                optionsContainerWidth="90%"
                options={this.state.fuel_lists}
                onSelect={(value, label, data) =>
                  this._handleFuelType(value, label, data)
                }
                placeholder={t("select_fuel_type", this.state.locale)}
              />
              <ErrorText
                errMessage={t("select_fuel_type", this.state.locale)}
                isShow={this.state.ISFUELTYPEERROR}
              />
              <View style={{ marginTop: 10 }}>
                <Text style={styles.label_text}>
                  {t("previous_balance", this.state.locale)} :{" "}
                  {this.state.previous_balance}
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.label_text}>
                  {t("remaining_day", this.state.locale)} :{" "}
                  {this.state.remaining_day}
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.label_text}>
                  {t("current_balance", this.state.locale)}
                </Text>
                <TextInput
                  style={styles.text_input}
                  placeholder={t("enter_bal_capacity", this.state.locale)}
                  value={this.state.current_balance}
                  onChangeText={(value) =>
                    this.setState({
                      current_balance: value,
                      ISCURRENTBALANCEERROR: false,
                    })
                  }
                  keyboardType="number-pad"
                ></TextInput>
                <ErrorText
                  errMessage={t("enter_bal_capacity", this.state.locale)}
                  isShow={this.state.ISCURRENTBALANCEERROR}
                />
              </View>
            </View>
            <View style={[styles.container, { marginTop: 10 }]}>
              <View style={{ marginTop: 5 }}>
                <Text style={styles.label_text}>
                  {t("fuel_order", this.state.locale)}
                </Text>
                <View style={styles.radio_container}>
                  <Radio
                    label={t("no", this.state.locale)}
                    active={this.state.fuel_order == 0 ? true : false}
                    onPress={() =>
                      this.setState({
                        selectedData: 0,
                        fuel_order: 0,
                      })
                    }
                  />
                  <Radio
                    label={t("yes", this.state.locale)}
                    active={this.state.fuel_order == 1 ? true : false}
                    onPress={() => this._fuel_order_yes()}
                  />
                </View>
              </View>
              {this.state.fuel_order == 1 ? (
                <View style={[{ marginTop: 10 }]}>
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.label_text}>
                      {t("supplier", this.state.locale)}
                    </Text>
                    <TextInput
                      style={styles.text_input}
                      placeholder="AC Co.,Ltd"
                      value={this.state.order_company_name}
                      onChangeText={(value) =>
                        this.setState({ order_company_name: value })
                      }
                    ></TextInput>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.label_text}>
                      {t("terminal", this.state.locale)}
                    </Text>

                    <CustomDropdown
                      value={this.state.order_terminal_list}
                      optionsContainerWidth="90%"
                      options={this.state.order_terminal_lists}
                      onSelect={(value, label, data) =>
                        this._orderhandleTerminal(value, label, data)
                      }
                      placeholder={t("terminal", this.state.locale)}
                    />
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.label_text}>
                      {t("bowser_no", this.state.locale)}
                    </Text>

                    <View style={{ flexDirection: "row" }}>
                      <CustomDropdown
                        value={this.state.order_pre_no}
                        optionsContainerWidth="100%"
                        options={PRE_NO}
                        onSelect={(value, label) =>
                          this._orderhandlePreNo(value, label)
                        }
                        style={{ width: "25%", marginRight: 10 }}
                      />

                      <CustomDropdown
                        value={this.state.order_pre_char}
                        optionsContainerWidth="25%"
                        options={PRE_CHAR}
                        onSelect={(value, label) =>
                          this._orderhandlePreChar(value, label)
                        }
                        style={{ width: "25%", marginRight: 10 }}
                      />

                      <TextInput
                        style={[styles.text_input, { width: "45%" }]}
                        placeholder="1234"
                        value={this.state.order_bowser_no}
                        onChangeText={(value) =>
                          this.setState({ order_bowser_no: value })
                        }
                        keyboardType="number-pad"
                      ></TextInput>
                    </View>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.label_text}>
                      {t("arrival_date", this.state.locale)}
                    </Text>
                    <DatePicker
                      date={this.state.order_arrival_date}
                      mode="date"
                      placeholder="Select Date"
                      format="DD-MM-YYYY"
                      minDate="01-01-1990"
                      maxDate="01-01-2030"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      iconSource={require("@images/calendar.png")}
                      style={Styles.datePickerContainer}
                      customStyles={{
                        dateIcon: Styles.datePickerDateIcon,
                        dateInput: Styles.datePickerDateInput,
                        dateText: Styles.datePickerDateText,
                        datePicker: {
                          backgroundColor: "#222",
                        },
                        datePickerCon: {
                          backgroundColor: "#333",
                        },
                      }}
                      onDateChange={(date) => {
                        this.setState({ order_arrival_date: date });
                      }}
                    />
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.label_text}>
                      {t("capacity", this.state.locale)}
                    </Text>
                    <TextInput
                      style={styles.text_input}
                      keyboardType="number-pad"
                      placeholder="1000"
                      value={this.state.order_capacity}
                      onChangeText={(value) =>
                        this.setState({ order_capacity: value })
                      }
                    ></TextInput>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.label_text}>
                      {t("remark", this.state.locale)}
                    </Text>
                    <TextInput
                      style={styles.text_input}
                      placeholder="Your Remark"
                      value={this.state.order_remark}
                      onChangeText={(value) =>
                        this.setState({ order_remark: value })
                      }
                    ></TextInput>
                  </View>
                </View>
              ) : null}
            </View>
            <View style={[styles.container, { marginTop: 10 }]}>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.label_text}>
                  {t("fuel_received", this.state.locale)}
                </Text>
                <View style={styles.radio_container}>
                  <Radio
                    label={t("no", this.state.locale)}
                    active={this.state.fuel_received == 0 ? true : false}
                    onPress={() =>
                      this.setState({
                        selectedData: 0,
                        fuel_received: 0,
                      })
                    }
                  />
                  <Radio
                    label={t("yes", this.state.locale)}
                    active={this.state.fuel_received == 1 ? true : false}
                    onPress={() => this._fuel_received_yes()}
                  />
                </View>
              </View>
              {this.state.fuel_received == 1 ? (
                <View style={[styles.container, { marginTop: 10 }]}>
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.label_text}>
                      {t("supplier", this.state.locale)}
                    </Text>
                    <TextInput
                      style={styles.text_input}
                      placeholder="AC Co.,Ltd"
                      value={this.state.received_company_name}
                      onChangeText={(value) =>
                        this.setState({ received_company_name: value })
                      }
                    ></TextInput>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.label_text}>
                      {t("terminal", this.state.locale)}
                    </Text>

                    <CustomDropdown
                      value={this.state.received_terminal_list}
                      optionsContainerWidth="90%"
                      options={this.state.received_terminal_lists}
                      onSelect={(value, label, data) =>
                        this._receivedhandleTerminal(value, label, data)
                      }
                      placeholder={t("terminal", this.state.locale)}
                    />
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.label_text}>
                      {t("bowser_no", this.state.locale)}
                    </Text>

                    <View style={{ flexDirection: "row" }}>
                      <CustomDropdown
                        value={this.state.received_pre_no}
                        optionsContainerWidth="100%"
                        options={PRE_NO}
                        onSelect={(value, label) =>
                          this._receivedhandlePreNo(value, label)
                        }
                        style={{ width: "25%", marginRight: 10 }}
                      />

                      <CustomDropdown
                        value={this.state.received_pre_char}
                        optionsContainerWidth="25%"
                        options={PRE_CHAR}
                        onSelect={(value, label) =>
                          this._receivedhandlePreChar(value, label)
                        }
                        style={{ width: "25%", marginRight: 10 }}
                      />

                      <TextInput
                        style={[styles.text_input, { width: "45%" }]}
                        placeholder="1234"
                        value={this.state.received_bowser_no}
                        onChangeText={(value) =>
                          this.setState({ received_bowser_no: value })
                        }
                        keyboardType="number-pad"
                      ></TextInput>
                    </View>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.label_text}>
                      {t("received_date", this.state.locale)}
                    </Text>
                    <View style={[styles.text_input,{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}]}>
                      <Text>{this.state.received_date}</Text>
                      <Image source={require("@images/calendar.png")}></Image>
                    </View>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.label_text}>
                      {t("capacity", this.state.locale)}
                    </Text>
                    <TextInput
                      style={styles.text_input}
                      keyboardType="number-pad"
                      placeholder="1000"
                      value={this.state.received_capacity}
                      onChangeText={(value) =>
                        this.setState({ received_capacity: value })
                      }
                    ></TextInput>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.label_text}>
                      {t("remark", this.state.locale)}
                    </Text>
                    <TextInput
                      style={styles.text_input}
                      placeholder="Your Remark"
                      value={this.state.received_remark}
                      onChangeText={(value) =>
                        this.setState({ received_remark: value })
                      }
                    ></TextInput>
                  </View>
                </View>
              ) : null}
            </View>

            <View style={styles.btn_container}>
              <TouchableOpacity
                style={styles.save_btn}
                onPress={() => this._handleSave()}
              >
                <Text style={styles.btn_text}>
                  {t("save", this.state.locale)}
                </Text>
              </TouchableOpacity>
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
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10,
    paddingBottom: 10,
  },
  label_text: { fontSize: 15, color: "#3D266A", fontFamily: Fonts.primary },
  text_input: {
    borderColor: "#707070",
    borderWidth: 1,
    height: 40,
    borderRadius: 7,
    paddingHorizontal: 5,
    fontSize: 15,
    fontFamily: Fonts.primary,
  },
  btn_container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    //   marginBottom:80
  },
  save_btn: {
    backgroundColor: "#3D266A",
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btn_text: { color: "white", fontSize: 16, fontFamily: Fonts.primary },
  radio_container: { flexDirection: "row", marginTop: 10 },
});
