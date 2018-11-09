# Protocols Test

A small test using WebSockets and Protobuf to send a static JSON.

## Comparing WebSocket to Protobuf
According to the definition, [Websocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) is a communication protocol that allows the client and the server to have a two-way communication session: you can send messages to a server and receive event-driven responses without requesting them explicitly from the server (compare this to the http model).

[Protobuf](https://developers.google.com/protocol-buffers/docs/overview) (short for Protocol Buffers) is a mechanism for serializing structured data that is platform-neutral,  language-neutral and can be used in communication protocols, data storage, etc. 

Comparing and benchmarking the two of them against eachother is therefore difficult, as Websockets is **a way of communicating** between the client and the server, whereas Protobuf is **a way of structuring the data** that is sent over the communication protocol.

## WebSocket - Advantages and Disadvantages
One of the main advantages Websocket has is the persistent connection between the client and the server. This results in lower latency for the requests and the responses, as the connection is already established and data can be exchanged immediately. Also, the size of the requests and responses are smaller, as there is no need to send additional data (headers, cookies, etc.) on every request/response.

Another advantage of Websocket is the ability it gives the server to send data to client at any time, even if the client has not requested it. It also offers the possibility to broadcast data to all connected clients; this can be useful when developing applications that handle and consume data in real-time, or if there is a need to push updates to client when changes occur. 
 
This has a disadvantage, though. Because the connection is open until the client or the server closes it, the demand on the server is increased. An increasing number of connections means an increased load on the server. Also, due to the more complex nature of Websockets, it is more difficult to scale an application running on Websockets than one running on standard HTTP. 

One more disadvantage is the increased complexity of Websockets compared to HTTP; setting up an application to run on it requires more time if you are not familiar with the protocol and it is more difficult to find resources dealing with the specifics of Websockets, such as design patterns, benchmarking tools or logging middleware.

## Protobuf - Advantages and Disadvantages