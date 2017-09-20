import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Message from './message'

const MessageList = ({ messages, setFieldForId }) => (
  messages && messages.length > 0 &&
  <div>
  {
    messages.map((message, i) => {
      if (!message.delete) {
        return <Message key={ i } index={ i }/>
      }
      return <div key={ i }/>
    })
  }
  </div>
)

const mapStateToProps = (state, props) => ({
    messages: state.messages.all,
    someValue: state.someValue
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MessageList)
