# Debate-App
A platform that allows users to organize and participate in debates.

# Video Conferencing
Jitsi Meet is an open-source video conferencing platform used in this application to organize debates.

# Backend 
The backend is built with Node.js and Express.js. It contains REST APIs for user and video models. 
It uses the node-media-server package to live-stream video content. 
The video packages are sent to the frontend application over the RTMP (Real-Time Messaging Protocol) protocol. MongoDB is used to store the data.

# Mobile App
React Native is used to build the cross-platform Android application. 
It uses the react-native-video package to live stream video chunks on the application.
