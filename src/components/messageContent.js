import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const MessageContent = ({ message }) => (
  <div className="row message-body">
    <div className="col-xs-11 col-xs-offset-1">
      {message}
    </div>
  </div>
)


const mapStateToProps = (state, props) => ({
    message: state.messages.messageContent
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MessageContent)
