import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import './Join.css'
function Join() {

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const history = useHistory()

    return (
        <div className='join'>
            <div className="join__container">

                <div className="join__header">
                    <h3>Join</h3>
                </div>
                <div className="join__body">
                    <form >
                        <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder='Room' value={room} onChange={(e) => setRoom(e.target.value)} />

                        <button type='submit' onClick={(e) => (!name.trim() || !room.trim()) ? e.preventDefault() : history.push(`/chat?name=${name}&room=${room}`)}>LOG IN</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Join
