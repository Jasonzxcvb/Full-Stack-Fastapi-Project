import { useEffect, useState, createContext, useContext, type ChangeEvent, type FormEvent } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  HStack,
  Stack,
  Text,
  DialogActionTrigger,
} from "@chakra-ui/react";


interface Order {
  id: number;
  product_name: string;
  quantity: number;
  status: string;
  created_at: string;
}

interface UpdateOrderStatusProps {
  id: number;
  status: string;
  fetchOrders: () => Promise<void>;
}

interface DeleteOrderProps {
  id: number;
  fetchOrders: () => Promise<void>;
}

interface OrderHelperProps {
  order: Order;
  fetchOrders: () => Promise<void>;
}

const OrdersContext = createContext({
  orders: [] as Order[],
  fetchOrders: async () => {},
});

const AddOrder = () => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const { fetchOrders } = useContext(OrdersContext);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetch("http://localhost:8000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: productName,
        quantity: Number(quantity),
        status: "pending",
      }),
    });
    await fetchOrders();
    setProductName("");
    setQuantity("1");
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack>
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Product name"
          aria-label="Product name"
          value={productName}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setProductName(event.target.value)}
        />
        <Input
          w="130px"
          type="number"
          min={1}
          placeholder="Quantity"
          aria-label="Quantity"
          value={quantity}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setQuantity(event.target.value)}
        />
        <Button type="submit">Add Order</Button>
      </HStack>
    </form>
  );
};

const UpdateOrderStatus = ({ id, status, fetchOrders }: UpdateOrderStatusProps) => {
  const [nextStatus, setNextStatus] = useState(status);

  const updateStatus = async () => {
    await fetch(`http://localhost:8000/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    await fetchOrders();
  };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button h="1.5rem" size="sm">
          Update Status
        </Button>
      </DialogTrigger>
      <DialogContent
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bg="white"
        p={6}
        rounded="md"
        shadow="xl"
        maxW="md"
        w="90%"
        zIndex={1000}
      >
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Input
            pr="4.5rem"
            type="text"
            placeholder="pending / shipped / completed"
            aria-label="Update order status"
            value={nextStatus}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setNextStatus(event.target.value)}
          />
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" size="sm">Cancel</Button>
          </DialogActionTrigger>
          <Button size="sm" onClick={updateStatus}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

const DeleteOrder = ({ id, fetchOrders }: DeleteOrderProps) => {
  const deleteOrder = async () => {
    await fetch(`http://localhost:8000/orders/${id}`, {
      method: "DELETE",
    });
    await fetchOrders();
  };

  return (
    <Button h="1.5rem" size="sm" marginLeft={2} onClick={deleteOrder}>Delete Order</Button>
  );
};

function OrderHelper({ order, fetchOrders }: OrderHelperProps) {
  return (
    <Box p={2} shadow="sm">
      <Flex justify="space-between" align="center">
        <Text mt={2} as="div">
          #{order.id} {order.product_name} x {order.quantity} - {order.status}
        </Text>
        <Flex align="end">
          <UpdateOrderStatus id={order.id} status={order.status} fetchOrders={fetchOrders} />
          <DeleteOrder id={order.id} fetchOrders={fetchOrders} />
        </Flex>
      </Flex>
    </Box>
  );
}

export default function Todos() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const response = await fetch("http://localhost:8000/orders");
    const data = await response.json();
    setOrders(data.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrdersContext.Provider value={{ orders, fetchOrders }}>
      <Container maxW="container.xl" pt="100px">
        <AddOrder />
        <Stack gap={5}>
          {orders.map((order: Order) => (
            <OrderHelper key={order.id} order={order} fetchOrders={fetchOrders} />
          ))}
        </Stack>
      </Container>
    </OrdersContext.Provider>
  );
}

