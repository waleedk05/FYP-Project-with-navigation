import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from "../../constants/themes";

const About = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>JSF (Jamila Sultana Foundation) is a non-profit organization that was founded in 2004. In December 2005, a blood bank was added to this facility. It is a welfare health division of Global Pharmaceutical, Islamabad, which deals with the treatment and prevention of Thalassemia, a genetically inherited blood disorder. The foundation focuses on providing the best available treatment to ensure a normal quality of life for Thalassemia patients.</Text>

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

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                <Text style={styles.text2}>Developed By:</Text>
                <Text style={styles.text2}>Waleed Ahmed, Sameer Javed, Danyal Fasihi </Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.secondaryWhite,

    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20
    },
    text2: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center'
    }
})
export default About;