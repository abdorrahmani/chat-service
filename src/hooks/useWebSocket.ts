import { useCallback, useEffect, useRef, useState } from "react";

type Options = {
  reconnect?: boolean;
  reconnectInterval?: number;
};

export const WEBSOCKET_API_ENDPOINT =
  process.env.NEXT_PUBLIC_WEBSOCKET_API || "";

export function useWebSocket<T = unknown>({
  reconnect = true,
  reconnectInterval = 3000,
}: Options = {}) {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<T | null>(null);
  const reconnectTimer = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    const ws = new WebSocket(WEBSOCKET_API_ENDPOINT);

    ws.onopen = () => {
      setIsConnected(true);
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
      }
    };

    ws.onmessage = (e) => {
      try {
        const data: T = JSON.parse(e.data);
        setLastMessage(data);
      } catch {
        setLastMessage(e.data as T);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      if (reconnect) {
        reconnectTimer.current = setTimeout(connect, reconnectInterval);
      }
    };

    ws.onerror = () => {
      ws.close();
    };

    wsRef.current = ws;
  }, [reconnect, reconnectInterval]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
      }
    };
  }, [connect]);

  const sendMessage = useCallback((msg: T | string | object) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  return {
    isConnected,
    lastMessage,
    sendMessage,
  };
}
