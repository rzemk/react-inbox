export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'
export function fetchMessages() {
  return async (dispatch) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
    const json = await response.json()
    let labels
    let messages = json._embedded.messages.map(message => {
      labels = {}
      message.labels.map(label => {
        labels[label] = true
        return null
      })
      message.labels = labels
      message.selected = false
      return message;
    })
    dispatch({
      type: MESSAGES_RECEIVED,
      messages
    })
  }
}

export const MESSAGE_UPDATE = 'MESSAGE_UPDATE'
export function updateMessage(body, messages, updateServer) {
  return async (dispatch) => {
    if (updateServer) {
      await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
          method: 'PATCH',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        })
    }
    dispatch({
      type: MESSAGE_UPDATE,
      messages
    })
  }
}

export const MESSAGE_CREATE = 'MESSAGE_CREATE'
export function createMessage(body) {
  return async (dispatch) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
    const json = await response.json()
    body = Object.assign(body, {labels: {}, starred: false, read: false, id: json.id})
    dispatch({
      type: MESSAGE_CREATE,
      message: body
    })
  }
}

export const TOGGLE_COMPOSE_MESSAGE = 'TOGGLE_COMPOSE_MESSAGE'
export function toggleComposeMessage(value) {
  return async (dispatch) => {
    dispatch({
      type: TOGGLE_COMPOSE_MESSAGE,
      show: value
    })
  }
}

export const CONTENT_RECEIVED = 'CONTENT_RECEIVED'
export function fetchContent(messageId) {
  return async (dispatch) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages/${messageId}`)
    const json = await response.json()
    dispatch({
      type: CONTENT_RECEIVED,
      messageContent: json.body
    })
  }
}

export const CONTENT_DELETE = 'CONTENT_DELETE'
export function deleteContent(messageId) {
  return async (dispatch) => {
    dispatch({
      type: CONTENT_DELETE
    })
  }
}
