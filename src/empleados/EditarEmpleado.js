import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditarEmpleado() {
  const urlBase = "http://localhost:8080/rh-sena/empleados";
  const urlDepartamentos = "http://localhost:8080/rh-sena/departamentos";
  const navegacion = useNavigate();
  const { id } = useParams();

  const [empleado, setEmpleado] = useState({
    nombreEmpleado: "",
    departamento: null,
    sueldoEmpleado: "",
  });

  const [departamentos, setDepartamentos] = useState([]);

  const { nombreEmpleado, departamento, sueldoEmpleado } = empleado;

  useEffect(() => {
    cargarEmpleado();
    cargarDepartamentos();
  }, []);

  const cargarEmpleado = async () => {
    try {
      const resultado = await axios.get(`${urlBase}/${id}`);
      setEmpleado(resultado.data);
    } catch (error) {
      console.error("Error al cargar empleado:", error);
    }
  };

  const cargarDepartamentos = async () => {
    try {
      const resultado = await axios.get(urlDepartamentos);
      setDepartamentos(resultado.data);
    } catch (error) {
      console.error("Error al cargar departamentos:", error);
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setEmpleado({ ...empleado, [name]: value });
  };

  const onSelectChange = (e) => {
    const departamentoId = e.target.value;
    const departamentoSeleccionado = departamentos.find(dep => dep.idDepartamento.toString() === departamentoId);
    setEmpleado({ ...empleado, departamento: departamentoSeleccionado });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${urlBase}/${id}`, empleado);
      navegacion("/");
    } catch (error) {
      console.error("Error al guardar empleado:", error);
    }
  };

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Editar Empleado</h3>
      </div>

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="nombreEmpleado" className="form-label">Nombre</label>
          <input
            type="text"
            class
            ="form-control"
id="nombreEmpleado"
name="nombreEmpleado"
value={nombreEmpleado}
onChange={onInputChange}
required
/>
</div>
    <div className="mb-3">
      <label htmlFor="departamento" className="form-label">Departamento</label>
      <select
        className="form-select"
        id="departamento"
        name="departamento"
        value={departamento ? departamento.idDepartamento : ""}
        onChange={onSelectChange}
        required
      >
        <option value="" disabled>Seleccione un departamento</option>
        {departamentos.map((dep) => (
          <option key={dep.idDepartamento} value={dep.idDepartamento}>
            {dep.nombreDepartamento}
          </option>
        ))}
      </select>
    </div>

    <div className="mb-3">
      <label htmlFor="sueldoEmpleado" className="form-label">Sueldo</label>
      <input
        type="number"
        step="any"
        className="form-control"
        id="sueldoEmpleado"
        name="sueldoEmpleado"
        value={sueldoEmpleado}
        onChange={onInputChange}
        required
      />
    </div>
    
    <div className="container text-center">
      <button type="submit" className="btn btn-primary me-3">Guardar</button>
      <a href="/" className="btn btn-danger">Volver</a>
    </div>
  </form>
</div>
);
}