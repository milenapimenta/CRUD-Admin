import { Link } from "react-router-dom";
import CategorieTable from "../../../components/CategorieTable";

const CategorieListPage = () => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center m-0 p-0">
        <h3 className="color-primary p-4">Categorias</h3>
          <Link to='/categorias/nova'>
            <button type="button" className="btn btn-primary m-4">
              <i className="bi bi-plus h5"></i>
              <span className="px-2">Nova categoria</span>
            </button>
          </Link>
      </div>
      <CategorieTable />
    </>
  )
}

export default CategorieListPage;
