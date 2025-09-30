import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { SearchBar } from "react-native-screens";
import { TextInput } from "react-native";
import Checkbox from "expo-checkbox";
import KeyboardAvoidngView from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
type ToDoType = {
  id: number;
  title: string;
  isDone: boolean;
};
export default function Index() {
  const todoData = [
    {
      id: 1,
      title: "Todo 1",
      isDone: false,
    },
    {
      id: 2,
      title: "Todo 2",
      isDone: true,
    },
    {
      id: 3,
      title: "Todo 3",
      isDone: false,
    },
    {
      id: 4,
      title: "Todo 4",
      isDone: false,
    },
    {
      id: 5,
      title: "Todo 5",
      isDone: true,
    },
    {
      id: 6,
      title: "Todo 6",
      isDone: false,
    },
  ];
  const [todos, setTodos] = useState<ToDoType[]>(todoData);
  const [todoText, setTodoText] = useState<string>("");

  const addTodo = async () => {
    try {
      const newTodo = {
        id: Math.random(),
        title: todoText,
        isDone: false,
      };
      todos.push(newTodo);
      setTodos(todos);
      await AsyncStorage.setItem("my-todo", JSON.stringify(todos));
      setTodoText("");
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            alert("Clicked!");
          }}
        >
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={{ height: 40, width: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.SearchBar}>
        <Ionicons name="search" size={24} color={"#333"} />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          clearButtonMode="always"
        />
      </View>
      <FlatList
        data={[...todos].reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ToDoItem todo={item} />}
      />
      <KeyboardAvoidingView
        style={styles.footer}
        behavior="padding"
        keyboardVerticalOffset={10}
      >
        <TextInput
          placeholder="Add a new todo"
          value={todoText}
          onChangeText={(text) => setTodoText(text)}
          style={styles.newTodoInput}
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => addTodo()}>
          <Ionicons name="add" size={34} color={"#fff"} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const ToDoItem = ({ todo }: { todo: ToDoType }) => {
  return (
    <View style={styles.todoContainer}>
      <View style={styles.todoContainer}>
        <Checkbox
          value={todo.isDone}
          color={todo.isDone ? "#4630EB" : undefined}
        />
        <Text
          style={[
            styles.todoText,
            todo.isDone && { textDecorationLine: "line-through" },
          ]}
        >
          {todo.title}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          alert("Deleted!" + todo.id);
        }}
      ></TouchableOpacity>
      <Ionicons name="trash" size={24} color="red" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#FFDAB9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  SearchBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    gap: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  todoInfoContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  todoText: {
    fontSize: 16,
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  newTodoInput: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
  },

  addButton: {
    backgroundColor: "#4630EB",
    padding: 8,
    borderRadius: 10,
    marginLeft: 10,
  },
});
