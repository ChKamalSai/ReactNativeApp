import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    Pressable,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    KeyboardAvoidingView,
    useWindowDimensions,
    ActivityIndicator
} from "react-native"
import styles from "./FormStyles"

// const windowWidth=useWindowDimensions().width;
// const windowHeight=useWindowDimensions().height;
export default function DonationLogin({ navigation }) {
    const [emailID, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [result, setResult] = useState("")
    const [isloading, setIsLoading] = useState(false);
    const validateForm = () => {
        let errors = {}
        if (!emailID) errors.emailID = "UserName is empty"
        if (!password) errors.password = "Password is empty"
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const fetchResult = async () => {
        try {
            setIsLoading(true)
            const request = await fetch("http://192.168.31.78:9090/donation/login/", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    emailID: emailID,
                    password: password
                })
            })
            const response = await request.json();
            setIsLoading(false)
            setResult(response)
        } catch (error) {
            console.error(error)
        }
    }
    const handleSubmit = () => {
        if (validateForm()) {
            console.log("form is valid-", emailID, password);
            setUserName("")
            setPassword("")
            setErrors({})
            fetchResult()
        }
    }
    if (isloading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="black"></ActivityIndicator>
            </SafeAreaView>
        );
    }

    return (
        // <SafeAreaView style={styles.container} >
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.form}>
                    <Text style={[styles.label]}>EmailID</Text>
                    <TextInput style={[styles.input]} value={emailID} placeholder="Enter your user name" onChangeText={setUserName}></TextInput>
                    {errors.emailID ? (<Text style={styles.errorText}>{errors.emailID}</Text>) : null}
                    <Text style={[styles.label]}>Password</Text>
                    <TextInput style={[styles.input]} value={password} placeholder="Enter your password" onChangeText={setPassword} secureTextEntry></TextInput>
                    {errors.password ? (<Text style={styles.errorText}>{errors.password}</Text>) : null}
                    <Pressable style={styles.button} onPress={() => { handleSubmit() }}>
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>
                    {result ? (<Text style={styles.errorText}>{JSON.stringify(result)}</Text>) : null}
                    <Pressable style={styles.register} onPress={() => { navigation.navigate("Registration") }} >
                        <Text style={styles.registerText}>if not registered? Sign-up</Text>
                    </Pressable>
                    {/* <Button style={styles.button} title="Login" /> */}
                </View>
            </KeyboardAvoidingView>
        // </SafeAreaView>
    );
}

