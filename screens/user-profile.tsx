import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, Button, FlatList } from "react-native";
import { getUserDetails, getWallets, logout, openOktoBottomsheet } from "rn-okto-sdk";
import { User } from "../types/user";
import { Wallet } from "../types/wallet";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigtion";

const UserProfileScreen = ({ navigation }: { navigation: NavigationProp<RootStackParamList> }) => {
    const [userDetails, setUserDetails] = useState<User | null>(null)
    const [userWallets, setUserWallets] = useState<Wallet[]>([])

    useEffect(() => {
        getUserDetails((result, error) => {
            if (result) {
                const user: User = JSON.parse(result);
                setUserDetails(user);
            }
        })

        getWallets((result, error) => {
            if (result) {
                const wallets = JSON.parse(result);
                console.log(wallets)
                setUserWallets(wallets);
            }
        })
    }, [])

    const handleLogout = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            logout((result, error) => {
                if (result) {
                    navigation.navigate("Login");
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    const renderItem = ({ item }: { item: Wallet }) => (
        <View style={styles.walletContainer}>
            <Text style={styles.networkName}>{item.network_name}</Text>
            <Text style={styles.walletAddress}>{item.address}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                {userDetails && <View>
                    <Text style={{ opacity: 0.5, fontSize: 16 }}>Welcome,</Text>
                    <Text style={{ fontWeight: "600", fontSize: 18 }}>{userDetails.email}</Text>
                </View>}
                <Button
                    title="Logout"
                    onPress={handleLogout}
                    color={'red'}
                />
            </View>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
                <Text style={styles.header}>My Wallets</Text>
                <Pressable onPress={() => openOktoBottomsheet()}>
                    <Text style={{ color: "#468cd1", fontSize: 14 }}>Open Okto Widget</Text>
                </Pressable>
            </View>
            <FlatList
                data={userWallets}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.walletList}
                showsVerticalScrollIndicator={false}
            />
            <View style={{ flex: 1, paddingHorizontal: 25 }}>
                <View style={{ marginBottom: 10 }}>
                    <Button
                        title="Check Portofolio"
                        onPress={() => navigation.navigate("UserPortfolio")}
                    />
                </View>
                <View style={{ gap: 10, flexDirection: 'row', justifyContent: "space-between" }}>
                    <View style={{ alignItems: "center" }}>
                        <Button
                            title="Transfer Token"
                            onPress={() => navigation.navigate("TransferTokens")}
                        />
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Button
                            title="Transfer NFT"
                            onPress={() => navigation.navigate("TransferNFT")}
                        />
                    </View>
                </View>
                <View style={{ alignItems: "center", marginTop: 15 }}>
                    <Pressable onPress={() => navigation.navigate("SupportedChains")}>
                        <Text style={{ color: "#008AE6" }}>Check Supported Chains</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingTop: 8
    },
    header: {
        fontSize: 18,
        fontWeight: '700',
    },
    walletList: {
        marginTop: 10,
        flex: 1
    },
    walletContainer: {
        marginVertical: 5,
        padding: 5,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    networkName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    walletAddress: {
        fontSize: 12,
        color: '#555',
    },
})

export default UserProfileScreen;