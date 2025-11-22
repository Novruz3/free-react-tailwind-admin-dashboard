import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <AppWrapper>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AppWrapper>
  </ThemeProvider>
);
