import React from 'react';
import { Row, Col } from 'antd';
import { Draggable, Droppable } from 'react-drag-and-drop';

import './index.css';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardTitle: '', addNew: false
    }
  }
  onDrop(data) {
    console.log(data)
  }
  render() {
    return (
      <div className="card">
        <div>{this.props.card.title}</div>
        <Droppable types={['fruit']} onDrop={this.onDrop.bind(this)}>
          <ul>
            <Draggable type="fruit" data="banana"><li>Banana</li></Draggable>
          </ul>
        </Droppable>
      </div>
    )
  }
}

export default Card;