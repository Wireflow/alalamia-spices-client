import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HashRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 6 * 1000,
      refetchInterval: 5 * 60 * 1000, // refetch every 5 minutes
      networkMode: "offlineFirst",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <App />
      <Toaster />
    </Router>
  </QueryClientProvider>
);

// Remove Preload scripts loading
postMessage({ payload: "removeLoading" }, "*");

// // Use contextBridge
// window.ipcRenderer.on("main-process-message", (_event, message) => {
//   console.log(message);
// });
