import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import HomePage from "../pages/HomePage";
import UserListPage from "../pages/User/UserListPage";
import CreateUserPage from "../pages/User/CreateUserPage";
import CategorieListPage from "../pages/Categorie/CategorieListPage";
import CreateCategoriePage from "../pages/Categorie/CreatedCategoriePage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />}/>
        <Route path="/usuarios" element={<UserListPage />}/>
        <Route path="/usuarios/novo" element={<CreateUserPage />}/>
        <Route path="/usuarios/:uuid" element={<CreateUserPage />}/>
        <Route path="/categorias" element={<CategorieListPage/>}/>
        <Route path="/categorias/nova" element={<CreateCategoriePage />}/>
        <Route path="/categorias/:uuid" element={<CreateCategoriePage />}/>
      </Route>
    </Routes>
  )
}

export default AppRouter;
