import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Button } from "react-native";
import { getPortfolio, getSupportedNetworks, getSupportedTokens, transferFunds } from "rn-okto-sdk";
import { Network } from "../types/network";
import DropDownPicker from "react-native-dropdown-picker";
import { Token } from "../types/token";
import { ResultOrder } from "../types/order";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigtion";

const TransferTokensScreen = ({ navigation }: { navigation: NavigationProp<RootStackParamList> }) => {
    const [networkName, setNetworkName] = useState("APTOS_TESTNET");
    const [tokenAddress, setTokenAddress] = useState<string>("0x1::aptos_coin::AptosCoin");
    const [quantity, setQuantity] = useState("1");
    // My Wallet Address: 0x46e5fb2f9af287a5bcd9756ff35494c41b7371446da3daf98e1f1de58331c55f
    const [recipientAddress, setRecipientAddress] = useState("0x6b244684313dd6a9fc75c8e76cb648d407374d59970583dd990c686cda767984");

    const [openNetwork, setOpenNetwork] = useState(false);
    const [networkOptions, setNetworkOptions] = useState<Network[]>([])

    const [openToken, setOpenToken] = useState(false);
    const [tokenOptions, setTokenOptions] = useState<string[]>([])

    useEffect(() => {
        getSupportedNetworks((result, error) => {
            if (result) {
                const networks: Network[] = JSON.parse(result);
                setNetworkOptions(networks)
            }
        })

        getSupportedTokens((result, error) => {
            if (result) {
                const tokens: Token[] = JSON.parse(result);
                setTokenOptions(tokens.map((token) => token.token_address))
            }
        });
    }, [])

    const handleSubmit = () => {
        transferFunds(
            networkName,
            tokenAddress,
            recipientAddress,
            quantity,
            (result, error) => {
                console.log(result);
                console.log(error);
                if(result){
                    const order: ResultOrder = JSON.parse(result);
                    navigation.navigate("OrderDetails", { orderId: order.data.order_id });
                }
            }
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Transfer Tokens</Text>
            <DropDownPicker
                open={openNetwork}
                value={networkName}
                items={networkOptions.map((network) => ({
                    label: network.network_name,
                    value: network.network_name,
                }))}
                setOpen={setOpenNetwork}
                setValue={setNetworkName}
                setItems={setNetworkOptions}
                placeholder="Select Network"
                style={styles.dropdown}
            />
            
            <DropDownPicker
                open={openToken}
                value={tokenAddress}
                items={tokenOptions.map((token) => ({
                    label: token,
                    value: token,
                }))}
                setOpen={setOpenToken}
                setValue={setTokenAddress}
                setItems={setTokenOptions}
                placeholder="Select Token"
                style={styles.dropdown}
            />

            <TextInput
                value={quantity}
                onChangeText={(value) => setQuantity(value)}
                placeholder="Enter Quantity"
                keyboardType="numeric"
                style={styles.input}
            />

            <TextInput
                value={recipientAddress}
                onChangeText={(value) => setRecipientAddress(value)}
                placeholder="Enter Recipient Address"
                style={styles.input}
            />

            <Button
                title="Transfer Token"
                onPress={handleSubmit}
            />
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
        fontWeight: "700",
        marginBottom: 16,
    },
    dropdown: {
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
    },
})

export default TransferTokensScreen;