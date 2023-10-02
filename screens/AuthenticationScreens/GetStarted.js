import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import images from "../../constants/images";
import { COLORS, FONTS, SIZES } from "../../constants/themes";
import Button from "../../components/Button";
import PageContainer from "../../components/PageContainer";
import { AdminDashboard } from "../AdminScreens";
const GetStarted = () => {

  const navigation = useNavigation(); // Add this line to get the navigation prop

  const handleButtonPress = () => {
    // When button is pressed
    navigation.navigate("Signin");
  };
  const handleButtonPress2 = () => {
    // When button is pressed
    navigation.navigate("AdminDashboard");
  };

  return (
    <PageContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle={Platform.select({
            ios: "dark-content",
            android: "light-content",
          })}
          backgroundColor={Platform.select({
            ios: "white",
            android: "black",
          })}
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={styles.topContainer}>
            <Image source={images.topDesign} style={styles.top} />
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 1,
            }}
          >
            <Image
              source={images.logo}
              style={{ marginHorizontal: 70 }}
            ></Image>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 50,
              alignSelf: "center",
            }}
          >
            <Text style={{ ...FONTS.title, color: COLORS.primaryRed }}>
              Donate
            </Text>
            <Text style={{ ...FONTS.title, color: COLORS.black }}> Blood,</Text>
            <Text style={{ ...FONTS.title, color: COLORS.primaryRed }}>
              {" "}
              Save
            </Text>
            <Text style={{ ...FONTS.title, color: COLORS.black }}> Lives</Text>
          </View>

          <View>
            <Button title="Get Started" onPress={handleButtonPress} />
          </View>
          <View>
            <Button title="To Admin" onPress={handleButtonPress2} />
          </View>

          <View style={styles.bottomContainer}>
            <Image source={images.bottomDesign} style={styles.bottom} />
          </View>

        </View>
      </SafeAreaView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  bottomContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  top: {
    height: 150,
    width: 150,
    resizeMode: "contain",
    marginLeft: -8,
  },
  bottom: {
    height: 150,
    width: 150,
    resizeMode: "contain",
    marginRight: -8,
  },
});
export default GetStarted;
