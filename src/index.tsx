import React from "react"
import { StyleSheet, Text, View } from "react-native"


export function App() {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>
                Olá, mundo!
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 15
    }
})
