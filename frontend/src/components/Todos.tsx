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
  Stack,
  Text,
  DialogActionTrigger,
} from "@chakra-ui/react";


interface Todo {
  id: string;
  item: string;
}

interface UpdateTodoProps {
  item: string;
  id: string;
  fetchTodos: () => Promise<void>;
}

const TodosContext = createContext({
  todos: [] as Todo[],
  fetchTodos: async () => {}
})

function AddTodo() {
  const [item, setItem] = useState("")
  const {todos, fetchTodos} = useContext(TodosContext)

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setItem(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newTodo = {
      "id": todos.length + 1,
      "item": item
    }

    fetch("http://localhost:8000/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo)
    }).then(fetchTodos)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        pr="4.5rem"
        type="text"
        placeholder="Add a todo item"
        aria-label="Add a todo item"
        onChange={handleInput}
      />
    </form>
  )
}

const UpdateTodo = ({ item, id, fetchTodos }: UpdateTodoProps) => {
  const [todo, setTodo] = useState(item)

  const updateTodo = async () => {
    await fetch(`http://localhost:8000/todo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: todo }),
    })
    await fetchTodos()
  }

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button h="1.5rem" size="sm">
          Update Todo
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
          <DialogTitle>Update Todo</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Input
            pr="4.5rem"
            type="text"
            placeholder="Update todo item"
            aria-label="Update todo item"
            value={todo}
            onChange={(event) => setTodo(event.target.value)}
          />
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" size="sm">Cancel</Button>
          </DialogActionTrigger>
          <Button size="sm" onClick={updateTodo}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

function TodoHelper({ item, id, fetchTodos }: UpdateTodoProps) {
  return (
    <Box p={1} shadow="sm">
      <Flex justify="space-between" align="center">
        <Text as="div">{item}</Text>
        <UpdateTodo item={item} id={id} fetchTodos={fetchTodos} />
      </Flex>
    </Box>
  )
}

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([])
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
      <AddTodo />  {/* new */}
        <Stack gap={5}>
          {todos.map((todo: Todo) => (
            <TodoHelper key={todo.id} item={todo.item} id={todo.id} fetchTodos={fetchTodos} />
          ))}
        </Stack>
      </Container>
    </TodosContext.Provider>
  )
}

