#HealthPass Details
-------------------
#Configuring PORT for Backend
-----------------------------
Configuration for Backend should be done in this file :- \BE\configuration\config.json
This file contains key "PORT" that specifies Port Number that we want to run our BE in. That should be changed as convenient.

Example :- "PORT": "5000"

#Configuring PROXY for Frontend
-------------------------------
Configuration for Frontend should be done in this file :- \FE\package.json
This file contains key "Proxy" that specifies BE server URL along with the proxy that we specified in configuration file for BE.

Example :- "Proxy": "http://localhost:5000/"

#Configuring TIMER for Frontend
-------------------------------
Configuration for Frontend should be done in this file :- \FE\src\Components\Configuration\config.json
This file contains key "timer-refresh" that specifies how much time the QR code will be valid. This value should be specified in minutes.

Example :- "timer-refresh": "1"

#Working of this App
--------------------
This app consists of two pages.

1. First page consists of a QR code that exposes certain data for the mobile application to read data and ask user for authentication.

2. Second page requires authentication as it will expose a QR code along with all the details of user to generate pass. 
This page will be called from FE along with attaching token in header that BE will verify and attach to data of user to generate second QR code.

#Application Start-up
--------------------
We need to start Up our application in two stages.

1. Starting Up Backend Server. Open Terminal and navigate to folder path where package.json is present for BE.
Then use this command to fire up Backend Server :- npm run server

2. Starting Up Frontend Server. Open Terminal and navigate to folder path where package.json is present for FE.
Then use this command to fire up Frontend Server :- npm start
