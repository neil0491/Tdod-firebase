import React from "react";
import {
  ListItem,
  ListItemText,
  Button,
  makeStyles,
  Modal,
} from "@material-ui/core";
import db from "./firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const { id, todo, date } = props.todo;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState(todo);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const updateText = () => {
    db.collection("todos").doc(id).set(
      {
        todo: input,
      },
      { merge: true }
    );

    handleClose();
  };

  const body = (
    <div className={classes.paper}>
      <h2>Редактировать</h2>
      <p>{input}</p>
      <input value={input} onChange={(event) => setInput(event.target.value)} />
      <button onClick={updateText}>Исправить</button>
      <button onClick={handleClose}>Отменить</button>
    </div>
  );

  if (!date) {
   return <h3>Loading...</h3>;
  }
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
      <ListItem style={{ textAlign: "center" }}>
        <ListItemText
          primary={todo}
          secondary={`Дата публикации: ${new Date(
            date.toDate()
          ).toLocaleDateString()} - ${new Date(date.toDate()).toLocaleTimeString()}`}
        />
        <Button
          color="secondary"
          variant="contained"
          onClick={() => props.removeTodo(id)}
        >
          Удалить
        </Button>
        <Button variant="outlined" color="primary" onClick={handleOpen}>
          Редактировать
        </Button>
      </ListItem>
    </>
  );
}

export default Todo;
