import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

document.title = "AKConseil";

const mainFavicon =
  (document.querySelector('link[rel="icon"]') as HTMLLinkElement | null) ??
  (document.createElement("link") as HTMLLinkElement);
mainFavicon.setAttribute("rel", "icon");
mainFavicon.setAttribute("type", "image/x-icon");
mainFavicon.href = "/favicon.ico?v=13";
if (!mainFavicon.parentElement) {
  document.head.appendChild(mainFavicon);
}

createRoot(document.getElementById("root")!).render(<App />);
