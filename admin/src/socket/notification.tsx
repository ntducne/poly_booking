import Pusher from "pusher-js";

export const PusherServer = new Pusher('50852ca08ffdb6700a75', {
    cluster: 'ap1'
});

export const Notification = () => {
    const channel = PusherServer.subscribe('newBill');
    channel.bind('new-bill', (data :any) => {
        console.log(data);
        
        return data;
    });
    PusherServer.unsubscribe('newBill');
    PusherServer.disconnect();
}