import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";

//import Styles
import Fonts from "@styles/Fonts";

export default class PhotoModal extends React.Component {
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
            <View
              style={{
                width: "100%",
                alignItems: "flex-end"
              }}
            >
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
            <View
              style={{
                flex: 1,
                flexDirection: "row"
              }}
            >
              <TouchableOpacity onPress={() => this.onPress("TAKE_PHOTO")}>
                <Image
                  source={require("@images/select_camera.png")}
                  style={styles.image}
                />
                <Text style={styles.text}>Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginLeft: 40 }}
                onPress={() => this.onPress("PICK_PHOTO")}
              >
                <Image
                  source={require("@images/gallery.png")}
                  style={styles.image}
                />
                <Text style={styles.text}>Gallery</Text>
              </TouchableOpacity>
            </View>
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
    paddingHorizontal: 20
  },
  modalBody: {
    backgroundColor: "#fff",
    width: "100%",
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },

  image: {
    width: 60,
    height: 60
  },
  text: {
    fontSize: 14,
    fontFamily: Fonts.secondary,
    marginTop: 5,
    textAlign: "center"
  },
  closeBtn: {
    padding: 10
  },
  closeIcon: {
    width: 20,
    height: 20
  }
});
