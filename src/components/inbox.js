import React from 'react'

import Toolbar from './Toolbar'
import MessageList from './MessageList'

import { seedMessages } from '../data/messages'

export default class Inbox extends React.Component {

  componentWillMount() {
    let labels;
    let messages = seedMessages.map(message => {
      labels = {}
      message.labels.map(label => {
        labels[label] = true
        return null
      })
      message.labels = labels;
      return message;
    })
    this.setState({messages})
  }

  setFieldForAll = (field, value) => {
    let messages = this.state.messages.map(message => {
        message[field] = value;
      return message;
    });

    this.setState({messages});
  }

  setFieldForSelected = (field, value) => {
    let messages = this.state.messages.map(message => {
      if (message.selected) {
        message[field] = value;
      }
      return message;
    });

    this.setState({messages});
  }

  setFieldForId = (field, value, id) => {
    let messages = this.state.messages.map(message => {
      if (message.id === id) {
        message[field] = value;
      }
      return message;
    });

    this.setState({messages});
  }

  setLabelForSelected = (field, value) => {
    let messages = this.state.messages.map(message => {
      if (message.selected) {
        message.labels[field] = value;
      }
      return message;
    });

    this.setState({messages});
  }

  render() {
    return (
      <div>
        <Toolbar
          messages={ this.state.messages }
          setFieldForSelected={this.setFieldForSelected}
          setFieldForAll={this.setFieldForAll}
          setLabelForSelected={this.setLabelForSelected}
        />
        <MessageList messages={ this.state.messages } setFieldForId={this.setFieldForId}/>
      </div>
    )
  }
}
