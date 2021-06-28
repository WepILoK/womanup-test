import React from 'react';


interface IMessage {
    name: string
    text: string
    createdAt: string
}

export const Message: React.FC<IMessage> = ({name,text ,createdAt }) => {
    return (
        <div className='message'>
            <div className='user-name'>{name}</div>
            <div className='text'>{text}</div>
            <div className='create-time'>{createdAt}</div>
        </div>
    );
};

