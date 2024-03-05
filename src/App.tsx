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
              <Route
                path="/connect"
                element={
                  <FacebookProvider appId="1373741216661586">
                    <Connect />
                  </FacebookProvider>
                }
              />
              <Route path="/chat/*" element={<Conversations />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
        <Toaster richColors position="top-center" />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
