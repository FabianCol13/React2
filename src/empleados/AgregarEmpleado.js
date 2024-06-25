import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AgregarEmpleado() {
  let navegacion = useNavigate();

  const [empleado, setEmpleado] = useState({
    nombreEmpleado: "",
    departamento: null,
    sueldoEmpleado: "",
  });

  const [departamentos, setDepartamentos] = useState([]);
  
  const { nombreEmpleado, departamento, sueldoEmpleado } = empleado;

  useEffect(() => {
    const cargarDepartamentos = async () => {
      const urlDepartamentos = "http://localhost:8080/rh-sena/departamentos";
      const resultado = await axios.get(urlDepartamentos);
      setDepartamentos(resultado.data);
    };
    cargarDepartamentos();
  }, []);

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
    const urlBase = "http://localhost:8080/rh-sena/empleados";
    await axios.post(urlBase, empleado);
    navegacion("/");
  };

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Registrar Empleado</h3>
      </div>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="nombreEmpleado" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombreEmpleado"
            name="nombreEmpleado"
            value={nombreEmpleado}
            onChange={(e) => onInputChange(e)}
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
            onChange={(e) => onSelectChange(e)}
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
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        
        <div className="container text-center">
          <button type="submit" className="btn btn-primary me-3">Registrar</button>
          <a href="/" className="btn btn-danger">Volver</a>
        </div>
      </form>
    </div>
  );
}
