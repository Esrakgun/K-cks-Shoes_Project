import type { FC } from "react";
import useUser from "../../service/user";
import Loader from "../loader";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../header";

interface Props {
    allowedRoles?: string[];
}


const Protected: FC<Props> = ({ allowedRoles }) => {
    // Oturumu Açık olan Kulanıcı verilerini al:
    const { user, isLoading } = useUser();
    // console.log(user);

    // Kullanıcı verileri Yüklenirken Loader Göster:
    if (isLoading) return <Loader />;
    console.log(!allowedRoles?.includes(user?.role));

    // Eğer Kullanıcının Oturumu kapalıysa veya rolü yetersizse yani kullancıların rolleri izin verilen rollerde değilse  Login sayfasına yönlendir:
    if (allowedRoles && !allowedRoles?.includes(user?.role)) return <Navigate to="/" replace />;

    // Eğer oturum açıksa Alt Route'ları Render Et:
     if (user)
    return (
      <div>
        <Header />
        <Outlet />
      </div>
    );
    
  // kullanıcı oturumu kapalıysa login sayfasına yönlendir
  return <Navigate to="/login" replace />;
};

export default Protected;



