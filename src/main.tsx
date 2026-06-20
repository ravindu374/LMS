import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {SidebarProvider,} from "./context/SidebarContext";
import App from "./App";
import "./index.css";
import {AuthProvider,} from "./context/AuthContext";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <AuthProvider>
    <SidebarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SidebarProvider>
  </AuthProvider>
);