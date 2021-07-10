import React from 'react';


interface IMessage {
    name: string
    text: string
}

export const Message: React.FC<IMessage> = React.memo(({name,text}) => {
    return (
        <div className='message'>
            <div className='user-name'>{name}</div>
            <div className='text'>{text}</div>
        </div>
    );
});

