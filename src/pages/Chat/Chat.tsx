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

    /**
     *
     * @param {string} text Текст из textarea
     * @param {string} type Вид textarea
     * Определяет указанную зону ввода и добавляет текст в стейт
     */

    const handleChangeTextarea = (text: string, type: string): void => {
        if ('user-name' === type) {
            setUserName(text)
        } else if ('input-message' === type) {
            setMessage(text)
        }
    }

    /**
     * Автоматический скролл вниз списка сообщений
     */

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }

    /**
     * Функция, которая определяет не пустые ли поля.
     * Затем в случае если все подходит под условия,
     * идет оправка сообщений на сервер и зачищается стейт сообщения
     */

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
                          onChange={e => handleChangeTextarea(e.currentTarget.value, 'user-name')}
                />
                <textarea className='input-message'
                          placeholder='Сообщение'
                          value={message}
                          onChange={e => handleChangeTextarea(e.currentTarget.value, 'input-message')}
                />
                <div className='button'
                     onClick={sendMessage}>
                    Отправить
                </div>
            </div>
        </div>
    )
}