import React, { useState } from "react";
import { Element } from "../interface/interface";
import "../styles/Todo.css";
import _ from "lodash";

const Todo = () => {
  const arrTodos: Element[] = [
    { id: 1, name: "Eat", status: "pending" },
    { id: 2, name: "Code", status: "done" },
  ];
  const [todos, setTodo] = useState(_.cloneDeep(arrTodos));

  const _deleteTodo = (id: number) => {
    let bar = window.confirm("Do you want delete this todo");
    if (bar === true) {
      const res = todos.filter((todo) => todo.id !== id);
      setTodo(res);
    }
  };

  const autoIncrementId = (): number => {
    let lastId: number | undefined = _.last(todos)?.id;
    let id;
    if (lastId !== undefined) {
      id = lastId + 1;
    } else {
      id = 1;
    }
    return id;
  };

  const _addNewTodo = () => {
    let foo = prompt("Add new your todo");

    if (foo) {
      setTodo([
        ...todos,
        { id: autoIncrementId(), name: `${foo}`, status: "pending" },
      ]);
    }
  };

  const _editTodo = (id: number) => {
    let foo = prompt("Edit your todo");
    let todo = _.find(todos, { id });
    if (todo && foo) {
      if (todo.name !== null) {
        todo.name = foo;
        setTodo([...todos]);
      }
    }
  };

  const _handleOnchangeStatus = (id: number, e: any) => {
    let todo = _.find(todos, { id });
    if (todo) {
      if (todo.status !== undefined) {
        todo.status = e;
      }
      setTodo([...todos]);
    }
  };

  const _handleSearch = (e: any) => {
    if (e) {
      todos.forEach((t) => {
        if (t.name === e) {
          setTodo([t]);
        }
      });
    } else {
      setTodo(_.cloneDeep(arrTodos));
    }
  };

  return (
    <div className="todo-container">
      <input
        onChange={(e) => _handleSearch(e.target.value)}
        type="text"
        name=""
        id=""
        placeholder="search"
      />
      <button onClick={() => _addNewTodo()} className="button button-add-todo">
        Add new todo
      </button>
      <table>
        <>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {todos.length > 0 ? (
              todos.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td className="container-button">
                    <button
                      onClick={() => _editTodo(item.id)}
                      className="button container-button_edit"
                      disabled={item.status === "done"}
                    >
                      edit
                    </button>
                    <button
                      onClick={() => _deleteTodo(item.id)}
                      className="button container-button_delete"
                    >
                      delete
                    </button>
                  </td>
                  <td>
                    <select
                      style={{ border: "none" }}
                      onChange={(e) =>
                        _handleOnchangeStatus(item.id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="done">Done</option>)
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No result</td>
              </tr>
            )}
          </tbody>
        </>
      </table>
    </div>
  );
};

export default Todo;
