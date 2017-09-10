import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateMessage } from '../actions'

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

  render () {

    const selected = this.props.message.selected ? ' selected' : '';
    const unread = !this.props.message.read ? 'un' : '';

    return (
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
          <a>
            {this.props.message.subject}
          </a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
    message: state.messages.all[props.index]
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateMessage,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Message)
