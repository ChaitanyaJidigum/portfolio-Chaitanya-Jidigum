"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SystemTelemetryContextType {
  emitTelemetry: (message: string, durationMs?: number) => void;
  clearTelemetry: () => void;
}

const SystemTelemetryContext = createContext<SystemTelemetryContextType>({
  emitTelemetry: () => {},
  clearTelemetry: () => {},
});

export function useSystemTelemetry() {
  return useContext(SystemTelemetryContext);
}

export function SystemTelemetryProvider({ children }: { children: React.ReactNode }) {
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const emitTelemetry = useCallback((message: string, durationMs = 2600) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMessage(message);
    timeoutRef.current = setTimeout(() => {
      setActiveMessage(null);
      timeoutRef.current = null;
    }, durationMs);
  }, []);

  const clearTelemetry = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMessage(null);
  }, []);

  return (
    <SystemTelemetryContext.Provider value={{ emitTelemetry, clearTelemetry }}>
      {children}
      <div 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9998] pointer-events-none max-w-[92vw] sm:max-w-md w-max px-3"
        aria-live="polite"
        role="status"
      >
        <AnimatePresence>
          {activeMessage && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.97 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#2E54FE]/35 bg-background/90 dark:bg-[#0c0c0e]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(46,84,254,0.18)] text-[11px] font-mono text-foreground/90 tracking-tight"
            >
              {/* Pulsing telemetry dot */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E54FE] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2E54FE]" />
              </span>
              <span className="truncate">{activeMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SystemTelemetryContext.Provider>
  );
}
