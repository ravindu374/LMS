import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {SidebarProvider,} from "./context/SidebarContext";
import App from "./App";
import "./index.css";
import {AuthProvider,} from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { ConfirmProvider } from "./context/ConfirmContext";
import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <ErrorBoundary>
    <ToastProvider>
      <ConfirmProvider>
        <AuthProvider>
          <SidebarProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SidebarProvider>
        </AuthProvider>
      </ConfirmProvider>
    </ToastProvider>
  </ErrorBoundary>
);
