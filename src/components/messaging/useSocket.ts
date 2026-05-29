import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (url: string, token: string | null) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!token) return;

    const socket = io(url, {
      auth: {
        token,
      },
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to socket');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from socket');
    });

    return () => {
      socket.disconnect();
    };
  }, [url, token]);

  return { socket: socketRef.current, isConnected };
};
