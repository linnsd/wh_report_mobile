import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

//import Styles
import Fonts from "@styles/Fonts";

export default class VersionCheckModal extends React.Component {
  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  onPress(action) {
    if (this.props.onChoose) {
      this.props.onChoose(action);
    }
  }

  _handleLink() {
    // alert('hyi')
    if (this.props.openLink) {
      this.props.openLink();
    }
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isOpen}
        onRequestClose={() => {}}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            {/* <View
              style={{
                width: "100%",
                alignItems: "flex-end",
              }}
            >
              
            </View> */}
            <View
              style={{
                flexDirection: "row",
                // alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={require("@images/pprd.jpg")}
                style={{
                  width: 50,
                  height: 50,
                  marginLeft: 10,
                  // marginRight: 20,
                  marginTop: 20,
                }}
              ></Image>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Fonts.primary,
                  fontWeight: "bold",
                  marginTop: 30,
                }}
              >
                PPRD needs an update
              </Text>
              <TouchableOpacity
                onPress={() => this.onClose()}
                style={styles.closeBtn}
              >
                <Image
                  source={require("@images/cancel.png")}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text style={{ fontSize: 16, fontFamily: Fonts.primary }}>
                To Use This App
              </Text>
              <Text style={{ fontSize: 16, fontFamily: Fonts.primary }}>
                Download the latest version - {this.props.version_name}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() => this._handleLink()}
            >
              <Image
                source={require("@images/app_icon.png")}
                style={{
                  width: 50,
                  height: 50,
                  marginLeft: 10,
                  marginRight: 20,
                }}
              ></Image>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Fonts.primary,
                  fontWeight: "bold",
                }}
              >
                App Store
              </Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 20,
  },
  modalBody: {
    backgroundColor: "#fff",
    width: "100%",
    height: 200,
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 10,
  },

  image: {
    width: 60,
    height: 60,
  },
  text: {
    fontSize: 14,
    fontFamily: Fonts.secondary,
    marginTop: 5,
    textAlign: "center",
  },
  closeBtn: {
    padding: 10,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
});
