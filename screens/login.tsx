import { View, Image, Text, StyleSheet } from "react-native";
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useEffect, useState } from "react";
import { authenticate, setTheme } from "rn-okto-sdk";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigtion";

// setTheme("#FF0000", "#FFFF00", "", "", "", "", "", "", "#000000");

const LoginScreen = ({ navigation }: { navigation: NavigationProp<RootStackParamList> }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ["email"],
            offlineAccess: true,
            webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID!,
        });
    }, [])

    const handleSignIn = async () => {
        try {
            setIsLoading(true);
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const { idToken } = userInfo;
            if (idToken) {
                authenticate(idToken, (result, error) => {
                    console.log(result);
                    console.log(error);
                    if(error){
                        setIsLoading(false);
                        return;
                    }
                    if(result){
                        setIsLoading(false);
                        navigation.navigate("UserProfile");
                    }
                })
            }
            else{
                setIsLoading(false);
            }
        } catch (error) {
            console.log("GAuth Error",error);
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                <Text>Welcome to</Text>
                <Image
                    source={require('../assets/okto.png')}
                    style={{ width: 200, height: 100 }}
                    resizeMode="contain"
                />
            </View>
            <View style={{ flex: 1 }}>
                {isLoading?
                    <View>
                        <Text>Trying to login...</Text>
                    </View>
                    :<GoogleSigninButton onPress={handleSignIn} />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default LoginScreen;