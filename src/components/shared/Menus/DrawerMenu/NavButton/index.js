import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, View, TouchableOpacity, Text } from "react-native";
import Fonts from "@styles/Fonts";
export default function NavButton(props) {
  // alert(props.active_color)
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: props.active_color ? "#E8E4EF" : "white",
        borderRadius: 5,
      }}
      onPress={props.onPress}
    >
      {props.active_color ? (
        <View style={{ width: 30, alignItems: "flex-start" }}>
          <Image
            source={props.active_photo}
            style={{
              width: props.active_photo_width,
              height: props.active_photo_height,
            }}
          />
        </View>
      ) : (
        <View style={{ width: 30, alignItems: "flex-start" }}>
          <Image
            source={props.photo}
            style={{ width: props.width, height: props.height }}
          />
        </View>
      )}
      {props.active_color ? (
        <Text style={{ marginLeft: 15, color: "#3D266A",fontFamily:Fonts.primary }}>{props.text}</Text>
      ) : (
        <Text style={{ marginLeft: 15 ,fontFamily:Fonts.primary}}>{props.text}</Text>
      )}
    </TouchableOpacity>
  );
}
