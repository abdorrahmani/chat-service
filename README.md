# ChatFlow 💬

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-Real--time-green?style=for-the-badge&logo=socket.io&logoColor=white)

[![GitHub stars](https://img.shields.io/github/stars/abdorrahmani/chat-service?style=for-the-badge&logo=github&logoColor=white)](https://github.com/abdorrahmani/chat-service)
[![GitHub forks](https://img.shields.io/github/forks/abdorrahmani/chat-service?style=for-the-badge&logo=github&logoColor=white)](https://github.com/abdorrahmani/chat-service)
[![GitHub issues](https://img.shields.io/github/issues/abdorrahmani/chat-service?style=for-the-badge&logo=github&logoColor=white)](https://github.com/abdorrahmani/chat-service/issues)
[![GitHub license](https://img.shields.io/github/license/abdorrahmani/chat-service?style=for-the-badge&logo=github&logoColor=white)](https://github.com/abdorrahmani/chat-service/blob/master/LICENSE)

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/abdorrahmani/chat-service)
[![Deployment](https://img.shields.io/badge/deployment-ready-success?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Code Quality](https://img.shields.io/badge/code%20quality-A-green?style=for-the-badge&logo=sonarqube&logoColor=white)](https://github.com/abdorrahmani/chat-service)

</div>

## 🚀 Overview

**ChatFlow** is a modern, real-time chat application built with Next.js that connects to a Go chat server over WebSocket. Experience seamless communication with beautiful animations and intuitive design.

- **Frontend repository**: [`chat-service`](https://github.com/abdorrahmani/chat-service)
- **Backend server**: [`chat-server` (Go)](https://github.com/abdorrahmani/chat-server)

### ✨ Features

![Features](https://img.shields.io/badge/Features-Real--time%20Chat-blue?style=flat-square&logo=chat&logoColor=white)
![UI](https://img.shields.io/badge/UI-Modern%20Design-purple?style=flat-square&logo=figma&logoColor=white)
![Animations](https://img.shields.io/badge/Animations-Smooth-orange?style=flat-square&logo=adobe&logoColor=white)

- 🎨 **Modern UI** with animations and theming
- 💬 **Global and private messages** UI
- 🔄 **WebSocket client** with auto-reconnect
- 🌙 **Dark/Light mode** support
- 📱 **Responsive design** for all devices
- ⚡ **Real-time communication** with backend

---

## 📋 Prerequisites

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=flat-square&logo=node.js&logoColor=white)
![Package Manager](https://img.shields.io/badge/Package%20Manager-Yarn%20%7C%20NPM%20%7C%20PNPM%20%7C%20Bun-blue?style=flat-square&logo=npm&logoColor=white)
![Backend](https://img.shields.io/badge/Backend-WebSocket%20Server-red?style=flat-square&logo=server&logoColor=white)

- **Node.js** 18+ (or newer)
- **Package Manager**: Yarn/NPM/PNPM/Bun
- **Backend**: A running WebSocket server (see backend section below)

---

## 🔧 Backend (chat-server)

![Go](https://img.shields.io/badge/Go-1.21%2B-blue?style=flat-square&logo=go&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-Supported-green?style=flat-square&logo=socket.io&logoColor=white)
![TLS](https://img.shields.io/badge/TLS-Optional-orange?style=flat-square&logo=security&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Supported-blue?style=flat-square&logo=docker&logoColor=white)

The backend is a lightweight chat server supporting **TCP**, **gRPC**, and **WebSocket** (WS/WSS) with optional TLS. Follow its README for full setup, TLS, and Docker usage.

- **Repository**: [`chat-server`](https://github.com/abdorrahmani/chat-server)
- **Quick start (WebSocket)**: the server listens on `/ws` when `server.type: "websocket"`.
- **For local dev without TLS (WS)**: set `tls.tlsRequire: false` and run the server. See examples in the backend README.
- **For local dev with TLS (WSS)**: generate self-signed certs using the provided scripts and enable `tls.tlsRequire: true`. See the backend docs for details and commands.

📚 **References and commands** are documented in the backend README: [`chat-server` README](https://github.com/abdorrahmani/chat-server).

---

## ⚙️ Environment Variables

![Environment](https://img.shields.io/badge/Environment-Variables-yellow?style=flat-square&logo=settings&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-Config-green?style=flat-square&logo=socket.io&logoColor=white)

Set the WebSocket endpoint the frontend should use:

```bash
# .env.local
NEXT_PUBLIC_WEBSOCKET_API=ws://localhost:8080/ws
# or, if TLS is enabled in the backend
# NEXT_PUBLIC_WEBSOCKET_API=wss://localhost:8080/ws
```

The app reads this value in `src/hooks/useWebSocket.ts`.

---

## 🚀 Run the Frontend

![Install](https://img.shields.io/badge/Install-Dependencies-blue?style=flat-square&logo=package&logoColor=white)
![Dev Server](https://img.shields.io/badge/Dev%20Server-Localhost%3A3000-green?style=flat-square&logo=server&logoColor=white)

### 1️⃣ Install dependencies:

```bash
yarn
# or: npm install / pnpm install / bun install
```

### 2️⃣ Start the dev server:

```bash
yarn dev
# or: npm run dev / pnpm dev / bun dev
```

🌐 **Open** [http://localhost:3000](http://localhost:3000)

⚠️ **Ensure** your backend is running and reachable at the URL in `NEXT_PUBLIC_WEBSOCKET_API`.

---

## 📝 Notes

![WebSocket](https://img.shields.io/badge/WebSocket-Endpoint%3A%20%2Fws-blue?style=flat-square&logo=socket.io&logoColor=white)
![TLS](https://img.shields.io/badge/TLS-Self--signed%20Certs-orange?style=flat-square&logo=security&logoColor=white)

- The backend expects WebSocket clients to connect at `/ws`.
- For WSS and self-signed certs in development, configure your environment to trust or skip verification as appropriate (see backend README).

---

## 📄 License

![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge&logo=opensourceinitiative&logoColor=white)

**MIT** - See [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by [@abdorrahmani](https://github.com/abdorrahmani)**

[![GitHub](https://img.shields.io/badge/GitHub-Profile-black?style=for-the-badge&logo=github&logoColor=white)](https://github.com/abdorrahmani)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mohammad-abdorrahmani-051914198)

</div>
