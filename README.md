# Chat app

## Description

Live chat app based on Vue.js, typescript and socket.io library.

## App URL
Please use [https://test-chat-frontend-production.up.railway.app](https://test-chat-frontend-production.up.railway.app) url for testing and review

## Technologies used
- Vue.js v3.4 (Node.js based framework for backend)
- socket.io (Websockets library for chat integration)
- railway.app (Cloud app for deployment and hosting)

## Installation

**NOTE**: You must have node environment not lower than 18 version or higher.

First, clone this repository to your local machine. Then, follow these steps:
1. Enter the cloned repository, and run the installation command:

```bash
$ yarn install
```
***you can obviously use **npm** if this is your favourite package manager*

2. Set up the environment variables. There is a **.env.example** file with one environment variable, which is set to a default backend app host and port. Please change it to some other URL if needed. You can just simply copy/paste the file and rename it to **.env**.

3. Run the application:
```bash
# development
$ yarn dev

# build
$ yarn build
```

5. In case everything goes well, there should a message indication host and port in your console, where the app is running.
