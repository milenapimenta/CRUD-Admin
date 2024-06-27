import { Link } from "react-router-dom";
import UserTable from "../../../components/UserTable";

const UserListPage = () => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center m-0 p-0">
        <h3 className="color-primary p-4">Usuários</h3>
          <Link to='/usuarios/novo'>
            <button type="button" className="btn btn-primary m-4">
              <i className="bi bi-plus h5"></i>
              <span className="px-2">Novo usuário</span>
            </button>
          </Link>
      </div>
      <UserTable />
    </>
  )
}

export default UserListPage;
