import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import fs from 'fs';
import Dexie from 'dexie';
// import history from './history'
import Home from './components/Home/index'

import './App.css';

export const db = new Dexie('TrelloDB');
db.version(1).stores({ todos: '++id, title, status' });
var text = fs.readFileSync("./mytext.txt");
var textByLine = text.split("\n")
console.log(textByLine)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [], currTodo: ''
    }
  }
  componentDidMount() {
    db.table('todos')
      .toArray()
      .then((todos) => {
        this.setState({ todos });
      });
  }
  handleChange = (e) => {
    let name = e.target.name;
    this.setState({ [name]: e.target.value });
  }
  handleSubmit = () => {
    let todo = { title: this.state.currTodo, status: false };
    db.table('todos')
      .add(todo)
      .then((id) => {
        const newList = [...this.state.todos, Object.assign({}, todo, { id })];
        this.setState({ todos: newList });
      });
    this.setState({ currTodo: '' });
  }
  handleVisibility = (id, status) => {
    db.table('todos')
      .update(id, { status: !status })
      .then(() => {
        const todoToUpdate = this.state.todos.find((todo) => todo.id === id);
        const newList = [
          ...this.state.todos.filter((todo) => todo.id !== id),
          Object.assign({}, todoToUpdate, { status: !status })
        ];
        this.setState({ todos: newList });
      });
  }
  render() {
    return (
      <div className="App">
        <Home />
        {this.state.todos.filter(obj => !obj.status).map((obj, index) =>
          <div onClick={() => this.handleVisibility(obj.id, obj.status)} key={index}>
            {obj.title}
          </div>)}
          <hr/>
        {this.state.todos.filter(obj => obj.status).map((obj, index) =>
          <div style={{textDecoration:"line-through"}} onClick={() => this.handleVisibility(obj.id, obj.status)} key={index}>
            {obj.title}
          </div>)}
        <input value={this.state.currTodo} onChange={this.handleChange} name="currTodo" />
        <button onClick={this.handleSubmit}>submit</button>
      </div>
    );
  }
}

export default App;
