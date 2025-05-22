import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { FC } from "react";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Detail from "./pages/detail";
import Dashbord from "./pages/dashboard";
import Protected from "./components/protected";
import Edit from "./pages/edit";
import Create from "./pages/create";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Bütün kullanıcıların erişebilceği sayfalar:  */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Kullanıcı giriş Yapmışsa erişebilceği sayfalar: */}
        <Route element={<Protected />}>
          <Route path="/" element={<Home />} />
          <Route path="/shoe/:id" element={<Detail />} />
        </Route>

        {/* Admin rolüne sahip kullanıcı erişebilceği sayfalar: */}
        <Route element={<Protected allowedRoles={["admin"]} />}>
          <Route path="/dashboard" element={<Dashbord />} />
          <Route path="/dashboard/create" element={<Create />} />
          <Route path="/dashboard/edit/:id" element={<Edit />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
