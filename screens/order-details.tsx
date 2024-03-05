import { RouteProp } from "@react-navigation/native";
import { View, StyleSheet, Text } from "react-native";
import { RootStackParamList } from "../navigtion";
import { useEffect, useState } from "react";
import { orderHistory } from "rn-okto-sdk";
import { Order } from "../types/order";

const OrderDetailsScreen = ({ route }: { route: RouteProp<RootStackParamList, "OrderDetails"> }) => {
    const { orderId } = route.params;
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        orderHistory((result, error) => {
            if (result) {
                const orders: Order[] = JSON.parse(result);
                const order = orders.find((order: any) => order.order_id === orderId);
                if (order) setOrder(order);
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Order Details</Text>
            {order && (
                <View style={styles.orderDetailsContainer}>
                    <Text style={styles.detailText}>Order ID: {order.order_id}</Text>
                    <Text style={styles.detailText}>Order Type: {order.order_type}</Text>
                    <Text style={styles.detailText}>Order Status: {order.status}</Text>
                    <Text style={styles.detailText}>Order Transaction Hash: {order.transaction_hash}</Text>
                    <Text style={styles.detailText}>Order Network Name: {order.network_name}</Text>
                </View>
            )}
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
        marginBottom: 16,
    },
    orderDetailsContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    detailText: {
        fontSize: 14,
        marginBottom: 8,
    }
})

export default OrderDetailsScreen;