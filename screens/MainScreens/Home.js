import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Alert, Share } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../config';
import PageContainer from '../../components/PageContainer';
import { CommonActions } from '@react-navigation/native'; // Import CommonActions
import { NavigationActions } from '@react-navigation/native';
import { icons } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from "../../constants/themes";


const Home = (props) => {




  return (
    <PageContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={{
            marginLeft: 15,
            marginRight: 15,
            marginTop: 15
          }}>

            <View style={styles.blocks}>
              <Text style={styles.text}>Quote of the Day</Text>
              <Text style={styles.quote}>Saving lives brings inner peace.</Text>
            </View>



            <View style={styles.blocks}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={icons.requestIconRed} style={{ height: 35, width: 35 }} />
                <Text style={styles.text2}>Create a Request</Text>
              </View>
              <Text style={styles.text3}>Ask for blood in emergency situation.</Text>
              <TouchableOpacity onPress={() => props.navigation.navigate("RequestPage")}>
                <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row' }}>
                  <Text style={{ color: COLORS.primaryRed, fontWeight: 'bold' }}>Request</Text>
                  <Image source={icons.rightArrowRed} style={{ height: 16, width: 14, marginLeft: 5 }} />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.blocks}>
              <View style={{ flexDirection: 'row', paddingBottom: 2 }}>
                <Image source={icons.shareIcon} style={{ height: 35, width: 35 }} />
                <Text style={styles.text2}>Invite Friends</Text>
              </View>
              <Text style={styles.text3}>Inviting People can bring a change, someone in your friends & family would be able to help.</Text>
              <TouchableOpacity>
                <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row' }}>
                  <Text style={{ color: COLORS.primaryRed, fontWeight: 'bold' }}>Invite</Text>
                  <Image source={icons.rightArrowRed} style={{ height: 16, width: 14, marginLeft: 5 }} />
                </View>
              </TouchableOpacity>
            </View>


          </View>



        </View>
      </SafeAreaView>
    </PageContainer>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',


  },
  blocks: {
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    padding: 25,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 15,

  },

  image: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.primaryRed,
    textAlign: 'center',
    paddingBottom: 15
  },
  text2: {
    fontSize: 23,
    fontWeight: 'bold',
    color: COLORS.primaryRed,
    paddingBottom: 3,
    marginLeft: 15
  },
  text3: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
    paddingBottom: 19,
    marginLeft: 51
  },
  quote: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center'
  }
});

export default Home;
