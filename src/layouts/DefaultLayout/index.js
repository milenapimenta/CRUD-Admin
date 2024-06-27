import { Link, Outlet, useLocation } from "react-router-dom";

const DefaultLayout = () => {
  const { pathname } = useLocation();

  const getIsActivePathname = (activePathname) => {
    return pathname === activePathname || pathname.startsWith(activePathname + "/");
  }

  return (
    <div className="d-flex w-100 h-100vh">
        <nav className="h-100vh w-15 p-4 bg-primary">
          <h1 className="pb-4 text-white">LOGO</h1>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item mb-3">
            <Link className={`nav-link ${getIsActivePathname("/")? 'active' : '' } text-white `} to="/">
              {getIsActivePathname("/")? <i className="bi bi-house-fill"></i> :  <i className="bi bi-house"></i>}
                <span className="px-2">Início</span>
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link className={`nav-link ${getIsActivePathname("/usuarios") ? 'active' : ''} text-white`} to="/usuarios">
              {getIsActivePathname("/usuarios")? <i className="bi bi-people-fill"></i> :  <i className="bi bi-people"></i>}
                <span className="px-2">Usuários</span>
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link className={`nav-link ${getIsActivePathname("/categorias") ? 'active' : ''} text-white`} to="/categorias">
              {getIsActivePathname("/categorias")? <i className="bi bi-collection-fill"></i> :  <i className="bi bi-collection"></i>}
                <span className="px-2">Categorias</span>
              </Link>
            </li>
          </ul>
        </nav>
      <div className="w-85 h-100vh bg-white">
          <Outlet />
      </div>
    </div>
  )
}

export default DefaultLayout;
