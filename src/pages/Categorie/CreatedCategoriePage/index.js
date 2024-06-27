import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../../api'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CreateCategoriePage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(false);
  const { uuid } = useParams();
  const [category, setCategory] = useState({
    name: '',
    slug: '',
  })

  const validationSchema = Yup.object({
    name: Yup.string().required('O campo nome é obrigatório.'),
    slug: Yup.string(),
  });

  const handleSubmit = async (
    values,
    { resetForm }
  ) => {
    try {
      let response;
      if (uuid) {
        response = await api.put(`/categories/${uuid}`, values);
      } else {
        response = await api.post('/categories', values);
      }
      console.log(response)
      if (response.status === 201 || response.status === 200) {
        setMessage(true)
        resetForm()

        setTimeout(() => {
          setMessage(false);
          navigate('/categorias')
        }, 2000);
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getcategorie = async () => {
      try {
        const response = await api.get(`/categories/${uuid}`);
        console.log(response)
        setCategory({
          name: response.data.name,
          slug: response.data.slug,
        })
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    }

    if (uuid) {
      getcategorie();
    }
  }, [uuid])

  const formik = useFormik({
    initialValues: {
      name: category.name || '',
      slug: category.slug|| '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <h2 className="p-4">{uuid ? 'Editar Categoria' : 'Nova Categoria'}</h2>
      {message &&
        <div className="d-flex justify-content-end w-100">
          <div className="alert alert-success w-50 mx-4" role="alert">
            Categoria {uuid ? 'editada' : 'criada'} com sucesso!
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
          <label className="form-label">Url</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formik.values.slug || ''}
            onChange={formik.handleChange}
            className="form-control"
          />
          {formik.touched.slug && formik.errors.slug && (
            <div className="error">{formik.errors.slug}</div>
            )}
        </div>
        <div className="col-md-12">
          <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>Salvar</button>
        </div>
      </form>
    </>
  )
}

export default CreateCategoriePage;
