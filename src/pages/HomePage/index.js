import { useState } from 'react'
import api from '../../api'
import { useEffect } from 'react';

const HomePage = () => {
  const [users, setUsers] = useState();
  const [categories, setCategories] = useState();
  const [usersCount, setUsersCount] = useState();
  const [categoriesCount, setCategoriesCount] = useState();
  const [lastAddedUser, setLastAddedUser] = useState();
  const [lastAddedCategory, setLastAddedCategory] = useState();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await api.get('/users')
        setUsers(response.data.data)
        setUsersCount(response.data.pagination.total)
        setLastAddedUser(response.data.data[0])

      } catch (error) {
        console.log(error)
      }
    }
    const getCategories = async () => {
      try {
        const response = await api.get('/categories')
        setCategories(response.data.data)
        setCategoriesCount(response.data.pagination.total)
        setLastAddedCategory(response.data.data[0])

      } catch (error) {
        console.log(error)
      }
    }

    getUsers()
    getCategories()
  }, [])
  return (
    <>
      <h2 className="color-primary p-4">Início</h2>
      <div className="d-flex justify-content-center">
        <div className="card w-45 me-5 bg-primary text-white border-0 p-3">
          <div className="card-body">
            <h2 className="card-title">Usuários</h2>
            <h4 className="card-subtitle mb-2 text-white">Total: {usersCount} </h4>
            <p className="card-text">Último usuário adicionado:
              {' '}
              {lastAddedUser? lastAddedUser.name : ''}
              {' '}
              {lastAddedUser? lastAddedUser.lastname : ''}
              {' '}
            </p>
          </div>
        </div>
        <div className="card w-45 bg-primary text-white border-0 p-3" >
          <div className="card-body">
            <h2 className="card-title">Categorias</h2>
            <h4 className="card-subtitle mb-2 text-white">Total: {categoriesCount}</h4>
            <p className="card-text">Última categoria adicionada:
              {' '}
              {lastAddedCategory? lastAddedCategory.name : ''}
              {' '}
              {lastAddedCategory? lastAddedCategory.slug : ''}
              {' '}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;
