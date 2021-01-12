import React from 'react'
import './Message.css'
import ReactEmoji from 'react-emoji'
function Message({ message, currentUserName }) {

    return (
        <div className={`message ${currentUserName === message.user ? 'active' : null}`}>
            <div className={`message__container`}>
                <p>{ReactEmoji.emojify(message.message)}</p>
            </div>
            <span className={currentUserName === message.user ? 'active-username' : 'reverse-username'}>
                {message.user}
            </span>

        </div>
    )
}

export default Message
