import TableComponent from "../TableComponent";
import api from "../../api";
import { useEffect, useState } from "react";
import moment from "moment";

const CategorieTable = () => {
  const [categories, setCategories] = useState([]);
  const [dataError, setDataError] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 0,
    lastPage: 1,
  });
  const [paginationNumbers, setPaginationNumbers] = useState([]);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const columns = [
    { key: 'name', label: 'Nome' },
    { key: 'slug', label: 'Url' },
    { key: 'views', label: 'Visualizações'},
    { key: 'createdAt', label: 'Criado em:' },
  ];

  const handlePreviousPage = () => {
    if (pagination.currentPage > 1) {
      setPagination(prevPagination => ({
        ...prevPagination,
        currentPage: prevPagination.currentPage - 1
      }));
    }
  };

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.lastPage) {
      setPagination(prevPagination => ({
        ...prevPagination,
        currentPage: prevPagination.currentPage + 1
      }));
    }
  };

  const getCategoriesByName = async (value) => {
    try {
      if (value && value.length >= 1 && value.trim() !== '') {
        const response = await api.get(`/categories/${value}/name/?page=${pagination.currentPage}&perPage=${pagination.perPage}`)
        console.log(response)
        const { data } = response.data;
        setCategories(data)

        const pages = response.data.pagination;

        setPagination({
          currentPage: pages.currentPage,
          lastPage: pages.lastPage,
          perPage: pages.perPage,
        });

        setCategories(response.data.data);

        const numbers = [];

        for (let i = 1; i <= pages.lastPage; i++) {
          numbers.push(i);
        }

        setPaginationNumbers(numbers);
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getcategoriesData = async () => {
      try {
        const response = await api.get(`/categories/?page=${pagination.currentPage}&perPage=${pagination.perPage}`);
        const { data, pagination: pages } = response.data;
        console.log(data)

        setPagination({
          currentPage: pages.currentPage,
          lastPage: pages.lastPage,
          perPage: pages.perPage,
        });
        setCategories(data);

        const numbers = []

        for (let i = 1; i <= pages.lastPage; i++) {
          numbers.push(i)
        }
        setPaginationNumbers(numbers);
      } catch (error) {
        console.log(error);
        setDataError(true);
      }
    };

    getcategoriesData();
    getCategoriesByName(searchValue)

  }, [pagination.currentPage, pagination.perPage, searchValue]);

  const handleDelete = async (uuid) => {
    const confirmDelete = window.confirm('Deseja deletar o usuário?');

    if (confirmDelete) {
      try {
        const response = await api.delete(`/categories/${uuid}`);
        if (response.status === 200) {
          setMessage(true);

          const newList = categories.filter(categorie => categorie.uuid !== uuid);
          setCategories(newList);

          setTimeout(() => {
            setMessage(false);
          }, 2000);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      }
    }
  };

  return (
    <>
      <div className="input-group mb-4">
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          className="form-control mb-4 mt-4 me-2 ms-4"
          placeholder={'Busque usuário por e-mail...'}
          aria-describedby="basic-addon1"
        />
        <div className="input-group-prepend mb-4 mt-4 ms-2 me-4">
          <button
            onClick={() => getCategoriesByName(searchValue)}
            className="btn btn-outline-secondary border-0 bg-primary"
            type="button"
          >
            <i className="bi bi-search text-white"></i>
          </button>
        </div>
      </div>
      <TableComponent
      data={categories}
      columns={columns}
      renderDate={(row, item) => {
        if (item.key === 'createdAt') {
          return moment(row[item.key]).format('DD/MM/YYYY HH:mm');
        }
        return row[item.key];
      }}
      renderTag={(row, item) => {
        if (item.key === 'emailVerifiedAt' && row[item.key] !== null) {
          return (
            <div className='tag-sucsess rounded text-center w-15 d-block mx-auto'>
              <span className="small fw-367">SIM</span>
            </div>
          );
        } else if (item.key === 'emailVerifiedAt' && row[item.key] === null) {
          return (
            <div className='tag-danger rounded text-center w-15 d-block mx-auto'>
              <span className="small fw-367">NÃO</span>
            </div>
          );
        } else if (row[item.key] === 'CLIENT') {
          return (
            <div className='tag-sucsess rounded text-center w-60 d-block mx-auto'>
              <span className="small fw-367">CLIENTE</span>
            </div>
          );
        } else if (row[item.key] === 'ADMIN') {
          return (
            <div className='tag-danger rounded text-center w-60 d-block mx-auto'>
              <span className="small fw-367">ADMIN</span>
            </div>
          );
        } else {
          return null;
        }
      }}
      placeholder={'Busque usuário por e-mail...'}
      dataError={dataError}
      message={message}
      messageText={'Usuário removido com sucesso!'}
      error={error}
      errorText={'Erro ao remover usuário!'}
      handleDelete={handleDelete}
      currentPage={pagination.currentPage}
      lastPage={pagination.lastPage}
      handlePreviousPage={handlePreviousPage}
      handleNextPage={handleNextPage}
      paginationNumbers={paginationNumbers}
      onClickPageItem={(page) => setPagination({
        ...pagination,
        currentPage: page,
      })}
    />
    </>
  );
};

export default CategorieTable;
