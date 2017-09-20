import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {BrowserRouter, Route} from 'react-router-dom'

import Toolbar from './toolbar'
import MessageList from './messageList'
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
        <BrowserRouter>
          <div>
            <Route component={Toolbar} />
            <Route path="/compose" component={ComposeMessage}/>
            <Route component={MessageList} />
          </div>
        </BrowserRouter>
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
