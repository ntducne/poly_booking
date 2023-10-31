import React, { useEffect } from 'react';
import Pusher from "pusher-js";

const Demo: React.FC = () =>
 {
  useEffect(() => {
    const pusher = new Pusher('50852ca08ffdb6700a75', {
      cluster: 'ap1'
    });
    const channel = pusher.subscribe('chat');
    channel.bind('message', function (data: any) {
      console.log(data);
        
    });
    return () => {
      pusher.unsubscribe('chat');
      pusher.disconnect();
    };
  }, []);

  return (
    <>
      
    </>
  );
}

export default Demo;
