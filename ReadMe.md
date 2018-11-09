# Protocols Test

A small test using WebSockets and Protobuf to send a static JSON.
* [How to Use](#how-to-use)
* [Comparing WebSocket to Protobuf](#comparing-websocket-to-protobuf)
* [WebSocket - Advantages and Disadvantages](#websocket-advantages-and-disadvantages)
* [Protobuf - Advantages and Disadvantages](#protobuf-advantages-and-disadvantages)


## How to use 
* Need to have `nodemon` installed. 
    * To install nodemon globally, run `npm install -g nodemon`
### Websockets 
* **Server**: cd into `websockets/server/` , run `npm install` , then run `nodemon start`.  
* **Client**: cd into `websockets/client/` , run `npm install` , then run `nodemon start`. 
### Protobuf 
* **Server**: cd into `protobuf/server/` , run `npm install` , then run `nodemon start`.  
* **Client**: cd into `protobuf/client/` , run `npm install` , then run `nodemon start`. 

## Comparing WebSocket to Protobuf 
According to the definition, [Websocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) is a communication protocol that allows the client and the server to have a two-way communication session: you can send messages to a server and receive event-driven responses without requesting them explicitly from the server (compare this to the http model).

[Protobuf](https://developers.google.com/protocol-buffers/docs/overview) (short for Protocol Buffers) is a mechanism for serializing structured data that is platform-neutral,  language-neutral and can be used in communication protocols, data storage, etc. 

Comparing and benchmarking the two of them against eachother is therefore difficult, as Websockets is **a way of communicating** between the client and the server, whereas Protobuf is **a way of structuring the data** that is sent over the communication protocol.

## WebSocket Advantages and Disadvantages
One of the main advantages Websocket has is the persistent connection between the client and the server. This results in lower latency for the requests and the responses, as the connection is already established and data can be exchanged immediately. Also, the size of the requests and responses are smaller, as there is no need to send additional data (headers, cookies, etc.) on every request/response.

Another advantage of Websocket is the ability it gives the server to send data to client at any time, even if the client has not requested it. It also offers the possibility to broadcast data to all connected clients; this can be useful when developing applications that handle and consume data in real-time, or if there is a need to push updates to client when changes occur. 
 
This has a disadvantage, though. Because the connection is open until the client or the server closes it, the demand on the server is increased. An increasing number of connections means an increased load on the server. Also, due to the more complex nature of Websockets, it is more difficult to scale an application running on Websockets than one running on standard HTTP. 

One more disadvantage is the increased complexity of Websockets compared to HTTP; setting up an application to run on it requires more time if you are not familiar with the protocol and it is more difficult to find resources dealing with the specifics of Websockets, such as design patterns, benchmarking tools or logging middleware.

## Protobuf Advantages and Disadvantages
One advantage of protobuf is the structure it imposes on data: it offers the ability to maintain consistency across all data you are sending and receiving, as well as validating it. It is also easy to define the types of the fields, as well as making them required or optional. 

Another advantage is the speed and reduced size of protobufs. The test JSON being sent from the server is 987 bytes by default and 881 bytes when encoded, an approximately 10% reduction in size. 

---
**Running 1 million requests using protobufs on 1000 concurrent connections**
```cmd
Stat    2.5%   50%    97.5%  99%    Avg       Stdev    Max        
Latency 295 ms 343 ms 457 ms 538 ms 348.09 ms 47.48 ms 1884.49 ms 

Stat      1%      2.5%    50%     97.5%   Avg     Stdev  Min    
Req/Sec   1913    2000    2923    3191    2857.72 256.26 1072   
Bytes/Sec 2.14 MB 2.24 MB 3.27 MB 3.58 MB 3.2 MB  287 kB 1.2 MB 

Req/Bytes counts sampled once per second.

1000k requests in 350.27s, 1.12 GB read
```
---
**Comparison: 1 million requests without Protobufs on 1000 concurrent connections**
```cmd
Stat    2.5%   50%    97.5%  99%    Avg       Stdev    Max        
Latency 304 ms 354 ms 446 ms 487 ms 360.42 ms 78.31 ms 6433.28 ms 

Stat      1%      2.5%   50%     97.5%   Avg     Stdev  Min     
Req/Sec   1933    2033   2811    3095    2763.01 265.91 949     
Bytes/Sec 2.66 MB 2.8 MB 3.87 MB 4.26 MB 3.8 MB  366 kB 1.31 MB 

Req/Bytes counts sampled once per second.

1000k requests in 362.27s, 1.38 GB read
```
---
One disadvantage of protobufs is the difficulty in finding documentation. Apart from the official documentation from Google, there is relatively little information online, especially if you have never interacted with protobufs before, and it increases the time it takes in order to configure and use protobufs properly. 

Also, this leads to another disadvantage: the setup needed in order to use protobufs. You need to compile the .proto file in order to be able to encode/decode data (alternatively use a library that does that for you) and both the client and the server need to share the same schema in order to encode/decode properly. By comparison, using a normal JSON is simpler and quicker; even more, is it more human-readable and comprehensible, while protobufs are more difficult to interpret without access to the schema used. 