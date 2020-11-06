import React, { useState, useEffect } from 'react';
import { db } from '../Firebase';
//import { toast } from "react-toastify";

const EmpleadosForm = (props) => {
  const initialStateValues = {
    nombre: '',
    apellido: '',
    cargo: '',
  };

  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.addOrEditEmpleado(values);
    setValues({ ...initialStateValues });
  };

  const getEmpleadoById = async (id) => {
    const doc = await db
      .collection('Empleados')
      .doc(id)
      .get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === '') {
      setValues({ ...initialStateValues });
    } else {
      //https://stackoverflow.com/questions/56059127/how-to-fix-this-error-function-collectionreference-doc
      if (props.currentId !== null && props.currentId !== undefined) {
        getEmpleadoById(props.currentId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId]);

  return (
    <form onSubmit={handleSubmit} className="card card-body border-primary">
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">contact_page</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese nombre"
          value={values.nombre}
          name="nombre"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">contact_page</i>
        </div>
        <input
          type="text"
          value={values.apellido}
          name="apellido"
          placeholder="Ingrese apellido"
          className="form-control"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">exposure</i>
        </div>
        <input
          type="text"
          value={values.cargo}
          name="cargo"
          placeholder="Ingrese cargo"
          className="form-control"
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-primary btn-block">
        {props.currentId === '' ? 'Guardar' : 'Actualizar'}
      </button>
    </form>
  );
};

export default EmpleadosForm;
