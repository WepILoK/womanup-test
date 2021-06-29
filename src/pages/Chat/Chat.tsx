import React, {useContext, useEffect, useRef, useState} from 'react'
import {useCollectionData} from "react-firebase-hooks/firestore";
import firebase from "firebase";

import {Message} from "./components/Message";
import {Context} from "../../index";
import './ChatStyle.css'


export const Chat: React.FC = () => {
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const {firestore} = useContext(Context)
    const [userName, setUserName] = useState('')
    const [message, setMessage] = useState('')
    const [messages] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    )

    const handleChangeTextarea = (event: React.FormEvent<HTMLTextAreaElement>, type: string) => {
        const value = event.currentTarget.value
        if ('user-name' === type) {
            setUserName(value)
        } else if ('input-message' === type) {
            setMessage(value)
        }
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }

    const sendMessage = async () => {
        if (userName !== '' && message !== '') {
            firestore.collection('messages').add({
                name: userName,
                text: message,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            setMessage('')
        }
    }

    useEffect(scrollToBottom, [messages]);

    if (!messages) {
        return null
    }
    return (
        <div className='content'>
            <div className='messages'>
                {messages.map((item, index) => (
                    <Message key={index} name={item.name}
                             text={item.text}/>
                ))}
                <div ref={messagesEndRef}/>
            </div>
            <div className='create'>
                <textarea className='user-name'
                          placeholder='Имя пользователя'
                          value={userName}
                          onChange={event => handleChangeTextarea(event, 'user-name')}
                />
                <textarea className='input-message'
                          placeholder='Сообщение'
                          value={message}
                          onChange={event => handleChangeTextarea(event, 'input-message')}
                />
                <div className='button'
                     onClick={sendMessage}>
                    Отправить
                </div>
            </div>
        </div>
    )
}