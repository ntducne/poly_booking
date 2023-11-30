import React, { useEffect } from 'react';
import { pusherInstance } from '../config/pusher';

const Demo: React.FC = () => {
  useEffect(() => {
    const unsubscribe = pusherInstance().getData('chat', 'message', (data :any)  => {
      console.log('Received data:', data);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (<></>);
}

export default Demo;
