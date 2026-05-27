import { useEffect, useState, createContext} from "react";
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
  Stack,
  Text,
  DialogActionTrigger,
} from "@chakra-ui/react";


interface Todo {
  id: string;
  item: string;
}

const TodosContext = createContext({
  todos: [], fetchTodos: () => {}
})

export default function Todos() {
  const [todos, setTodos] = useState([])
  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8000/todo")
    const todos = await response.json()
    setTodos(todos.data)
  }
  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <TodosContext.Provider value={{todos, fetchTodos}}>
      <Container maxW="container.xl" pt="100px">
        <Stack gap={5}>
          {todos.map((todo: Todo) => (
            <b key={todo.id}>{todo.item}</b>
          ))}
        </Stack>
      </Container>
    </TodosContext.Provider>
  )
}