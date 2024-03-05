import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Network } from "../types/network";
import { getSupportedNetworks, getSupportedTokens } from "rn-okto-sdk";
import { Token } from "../types/token";

const SupportedChainScreen = () => {
    const [networks, setNetworks] = useState<Network[]>([])
    const [tokens, setTokens] = useState<Token[]>([])

    useEffect(() => {
        getSupportedNetworks((result, error) => {
            if (result) {
                const networks: Network[] = JSON.parse(result);
                setNetworks(networks)
            }
        })

        getSupportedTokens((result, error) => {
            if (result) {
                const tokens: Token[] = JSON.parse(result);
                setTokens(tokens)
            }
        })
    }, [])

    const renderNetworkItem = ({ item }: { item: Network }) => (
        <View style={styles.card}>
            <Text style={styles.cardText}>{item.network_name}</Text>
        </View>
    );

    const renderTokenItem = ({ item }: { item: Token }) => (
        <View style={styles.card}>
            <Text style={styles.cardText}>{item.token_name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Supported Networks</Text>
            <FlatList
                data={networks}
                numColumns={2}
                keyExtractor={(item) => item.chain_id}
                renderItem={renderNetworkItem}
                showsVerticalScrollIndicator={false}
                />

            <Text style={styles.header}>Supported Tokens</Text>
            <FlatList
                data={tokens}
                numColumns={2}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderTokenItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingTop: 8
    },
    header: {
        fontSize: 18,
        fontWeight: "700",
    },
    card: {
        backgroundColor: "#e0e0e0",
        borderRadius: 8,
        padding: 16,
        flex: 1,
        margin: 10,
    },
    cardText: {
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default SupportedChainScreen;