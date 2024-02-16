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
                if(order) setOrder(order);
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text>Order Details</Text>
            {order && <View>
                <Text>Order ID: {order.order_id}</Text>
                <Text>Order Type: {order.order_type}</Text>
                <Text>Order Status: {order.status}</Text>
                <Text>Order Transaction Hash: {order.transaction_hash}</Text>
                <Text>Order Network Name: {order.network_name}</Text>
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

export default OrderDetailsScreen;