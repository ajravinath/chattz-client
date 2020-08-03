import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import {
  Row,
  Toast,
  ToastHeader,
  ToastBody,
  Col,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';
import NavBar from './components/NavBar';
import useSocketIOListen from '../shared/useSocketIOListen';
import useSocketIOEmit from '../shared/useSocketIOEmit';
import { socket } from '../../App';

export default function Main(props) {
  const {
    appContext: { user }
  } = props;
  const [chatDivHeight, setChatDivHeight] = useState(0);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);
  const navBar = useRef(null);
  const sendBar = useRef(null);

  const joinChat = useSocketIOEmit('join');
  const chatMessages = useSocketIOListen('chat-message');
  const sendMessage = useSocketIOEmit('chat-message');

  useLayoutEffect(() => {
    function updateHeight(params) {
      if (navBar.current && sendBar.current) {
        const chatDivHeight =
          window.innerHeight -
          (navBar.current.clientHeight + sendBar.current.clientHeight + 20);
        setChatDivHeight(chatDivHeight);
      }
    }
    window.addEventListener('resize', updateHeight);
    updateHeight();
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useEffect(() => {
    if (user.id) {
      joinChat({ userId: user.id });
      socket.on('history', data => setHistory(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(user)]);

  useEffect(() => {
    var chatWindow = document.getElementById('chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [history.length, chatMessages.length]);

  const handleMessageChange = e => setMessage(e.target.value);
  const handleEnterPress = event => {
    if (event.which === 13 || event.keyCode === 13) {
      sendChatMessage();
    }
  };
  const sendChatMessage = () => {
    sendMessage({ userId: user.id, text: message });
    setMessage('');
  };

  return (
    <>
      <div className="row" ref={navBar}>
        <Col>
          <NavBar />
        </Col>
      </div>
      <Row className="pt-3">
        <Col
          tag="div"
          id="chat-window"
          className="overflow-y"
          style={{ height: chatDivHeight }}
        >
          {[...history, ...chatMessages].map((chatMessage, index) => {
            const isMe = chatMessage.id === user.id;
            const classPrefix = isMe ? 'justify-content-end' : '';
            return (
              <div className={`d-flex ${classPrefix} pb-3`} key={index}>
                <Toast className={`${isMe ? 'bg-primary text-white' : ''}`}>
                  <ToastHeader>
                    {chatMessage.firstName} @{chatMessage.time}
                  </ToastHeader>
                  <ToastBody>{chatMessage.text}</ToastBody>
                </Toast>
              </div>
            );
          })}
        </Col>
      </Row>
      <div className="row" ref={sendBar}>
        <Col className="p-3">
          <InputGroup>
            <Input
              placeholder="Type a message"
              value={message}
              onChange={handleMessageChange}
              onKeyPress={handleEnterPress}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText tabIndex={0} onClick={sendChatMessage}>
                Send
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </div>
    </>
  );
}
