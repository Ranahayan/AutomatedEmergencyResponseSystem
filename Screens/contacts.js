import React, {
  useEffect,
  memo,
  useContext,
  useState,
  useCallback,
} from "react";
import colors from "../Colors/colors";
import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Data } from "../Context_api/Context";
import axios from "axios";
import { IP_ADDRESS } from "@env";
import { useFocusEffect } from "@react-navigation/native";

const Contact = ({ navigation, searchContactFlag, searchQuery }) => {
  const { account } = useContext(Data);
  const [contacts, setContacts] = useState([]);
  const getContacts = async () => {
    try {
      let response = await axios.get(
        `http://192.168.150.158:8080/contact/${account._id}`
      );
      setContacts(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    handleSearchContact(searchQuery);
  }, [searchQuery]);
  useEffect(() => {
    getContacts();
  }, []);

  useFocusEffect(() => {
    getContacts();
  });
  const handleSearchContact = (val) => {
    console.log("val: ", val);
    // const newContact = JSON.parse(contacts);
    const newContact = [...contacts];
    const filterdContacts = newContact.filter((contact) => {
      contact.name.toLocaleLowerCase().includes(val.toLocaleLowerCase());
    });
    console.log("filterdContacts are: ", filterdContacts);
    setContacts(filterdContacts);
  };

  const renderContact = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Individual Contact", { constactId: item._id });
      }}
    >
      <View style={styles.inputFields}>
        <View style={styles.nameInitial}>
          <Text style={styles.nameInitialText}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <TextInput
          placeholder="Name"
          style={styles.inputPlaceholder}
          value={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          editable={false}
        />
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      {!searchContactFlag && (
        <Image
          style={styles.userPic}
          source={require("../assets/add-user.png")}
        />
      )}
      {contacts.length !== 0 ? (
        <View style={styles.profileForm}>
          <View style={styles.profileInputs}>
            <FlatList
              data={contacts}
              showsVerticalScrollIndicator={false}
              renderItem={renderContact}
            />
          </View>
        </View>
      ) : (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>No results found</Text>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    // justifyContent: "center",
  },
  userPic: {
    height: hp("20%"),
    width: wp("38%"),
  },
  profileForm: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10%",
  },
  profileInputs: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  inputFields: {
    flexDirection: "row",
    alignItems: "center",
    width: wp("80%"),
    height: hp("8%"),
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  inputPlaceholder: {
    fontSize: 20,
    marginLeft: 5,
    color: "#000000",
    marginLeft: 10,
    fontWeight: "500",
  },
  nameInitial: {
    width: 42,
    height: 42,
    borderRadius: 42 / 2,
    borderWidth: 1,
    borderColor: "grey",
    justifyContent: "center",
    marginLeft: 10,
  },
  nameInitialText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    color: "#000000",
  },
  noResults: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noResultsText: {
    fontSize: 18,
  },
});

export default memo(Contact);
