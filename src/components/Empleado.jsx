import React, { useEffect, useState } from 'react';
import EmpleadosForm from './EmpleadosForm';

import { db } from '../Firebase';
import { toast } from 'react-toastify';

const Empleados = () => {
  const [Empleados, setEmpleados] = useState([]);
  const [currentId, setCurrentId] = useState('');

  const getEmpleados = async () => {
    db.collection('Empleados').onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setEmpleados(docs);
    });
  };

  const onDeleteEmpleado = async (id) => {
    if (window.confirm('Está seguro de que desea eliminar este registro?')) {
      await db
        .collection('Empleados')
        .doc(id)
        .delete();
      toast('Se elimino un Empleado', {
        type: 'error',
        //autoClose: 2000
      });
    }
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  const addOrEditEmpleado = async (EmpleadoObject) => {
    try {
      if (currentId === '') {
        await db
          .collection('Empleados')
          .doc()
          .set(EmpleadoObject);
        toast('Se agrego un nuevo Empleado', {
          type: 'success',
        });
      } else {
        await db
          .collection('Empleados')
          .doc(currentId)
          .update(EmpleadoObject);
        toast('Se actualizaron los datos de un Empleado', {
          type: 'info',
        });
        setCurrentId('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="col-md-4 p-2">
        <h2>Agregar Empleado</h2>
        <EmpleadosForm {...{ addOrEditEmpleado, currentId, Empleados }} />
      </div>

      <div className="col-md-8 p-2">
        <div class="container">
          <h2>Lista de Empleados</h2>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Cargo</th>
                <th>Aciones</th>
              </tr>
            </thead>
            <tbody>
              {Empleados.map((Empleado) => (
                <tr key={Empleado.id}>
                  <td>{Empleado.nombre}</td>
                  <td>{Empleado.apellido}</td>
                  <td>{Empleado.cargo}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => setCurrentId(Empleado.id)}
                    >
                      Editar
                    </button>
                    &nbsp; &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => onDeleteEmpleado(Empleado.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Empleados;
