import React from 'react'
import { connect } from 'react-redux'
import {Route, Link, withRouter} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { updateMessage, fetchContent, deleteContent } from '../actions'
import MessageContent from './messageContent'

class Message extends React.Component {
  state = {selected: false}

  setSelected = (value) => {
    let message = Object.assign({}, this.props.message)
    message.selected = !message.selected

    this.props.updateMessage({}, {[message.id]: message}, false)
  }

  setStarred = () => {
    let body = {
      messageIds: [this.props.message.id],
      command: 'star',
      star: !this.props.message.starred
    }

    let message = Object.assign({}, this.props.message)
    message.starred = !this.props.message.starred

    this.props.updateMessage(body, {[message.id]: message}, true)
  }

  setFieldForSelected = (field, value) => {
    let body = {
      messageIds: [this.props.message.id],
      command: 'read',
      read: true
    }

    let message = Object.assign({}, this.props.message)
    message.read = true

    this.props.updateMessage(body, {[message.id]: message}, true)
  }

  render () {

    const selected = this.props.message.selected ? ' selected' : '';
    const unread = !this.props.message.read ? 'un' : '';
    const id = this.props.message.id;

    return (
      <div>
        <div className={`row message ${unread}read${selected}`}>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input type="checkbox" checked={this.props.message.selected} onChange={() => {this.setSelected()}} />
              </div>
              <div className="col-xs-2">
                <i className={`star fa fa-star${this.props.message.starred ? '' : '-o'}`} onClick={() => {this.setStarred()}}></i>
              </div>
            </div>
          </div>
          <div className="col-xs-11">
            {
              this.props.message.labels && Object.keys(this.props.message.labels).map((label, i) => {
                if (this.props.message.labels[label]) {
                  return <span key={ i } className="label label-warning">{label}</span>
                }
                return null
              })
            }
            <Link to={{ pathname: `/messages/${id}` }} onClick={() => this.props.fetchContent(id)}>{this.props.message.subject}</Link>
          </div>
        </div>
        <Route path={`/messages/${id}`} render={() => {
          this.props.fetchContent(id)
          if (!this.props.message.read) {
            this.setFieldForSelected('read', true)
          }
          return <MessageContent />
        }}/>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
    message: state.messages.all[props.index]
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateMessage,
  fetchContent,
  deleteContent
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Message))
