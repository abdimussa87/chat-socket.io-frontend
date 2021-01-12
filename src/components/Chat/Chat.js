import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import Message from '../Message/Message';
import ScrollToBottom from 'react-scroll-to-bottom'
import { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';


let socket;

function Chat(props) {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([])
    const scrollToBottom = useScrollToBottom();
    const [sticky] = useSticky();

    const ENDPOINT = 'https://chat-socket-io-nodejs.herokuapp.com/'
    useEffect(() => {
        const { name, room } = queryString.parse(props.location.search)
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (data) => {
            if (data?.error) {
                alert(data.error)
            }
        })
        return () => {
            socket.off();
        }
        // eslint-disable-next-line
    }, [props.location.search])

    useEffect(() => {
        socket.on('message', ({ user, message }, callback) => {
            setMessages([...messages, { user, message }])
        });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) socket.emit('sendMessage', message, () => {
            setMessage('')
        })
    }
    return (
        <div className='chat'>
            <div className="chat__container">
                <div className="chat__header">
                    <div className="chat__headerLeft">
                        <img src="https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/onlineIcon.png" alt="online" />
                        <h5>{room}</h5>
                    </div>
                    <div>
                        <a href="/">
                            <img src="https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/closeIcon.png" alt="close" />
                        </a>
                    </div>
                </div>
                <div className="chat__messages">
                    <ScrollToBottom>
                        <div>

                            {messages.map((message, i) => <div key={i}><Message key={i} message={message} currentUserName={name.trim().toLowerCase()} /></div>)}

                            {!sticky && <button onClick={scrollToBottom}>Click me to scroll to bottom</button>}
                        </div>
                    </ScrollToBottom>
                </div>
                <div className="chat__footer">

                    <input type="text" value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
                    />
                    <button onClick={(e) => sendMessage(e)}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat
