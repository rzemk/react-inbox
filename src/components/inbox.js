import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Toolbar from './Toolbar'
import MessageList from './MessageList'
import ComposeMessage from './ComposeMessage'

class Inbox extends React.Component {

  setFieldForSelected = (field, value) => {
    let body = {
      messageIds: [],
      command: field
    }
    body[field] = value
    let messages = this.state.messages.map(message => {
      if (message.selected) {
        body.messageIds.push(message.id)
        message[field] = value;
      }
      return message;
    });

    this.updateServer(body)

    this.setState({messages});
  }

  render() {
    return (
      <div>
        <Toolbar />
        { this.props.showComposeMessage && <ComposeMessage /> }
        <MessageList />
      </div>
    )
  }
}

const mapStateToProps = state => ({
    showComposeMessage: state.messages.composeMessage,
    someValue: state.messages.someValue
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Inbox)
