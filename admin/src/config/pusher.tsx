import Pusher from "pusher-js";

export const pusherInstance = () => {
  const pusher = new Pusher('50852ca08ffdb6700a75', {
    cluster: 'ap1'
  });

  const getData = (channelName :string, eventName :string, callback :any) => {
    const channel = pusher.subscribe(channelName);

    channel.bind(eventName, (data :any) => {
      callback(data);
    });

    return () => {
      pusher.unsubscribe(channelName);
      pusher.disconnect();
    };
  };

  return {
    getData
  };
};
