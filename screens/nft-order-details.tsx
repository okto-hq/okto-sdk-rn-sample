import { RouteProp } from "@react-navigation/native";
import { View, StyleSheet, Text } from "react-native";
import { RootStackParamList } from "../navigtion";
import { useEffect, useState } from "react";
import { getNFTOrderDetails } from "rn-okto-sdk";
import { NftOrder } from "../types/order";

const NftOrderDetailsScreen = ({ route }: { route: RouteProp<RootStackParamList, "NftOrderDetails"> }) => {
    const { orderId } = route.params;
    const [order, setOrder] = useState<NftOrder | null>(null);

    useEffect(() => {
        getNFTOrderDetails((result, error) => {
            if (result) {
                const orders: NftOrder[] = JSON.parse(result);
                const order = orders.find((order: any) => order.order_id === orderId);
                if(order) setOrder(order);
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text>NFT Order Details</Text>
            {order && <View>
                <Text>Order ID: {order.order_id}</Text>
                <Text>Order NFT ID: {order.nft_id}</Text>
                <Text>Order Type: {order.order_type}</Text>
                <Text>Order Status: {order.status}</Text>
                <Text>Order Entity Type: {order.entity_type}</Text>
                <Text>Order Transaction Hash: {order.tx_hash}</Text>
                <Text>Order Network Name: {order.network_name}</Text>
                <Text>Order Collection Address: {order.collection_address}</Text>
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    }
})

export default NftOrderDetailsScreen;