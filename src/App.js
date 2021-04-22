import "./App.css";
import React, { useEffect, useState } from "react";
import { Button, List, makeStyles, TextField } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";
import ErrorBoundary from "./ErrorBoundary";

const useStyles = makeStyles(() => ({
  root: {
    margin: "3rem auto",
    width: "80%",
    display: "flex",
    flexDirection: "column",
  },
  form: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
  },
}));

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            date: doc.data().timestamp,
          }))
        );
      });
    setLoading(false);
  }, []);
  const addTodo = (event) => {
    event.preventDefault();
    db.collection("todos")
      .add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => console.log('Дата', docRef));
    setTodos((todos) => [...todos, input]);
    setInput("");
  };

  const removeTodo = (id) => {
    db.collection("todos")
      .doc(id)
      .delete()
      .then((docRef) => console.log("Document successfully deleted!", docRef))
      .catch((err) => console.error("Error removing document: ", err));
  };
  return (
    <div className="App">
      <h1>Здравствуйте! Добро пожаловать в приложение TODO FIREBASE</h1>
      <form className={classes.form}>
        <TextField
          label="Write a TODO"
          value={input}
          color="primary"
          onChange={(event) => setInput(event.target.value)}
        />
        <Button
          type="submit"
          disabled={!input.trim()}
          variant="contained"
          color="primary"
          onClick={addTodo}
        >
          Добавить задачу
        </Button>
      </form>
      <ErrorBoundary>
        {!loading ? (
          <List className={classes.root}>
            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} removeTodo={removeTodo} />
            ))}
          </List>
        ) : (
          <h3>Загрузка . . .</h3>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default App;
