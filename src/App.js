import { io } from "socket.io-client";
import {useState} from "react"
import './App.css';
import Chat from "./Chat";
const socket = io.connect('http://localhost:5000');
function App() {

  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [show, setShow] = useState(false)
  const joinRoom = () => {
    if (name !== '' && room !== '') {
      socket.emit('join_room', room)
      setShow(true)
    }
  }
  
  return (
    <div className="App">
      <div>
        
        {!show ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input type='text' placeholder='User name...' onBlur={(e) => setName(e.target.value)} />
          <input type='text' placeholder='Group name...' onBlur={(e) => setRoom(e.target.value)} />
          <button onClick={joinRoom}>Join Group Chat</button>
        </div>)
        :
          (<Chat socket={socket} name={name} room={room} />)
        }
      </div>
    </div>
  );
}

export default App;
