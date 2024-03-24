import { useEffect, useRef } from "react";

interface Config {
  onComplete: (code: string) => void;
  onError?: (error: string) => void;
  timeToWait?: number;
}

const useBarcodeScanner = ({
  onComplete,
  onError,
  timeToWait = 200,
}: Config) => {
  const buffer = useRef<string>("");
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const char = String.fromCharCode(event.keyCode);

      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        if (buffer.current.length > 0) {
          onComplete(buffer.current);
        } else {
          onError && onError("Empty scan input");
        }
        buffer.current = "";
      }, timeToWait);

      buffer.current += char;
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [onComplete, onError, timeToWait]);

  return null;
};

export default useBarcodeScanner;
