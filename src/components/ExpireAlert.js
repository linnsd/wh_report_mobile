import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native";

//import date Format
import Moment from "moment";
import Fonts from "@styles/Fonts";
export default class ExpireAlert extends React.Component {
  constructor(props) {
    super(props);
  }

  close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  render() {
    // console.log(this.props.diff);
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isOpen}
      >
        <View style={styles.modalContainer}>
          {this.props.diff < 0 ? (
            <View style={styles.modalBody}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  marginTop: 30,
                  fontFamily: Fonts.primary,
                }}
              >
                လူကြီးမင်း၏ Shop Licence သည်
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontFamily: Fonts.primary,
                }}
              >
                {Moment(this.props.expiredate).format("DD-MM-Y")}ရက်နေ့တွင်
                သက်တမ်းကုန်ဆုံး သွားပါသည်။
              </Text>
              <View
                style={{
                  paddingBottom: 10,
                  paddingHorizontal: 80,
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#3D266A",
                    height: 40,
                    borderRadius: 5,
                  }}
                  onPress={() => this.close()}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontFamily: Fonts.primary,
                    }}
                  >
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : this.props.diff == 0 ? (
            <View style={styles.modalBody}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  marginTop: 30,
                  fontFamily: Fonts.primary,
                }}
              >
                လူကြီးမင်း၏ Shop Licence သည်
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontFamily: Fonts.primary,
                }}
              >
                {" "}
                ယနေ့ သက်တမ်းကုန်ဆုံး ပါမည်။
              </Text>
              <View
                style={{
                  paddingBottom: 10,
                  paddingHorizontal: 80,
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#3D266A",
                    height: 40,
                    borderRadius: 5,
                  }}
                  onPress={() => this.close()}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontFamily: Fonts.primary,
                    }}
                  >
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : this.props.diff < 3 ? (
            <View style={styles.modalBody}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  marginTop: 30,
                  fontFamily: Fonts.primary,
                }}
              >
                {" "}
                လူကြီးမင်း၏ Shop Licence သည်
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontFamily: Fonts.primary,
                }}
              >
                {Moment(this.props.expiredate).format("DD-MM-Y")}ရက်နေ့တွင
                သက်တမ်းကုန်ဆုံး ပါမည်။
              </Text>
              <View
                style={{
                  paddingBottom: 10,
                  paddingHorizontal: 80,
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#3D266A",
                    height: 40,
                    borderRadius: 5,
                  }}
                  onPress={() => this.close()}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontFamily: Fonts.primary,
                    }}
                  >
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View></View>
          )}
          <Image
            source={require("@images/logo.png")}
            style={{
              position: "relative",
              bottom: 200,
              alignItems: "center",
              width: 80,
              height: 80,
            }}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.4)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBody: {
    backgroundColor: "#fff",
    width: 350,
    // height: 100,
    borderRadius: 10,
    overflow: "hidden",
    // borderColor: "#3D266A",
    // borderWidth: 2,
    paddingHorizontal: 20,
    paddingTop: 10,
    marginTop: 50,

    // marginTop: -70,
  },
  modalimg: {
    width: 30,
    height: 30,
    marginTop: 10,
  },

  closeBtn: {
    position: "absolute",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    right: 0,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
});
