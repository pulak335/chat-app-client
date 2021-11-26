import React,{ useState,useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({ socket, name, room }) => {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const message = {
            room: room,
            name: name,
            message: currentMessage,
            date: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit('msg_send', message)
            setMessageList((list)=>[...list,message]);
        }
    }

    useEffect(() => {
        socket.on("msg_rec", (data) => {
            setMessageList((list)=>[...list,data]);
        })
    }, [socket])
    
    return (
        <div className="chat">
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
                <div className="chat-body">
            <ScrollToBottom className="message-container">
            {
                messageList.map((messageContent) => {
                    return <div className="message" id={name === messageContent?.name? 'you':'other'}>
                        <div>
                            <div className="message-content">
                            <p>{messageContent?.message}</p>
                        </div>
                        <div className="message-meta">
                            <p id="time">{messageContent?.date}</p>
                            <p id="author">{messageContent?.name}</p>
                        </div>
                        </div>
                  </div>
                })  
             } 
             </ScrollToBottom> 
            </div>
            <div className="chat-footer">
                <input type="text" placeholder="Aa" onBlur={(e)=>setCurrentMessage(e.target.value)}/>
                <button onClick={sendMessage}> &#9658; </button>
            </div>
        </div>
        </div>
    );
};

export default Chat;