import React from 'react';
import { Row, Col } from 'antd';
import { Draggable, Droppable } from 'react-drag-and-drop';

import Topbar from '../Topbar';
import Card from '../Card'
import { db } from '../../App';
import './index.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardTitle: '', addNew: false
    }
  }
  toggleAddNewCard = () => {
    this.setState({ addNew: !this.state.addNew })
  }
  handleChange = (e) => {
    let name = e.target.name;
    this.setState({ [name]: e.target.value });
  }
  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      // this.props.handleAddCard(this.state.cardTitle);
      let card = { title: this.state.cardTitle };
      db.table('cards')
        .add(card)
        .then((id) => {
          this.props.handleAddCard(card, id);
        });
      this.setState({ cardTitle: '', addNew: false })
    }
  }
  onDrop(data) {
    console.log(data)
    // => banana 
  }
  render() {
    return (
      <div>
        <Topbar />
        <div className="card-wrapper">
          {this.props.cards && this.props.cards.map((obj, index) => <Card key={index} card={obj}/>)}
          
          <div className="card add-card draggable">
            <input onChange={this.handleChange} value={this.state.cardTitle} onKeyDown={this.handleKeyDown} name="cardTitle" style={{ display: this.state.addNew ? 'block' : 'none' }} />
            <span onClick={this.toggleAddNewCard} style={{ display: this.state.addNew ? 'none' : 'block' }}>+</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;