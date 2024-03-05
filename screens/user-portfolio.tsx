import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Portfolio } from "../types/portfolio";
import { getPortfolio } from "rn-okto-sdk";

const UserPortfolioScreen = () => {
    const [portfolio, setPortfolio] = useState<Portfolio[]>([]);

    useEffect(() => {
        getPortfolio((result, error) => {
            if (result) {
                const portfolio: Portfolio[] = JSON.parse(result);
                setPortfolio(portfolio);
            }
        });
    }, [])

    const renderItem = ({ item }: { item: Portfolio }) => (
        <View style={styles.tokenContainer}>
            <View style={styles.tokenDetails}>
                <Text style={styles.tokenName}>{item.token_name}</Text>
                <Text>{item.quantity}</Text>
            </View>
            <Text style={styles.amount}>₹ {item.amount_in_inr}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>User Portfolio</Text>
            <FlatList
                data={portfolio}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
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
        fontWeight: '700',
        marginBottom: 16,
    },
    tokenContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        marginBottom: 10,
    },
    tokenDetails: {
        flexDirection: 'row',
        gap: 10,
    },
    tokenName: {
        fontWeight: '700',
    },
    amount: {
        fontSize: 18,
        fontWeight: '700',
    },
})

export default UserPortfolioScreen;