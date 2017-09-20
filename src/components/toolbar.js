import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createMessage, updateMessage, toggleComposeMessage } from '../actions'

class Toolbar extends React.Component {
  propTypes: {
    messages: React.PropTypes.array.isRequired
  }

  selectAll = (value) => {
    let stateMessages = {}
    this.props.messages.map(message => {
      if(!message.delete) {
        message.selected = value;
        stateMessages[message.id] = Object.assign({}, message)
      }
      return message;
    });
    this.props.updateMessage(null, stateMessages, false)
  }

  deleteSelected = () => {
    this.setFieldForSelected('delete', true)
  }

  markAsRead = () => {
    this.setFieldForSelected('read', true)
  }

  markAsUnread = () => {
    this.setFieldForSelected('read', false)
  }

  setFieldForSelected = (field, value) => {
    let body = {
      messageIds: [],
      command: field
    }
    body[field] = value
    let stateMessages = {}
    this.props.messages.map(message => {
      if (message.selected && !message.delete) {
        body.messageIds.push(message.id)
        message[field] = value;
        stateMessages[message.id] = Object.assign({}, message)
      }
      return message;
    });

    this.props.updateMessage(body, stateMessages, true)
  }

  setLabel = (type, value) => {
    const label = type.value

    let messageIds = []
    let stateMessages = {}
    this.props.messages.map(message => {
      if (message.selected && !message.delete) {
        messageIds.push(message.id)
        message.labels[label] = value
        stateMessages[message.id] = Object.assign({}, message)
      }
      return message;
    });

    const command = value ? 'addLabel' : 'removeLabel'

    this.props.updateMessage({messageIds, command, label}, stateMessages, true)
    type.selectedIndex = 0
  }

  render() {
    let someSelected = 1;
    let someNotSelected = 0;
    let offset = 1;
    let unreadCount = 0;

    const path = this.props.location.pathname.indexOf('compose') === -1 ? '/compose' : '/'

    this.props.messages.map(message => {
      if (message.delete !== true) {
        offset = 0
        someSelected = message.selected ? 2 : someSelected
        someNotSelected = message.selected ? someNotSelected : -1
        !message.read && unreadCount++
      }
      return message
    });

    const selectedTotal = someSelected + someNotSelected - offset;

    const selectedClass = [
      'fa fa-square-o',
      'fa fa-minus-square-o',
      'fa fa-check-square-o'
    ]

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">
              {unreadCount}
            </span>
            unread message{unreadCount !== 1 && 's' }
          </p>

          <a className="btn btn-danger" onClick={() => this.props.history.push(path)}>
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default" onClick={() => this.selectAll(selectedTotal !== 2)}>
            <i className={selectedClass[selectedTotal]}></i>
          </button>

          <button className="btn btn-default" disabled={!selectedTotal} onClick={this.markAsRead}>
            Mark As Read
          </button>

          <button className="btn btn-default" disabled={!selectedTotal} onClick={this.markAsUnread}>
            Mark As Unread
          </button>

          <select className="form-control label-select" disabled={!selectedTotal} onChange={(e) => this.setLabel(e.target, true)}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" disabled={!selectedTotal} onChange={(e) => this.setLabel(e.target, false)}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled={!selectedTotal} onClick={this.deleteSelected}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  messages: state.messages.all,
  showComposeMessage: state.messages.composeMessage
})

const mapDispatchToProps = dispatch => bindActionCreators({
  messageAdded: createMessage,
  updateMessage,
  toggleComposeMessage,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
