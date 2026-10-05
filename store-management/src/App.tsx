import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routing/Routes";
import MuiThemeProvider from "./providers/MuiThemeProvider";
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider>
        <BrowserRouter>
          <Toaster position="top-center" />
          <AppRoutes />
        </BrowserRouter>
      </MuiThemeProvider>
    </QueryClientProvider>
  )
}

export default App
