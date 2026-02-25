import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { Client, IFrame, IMessage } from '@stomp/stompjs';

// Define the shape of the message coming from the server
interface Greeting {
  content: string;
}

function WebSocketComponent() {
  const [name, setName] = useState<string>('');
  const [greetings, setGreetings] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  
  // Type the ref as Client or null
  const stompClient = useRef<Client | null>(null);

  useEffect(() => {
    stompClient.current = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      onConnect: (frame: IFrame) => {
        setIsConnected(true);
        console.log('Connected: ' + frame);
        
        stompClient.current?.subscribe('/topic/greetings', (message: IMessage) => {
          const body: Greeting = JSON.parse(message.body);
          setGreetings((prev) => [...prev, body.content]);
        });
      },
      onWebSocketError: (error: Event) => {
        console.error('Error with websocket', error);
      },
      onStompError: (frame: IFrame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, []);

  const connect = (e: FormEvent): void => {
    e.preventDefault();
    stompClient.current?.activate();
  };

  const disconnect = (e: FormEvent): void => {
    e.preventDefault();
    stompClient.current?.deactivate();
    setIsConnected(false);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const sendName = (e: FormEvent): void => {
    e.preventDefault();
    if (stompClient.current && isConnected && name.trim()) {
      stompClient.current.publish({
        destination: "/app/hello",
        body: JSON.stringify({ name: name })
      });
      setName('');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <form className="form-inline">
            <div className="form-group">
              <label>WebSocket connection: </label>
              <button 
                onClick={connect} 
                disabled={isConnected} 
                className="btn btn-primary"
              >Connect</button>
              <button 
                onClick={disconnect} 
                disabled={!isConnected} 
                className="btn btn-danger"
              >Disconnect</button>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <form className="form-inline">
            <div className="form-group">
              <label>What is your name? </label>
              <input 
                type="text" 
                value={name}
                onChange={handleNameChange}
                className="form-control" 
                placeholder="Your name here..." 
              />
            </div>
            <button 
              onClick={sendName} 
              className="btn btn-success" 
              type="submit"
              disabled={!isConnected}
            >Send</button>
          </form>
        </div>
      </div>

      <hr />

      {isConnected && (
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Greetings Log</th>
                </tr>
              </thead>
              <tbody>
                {greetings.map((msg, index) => (
                  <tr key={index}>
                    <td>{msg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebSocketComponent;