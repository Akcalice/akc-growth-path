import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

document.title = "AKConseil";

const mainFavicon =
  (document.querySelector('link[rel="icon"]') as HTMLLinkElement | null) ??
  (document.createElement("link") as HTMLLinkElement);
mainFavicon.setAttribute("rel", "icon");
mainFavicon.setAttribute("type", "image/svg+xml");
mainFavicon.href = "/favicon-akconseil.svg?v=11";
if (!mainFavicon.parentElement) {
  document.head.appendChild(mainFavicon);
}

createRoot(document.getElementById("root")!).render(<App />);
