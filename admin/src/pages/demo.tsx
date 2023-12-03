import React, { useEffect, useState } from 'react';
import { pusherInstance } from '../config/pusher';

const Demo: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = pusherInstance().getData('chat', 'message', (data :any)  => {
      console.log(data);
      
      setNotifications(prevNotifications => [...prevNotifications, {
        message: data.data.message,
        time: data.data.time,
      }]
    )});
    return () => {
      unsubscribe();
    };
  }, []);
  return (<>
    <div className="flex flex-col">
      {notifications.map((item, key) => (
        <div key={key} className="flex items-center rounded-2xl p-2 hover:bg-slate-100">
          <div className="ml-2">
            <p className="font-medium">{item.message}</p>
            <p className="text-xs text-gray-500">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  </>);
}

export default Demo;
