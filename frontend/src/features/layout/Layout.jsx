import { Outlet, useNavigation, useLocation } from "react-router";
import NavBar from "../Ui/NavBar";
import Loader from "../Ui/Loader";
import { useSelector } from "react-redux";
import Footer from "../Ui/Footer";

function AppLayout() {
  const navigation = useNavigation();
  const location = useLocation();
  const isLoading = navigation.state === "loading";
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const hideNavBarRoutes = ["/login", "/register"];
  const shouldShowNavBar = !hideNavBarRoutes.includes(location.pathname);

  return (
    <div className={`${darkMode ? "bg-dark-bg" : "bg-light-bg"} relative`}>
      {isLoading && <Loader />}
      {shouldShowNavBar && <NavBar />}
      <main className="min-h-dvh">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
