import { useEffect, useState } from 'react';
import { socket } from '../../App';

const useSocketIOListen = lookFor => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on(lookFor, data => {
        setMessages(messages => [...messages, data]);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lookFor]);

  return messages;
};

export default useSocketIOListen;
