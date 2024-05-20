I am K SAKTHIVEL.

Welcome to my HeyTHERE chatting application.

HeyTHERE is a chatting web application which enables users to chat with your friends and families.

LIVE APP:https://heythere-1xgo.onrender.com/

How to use HeyTHERE:
> Use Group Chat and connect using same room id in different sessions.
> Other named message and conversations are hard coded, socket.io not implemented there.

Features:
> Sending messages,
> Group chat,
> Sending emoji,
> Search users and rearch results,
> Like a message

Technologies used:
> React,
> Redux toolkit,
> Socket.io,
> HTML+JavaScript (JSX),
> CSS modules,
> React router and navigate,
> 'create-react-app' with redux toolkit templare

Data flow:
I facilated socket.io in my application to do bi-diractional communication between observer and subscriber, server is our observer and user's are the subcribers. so basically here there is no polling and request and response cycle communication happens in bi-directional manner using TCP(Transmission Control Protocol).<br>
when a user sends any message in the room, this is known as emitting event, so user emits message and our server receives it and server emit the message again to the respected room to the subscriber, as soon as message emotted all the users who are connected in the room will get notified by the message in realtime. this is the glory of socket.io. this is very efficient way of communicating.


