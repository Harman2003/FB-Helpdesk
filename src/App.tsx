import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./setup/context/AuthProvider";
import { FacebookProvider } from "react-facebook";
import LandingPage from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Signin";
import NotFound from "./pages/NotFound";
import Connect from "./pages/Connect";
import Conversations from "./pages/Conversations";
import { Toaster } from "sonner";
import { PageProvider } from "./setup/context/PageProvider";
import Page from "./pages/Page";

function App() {
  const client = new QueryClient();
  return (
    <AuthProvider>
      <QueryClientProvider client={client}>
        <div className="App w-screen h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Page />} />
          </Routes>
        </div>
        <Toaster richColors position="top-center" />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
