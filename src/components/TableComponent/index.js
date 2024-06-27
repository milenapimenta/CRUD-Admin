import { Link } from "react-router-dom";

const TableComponent = ({
  data,
  dataError,
  message,
  messageText,
  errorText,
  error,
  columns,
  renderDate,
  renderTag,
  handleDelete,
  currentPage,
  lastPage,
  handlePreviousPage,
  handleNextPage,
  paginationNumbers,
  onClickPageItem,
}) => {

  return (
    <>
     {dataError &&
        <h2 className="text-center">Erro ao buscar dados!</h2>
      }
      {message &&
        <div className="d-flex justify-content-end w-100">
          <div className="alert alert-success w-50 mx-4" role="alert">
            {messageText}
          </div>
        </div>
      }
      {error &&
        <div className="d-flex justify-content-end w-100">
          <div className="alert alert-danger" role="alert">
           {errorText}
          </div>
        </div>
      }
      <table className="table table-sm table-striped fs-14">
        <thead>
          <tr>
            {columns.map((item, index) => (
              <th key={index} scope="col">{item.label}</th>
            ))}
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((columnItem, colIndex) => (
                <td key={colIndex}>
                  {columnItem.key === 'createdAt' && renderDate(item, columnItem)}
                  {columnItem.key === 'role' && renderTag(item, columnItem)}
                  {columnItem.key === 'emailVerifiedAt' && renderTag(item, columnItem)}
                  {
                    columnItem.key !== 'createdAt' &&
                    columnItem.key !== 'role' &&
                    columnItem.key !== 'emailVerifiedAt' &&
                    item[columnItem.key]
                  }
                </td>
              ))}
              <td>
                <Link to={item.uuid}>
                  <button className="btn bg-primary mx-2">
                    <i className="bi bi-pencil-fill fs-14 text-white"></i>
                  </button>
                </Link>
                <button onClick={() => handleDelete(item.uuid)} className="btn bg-danger">
                  <i className="bi bi-trash3-fill fs-14 text-white"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button onClick={handlePreviousPage} className="rounded-circle page-link m-1">
              <i className="bi bi-caret-left fs-14"></i>
            </button>
          </li>
          {paginationNumbers.map((page, index) => (
            <li key={index} className={`page-item ${currentPage === page && 'active'} m-1`}>
              <button className="rounded-circle page-link"
                onClick={() => onClickPageItem(page)}>
                <span className="fs-14">{page}</span>
              </button>
            </li>
          ))}
          <li className="page-item">
            <button onClick={handleNextPage} className={`rounded-circle page-link ${currentPage === lastPage && 'disabled'} m-1`}>
              <i className="bi bi-caret-right fs-14"></i>
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default TableComponent;
