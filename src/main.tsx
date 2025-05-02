import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<p>Fallback Content</p>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
