import axios from "axios";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

export default function ListadoEmpleados() {
  const urlBase = "http://localhost:8080/rh-sena/empleados";
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    try {
      const resultado = await axios.get(urlBase);
      setEmpleados(resultado.data);
    } catch (error) {
      console.error("Error al cargar empleados:", error);
    }
  };

  const eliminarEmpleado = async (id) => {
    await axios.delete(`${urlBase}/${id}`);
    cargarEmpleados();
  };

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Sistema de Recursos Humanos</h3>
      </div>

      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Empleado</th>
            <th scope="col">Departamento</th>
            <th scope="col">Sueldo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            // Iteramos el arreglo de empleados
            empleados.map((empleado, indice) => (
              <tr key={indice}>
                <th scope="row">{empleado.idEmpleado}</th>
                <td>{empleado.nombreEmpleado}</td>
                <td>{empleado.departamento ? empleado.departamento.nombreDepartamento : "Sin asignar"}</td>
                <td>
                  <NumericFormat
                    value={empleado.sueldoEmpleado}
                    displayType={"text"}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix={"$"}
                    decimalScale={0}
                    fixedDecimalScale
                  />
                </td>
                <td>
                  <div>
                    <Link
                      to={`/editar/${empleado.idEmpleado}`}
                      className="btn btn-warning btn-sm me-3"
                    >
                      Editar
                    </Link>
                    <button 
                      onClick={() => eliminarEmpleado(empleado.idEmpleado)}
                      className="btn btn-danger btn-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
