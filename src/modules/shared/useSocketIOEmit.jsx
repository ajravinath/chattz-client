import { useEffect, useState } from 'react';
import { socket } from '../../App';

const useSocketIOEmit = (emitOn, endpoint = 'http://localhost:3000/chattz') => {
  const [sendQueue, setSendQueue] = useState([]);

  const emit = message => {
    setSendQueue(queue => [...queue, message]);
  };

  useEffect(() => {
    if (socket) {
      if (sendQueue.length > 0) {
        const newSendQueue = [...sendQueue];
        sendQueue.forEach((element, index) => {
          socket.emit(emitOn, element);
          newSendQueue.splice(index, 1);
        });
        setSendQueue(newSendQueue);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, emitOn, JSON.stringify(sendQueue)]);

  return emit;
};

export default useSocketIOEmit;
