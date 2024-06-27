import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../../api'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CreateUserPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(false);
  const { uuid } = useParams();
  const [user, setUser] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
  })

  const validationSchema = Yup.object({
    name: Yup.string().required('O campo nome é obrigatório.'),
    lastname: Yup.string().required('O campo sobrenome é obrigatório.'),
    email: Yup.string().email('E-mail inválido!').required('O campo E-mail é obrigatório.'),
    password: Yup.string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres.')
      .required('O campo senha é obrigatório.'),
  });

  const handleSubmit = async (
    values,
    { resetForm }
  ) => {
    try {
      let response;
      if (uuid) {
        response = await api.put(`/users/${uuid}`, values);
      } else {
        response = await api.post('/users', values);
      }
      console.log(response)
      if (response.status === 201 || response.status === 200) {
        setMessage(true)
        resetForm()

        setTimeout(() => {
          setMessage(false);
          navigate('/usuarios')
        }, 2000);
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get(`/users/${uuid}`);
        setUser({
          name: response.data.name,
          lastname: response.data.lastname,
          email: response.data.email,
          password: response.data.password,
        })
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    }

    if (uuid) {
      getUser();
    }
  }, [uuid])

  const formik = useFormik({
    initialValues: {
      name: user.name || '',
      lastname: user.lastname || '',
      email: user.email || '',
      password: user.password || '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <h2 className="p-4">{uuid ? 'Editar Usuário' : 'Novo Usuário'}</h2>
      {message &&
        <div className="d-flex justify-content-end w-100">
          <div className="alert alert-success w-50 mx-4" role="alert">
            Usuário {uuid ? 'editado' : 'criado'} com sucesso!
          </div>
        </div>}
      <form onSubmit={formik.handleSubmit} className="row g-3 needs-validation m-4" noValidate>
        <div className="col-md-6">
          <label className="form-label">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name || ''}
            onChange={formik.handleChange}
            className="form-control"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
            )}
        </div>
        <div className="col-md-6">
          <label className="form-label">Sobrenome</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formik.values.lastname || ''}
            onChange={formik.handleChange}
            className="form-control"
          />
          {formik.touched.lastname && formik.errors.lastname && (
            <div className="error">{formik.errors.lastname}</div>
            )}
        </div>
        <div className="col-md-12">
          <label className="form-label">E-mail</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formik.values.email || ''}
              onChange={formik.handleChange}
              className="form-control"
            />
            {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
            )}
        </div>
        <div className="col-md-6">
          <label className="form-label">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password || ''}
            onChange={formik.handleChange}
            className="form-control"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
            )}
        </div>
        <div className="col-md-12">
          <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>Salvar</button>
        </div>
      </form>
    </>
  )
}

export default CreateUserPage;
