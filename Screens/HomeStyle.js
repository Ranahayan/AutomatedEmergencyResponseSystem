import { StyleSheet } from "react-native";
import colors from "../Colors/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loaderStyle: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  drawer: { shadowColor: "#000000", shadowOpacity: 0.8, shadowRadius: 3 },
  map: {
    width: "100%",
    height: "100%",
  },
  drawerIcon: { position: "absolute", left: 15, top: 10, zIndex: 2 },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center",
  },
  userPic: {
    marginTop: 20,
    height: hp("20%"),
    width: wp("38%"),
  },
  profileForm: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
  },
  parentIndividulFeild: { marginBottom: 25 },
  profileInputs: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  inputFields: {
    flexDirection: "row",
    alignItems: "center",
    width: wp("60%"),
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 8,
    flexWrap: "wrap",
  },
  inputPlaceholder: {
    fontSize: 18,
    color: "black",
    width: wp("50%"),
  },
  errorText: {
    color: "red",
    marginLeft: 10,
    width: wp("60%"),
    flexWrap: "wrap",
  },
  buttons: {
    flexDirection: "row",
    width: wp("100%"),
    justifyContent: "flex-end",
    marginVertical: 30,
  },
  appButtonCancel: {
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderColor: colors.grey,
    borderWidth: 2,
    marginRight: 15,
  },
  appButtonSave: {
    backgroundColor: "#0165FF",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 10,
    borderRadius: 30,
  },
  appInButtonCancel: {
    fontSize: 18,
    color: colors.grey,
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  appInButtonSave: {
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  icon: {
    width: wp("7%"),
  },
  drawerBack: {
    flexDirection: "row",
    width: wp("65%"),
    paddingTop: 10,
  },
  modalBackground: {
    backgroundColor: "#000000aa",
    flex: 1,
    flexDirection: "column",
  },
  warningModalBody: {
    backgroundColor: "#ffff",
    margin: 50,
    marginTop: 250,
    height: hp("30%"),
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  warningModalDimension: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: hp("28%"),
  },
  warningModalTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: wp("70%"),
  },
  warnigHeading: {
    fontWeight: "bold",
    fontSize: 25,
    color: "red",
  },
  warningMessageStyle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  warningModalTimer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelWarningButton: {
    backgroundColor: "#0165FF",
    width: wp("76%"),
    height: hp("8%"),
    borderRadius: 8,
  },
  confirmModalBody: {
    backgroundColor: "#ffff",
    margin: 50,
    marginTop: 250,
    height: 190,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  confirmModalDimension: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: hp("20%"),
  },
  confirmButtonBackgroud: {
    backgroundColor: "#0165FF",
    width: wp("76%"),
    height: hp("8%"),
    borderRadius: 10,
    marginTop: -350,
  },
  popButtons: {
    color: "white",
    textAlign: "center",
    lineHeight: hp("8%"),
    
  },
});

export default styles;
