import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  //Date Picker
  datePickerContainer: {
    width: "100%",
    borderStyle: "solid",
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    height: 40,
    alignItems: "center",
  },
  datePickerDateIcon: {
    height: 20,
    width: 20,
  },
  datePickerDateInput: {
    borderWidth: 0,
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 10,
  },
  datePickerDateText: {
    textAlignVertical: "center",
    flex: 1,
    fontSize: 14,
    marginTop: 10,
  },

  filter_date_container: {
    width: "40%",
    borderStyle: "solid",
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    height: 40,
    alignItems: "center",
  },
  filter_date_icon: {
    height: 30,
    width: 30,
    position: "absolute",
    left: 0,
    top: 4,
    marginLeft: 6,
    resizeMode: "contain",
  },
  filter_date_input: {
    borderWidth: 0,
    justifyContent: "center",
    marginLeft: 30,
  },
});

export default Styles;
