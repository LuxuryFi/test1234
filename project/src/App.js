import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/about";
import Article from "./pages/article";
import ArticleDetailPage from "./pages/article/detail";
import ClientBookAppointmentPage from "./pages/clientBookAppointment";
import ContactPage from "./pages/contact";
import Home from "./pages/home";
import NoMatch from "./pages/noMatch";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Verify from "./pages/verify";
import PrivateRoute from "./routes/PrivateRoute";
import appRoutes from "./routes/routes";
import BookDetailPage from "./pages/bookStore/detail";

function App() {
  const renderRoutes = (routes) =>
    routes.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        element={<PrivateRoute>{route.element}</PrivateRoute>}
      >
        {route.subnavs &&
          route.subnavs.map((subRoute, index) => (
            <Route
              key={index}
              path={subRoute.path}
              element={
                <PrivateRoute roles={subRoute.roles}>
                  {subRoute.element}
                </PrivateRoute>
              }
            ></Route>
          ))}
      </Route>
    ));

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="appointment"
          element={<ClientBookAppointmentPage />}
        ></Route>
        <Route path="signin" element={<SignIn />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="contact" element={<ContactPage />}></Route>
        <Route path="verify" element={<Verify />}></Route>
        <Route path="about" element={<AboutPage />}></Route>
        <Route path="articles" element={<Article type="all" />}></Route>
        <Route path="articles/tag/:id" element={<Article type="tag" />}></Route>
        <Route
          path="articles/type/:id"
          element={<Article type="type" />}
        ></Route>
        <Route
          path="/articles/detail/:slug"
          element={<ArticleDetailPage />}
        ></Route>
        <Route path="/books/:book_id" element={<BookDetailPage />}></Route>
        {renderRoutes(appRoutes)}
        <Route path="*" element={<NoMatch />}></Route>
      </Routes>
    </>
  );
}

export default App;
