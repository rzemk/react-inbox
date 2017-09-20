import { combineReducers } from 'redux'
import { MESSAGES_RECEIVED, MESSAGE_UPDATE, MESSAGE_CREATE, TOGGLE_COMPOSE_MESSAGE, CONTENT_RECEIVED, CONTENT_DELETE } from '../actions'

function messages(state = { all: [], composeMessage: false }, action) {
  let messages;
  switch (action.type) {
    case MESSAGES_RECEIVED:
      return {
        ...state,
        all: action.messages
      }
    case MESSAGE_UPDATE:
      messages = state.all.map(message => {
        return action.messages[message.id] ? action.messages[message.id] : message
      })
      return {
        ...state,
        all: messages
      }
    case MESSAGE_CREATE:
      messages = [...state.all, action.message]
      return {
        ...state,
        all: messages
      }
    case TOGGLE_COMPOSE_MESSAGE:
      return {
        ...state,
        composeMessage: action.show
      }
    case CONTENT_RECEIVED:
      return {
        ...state,
        messageContent: action.messageContent
      }
    case CONTENT_DELETE:
      return {
        ...state,
        messageContent: undefined
      }
    default:
      return state
  }
}

export default combineReducers({
  messages,
})
