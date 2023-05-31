import React, { useState, Fragment, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "./style/card.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const Card = ({ juego }) => {
  const [fecha, setFecha] = useState(juego.fechalanzamiento.split("T")[0]);
  const API = "http://localhost:3001";
  const [users, setUsers] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalAlquilar, setModalAlquilar] = useState(false);
  const [modalAceptado, setModalAceptado] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState("");
  const [precio, setPrecio] = useState(0)
  const peticionGet = async () => {
    await axios.get(`${API}/usuarios`).then((response) => {
      setUsers(response.data);
      console.log(response.data);
      console.log(users);
    });
    setModalAlquilar(true);
  };

  const peticionPost = async (user, videojuego) => {
    const date = new Date();
    let mes;
    let year = date.getFullYear().toString();
    let month = date.getMonth() + 1;
    if (month < 10) {
      mes = "0" + month.toString();
    } else {
      mes = month.toString();
    }
    let day = date.getDate();
    let fechaalquiler = [year, mes, day].join('-');
    await axios.post(`${API}/crear-alquiler`, { "usuario": user, "videojuego": videojuego, "fechaalquiler": fechaalquiler }).then(response => {
      setModalAlquilar(false);
      setModalAceptado(true);
    });
  };

  const peticionPut = async (id, precio) => {
    await axios.put(`${API}/actualizar-precio/${id}`, { "precio": precio }).then(response => {
      setModalEditar(false);
      setModalAceptado(true);
    });
  }
  const submit = (e) => {
    e.preventDefault();
    peticionPost(usuarioActual, juego.id);
  };
  const submitUpdate = (e) => {
    e.preventDefault();
    peticionPut(juego.id, precio)
  };

  const refresh = (e) => {
    e.preventDefault();
    setModalAceptado(false)
    window.location.reload();
  }
  useEffect(() => {
    console.log(usuarioActual)
  }, [usuarioActual])
  return (
    <Fragment>
      <div className="col-md-4 p-4">
        <div className='card'>
          <img src={juego.portada} alt={juego.nombre} className='card-img-top' width='100' height='400' />
          <div className="card-body bg-light grid">
            <h5>Alquiler: {juego.precio}</h5>
            <h5>Empresa: {juego.productor}</h5>
            <h5>Lanzamiento: {fecha}</h5>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col d-flex justify-content-center'>
                  <button className="btn btn-success" onClick={peticionGet}><i className='fa fa-shopping-cart fa-2x'></i> </button>
                </div>
                <div className='col d-flex justify-content-center'>
                  <button className="btn btn-warning" onClick={() => { setModalEditar(true) }}><i className="fa fa-edit fa-2x"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modalAlquilar}>
        <div className="modal-header">
          <h5 className="modal-title fs-2" id="exampleModalLabel">Alquilar {juego.nombre}</h5>
        </div>
        <ModalBody>
          <form id="formAlquilar">
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="Precio" className="col-form-label">Precio: </label>
                <input type="text" className="form-control border-dark" name="precio" id="precio" value={juego.precio} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="Usuario" className="col-form-label">Usuario: </label>
                <select className="form-select border-dark" name="usuario" id="usuario">
                  <option selected="true" disabled="disabled" value="">....</option>
                  {
                    users.map((usuario) => {
                      return (<option name="usuario" key={usuario.id} onClick={() => setUsuarioActual(usuario.id)}>{usuario.nombre + " " + usuario.apellido}</option>);
                    })
                  }
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModalAlquilar(false)}>Cancelar</button>
              <button type="button" id="btnEditar" className="btn btn-primary" onClick={submit}>Alquilar</button>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal isOpen={modalEditar}>
        <div className="modal-header">
          <h5 className="modal-title fs-2" id="exampleModalLabel">Actualizar precio {juego.nombre}</h5>
        </div>
        <ModalBody>
          <form id="formEditarPrecio">
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="Precio" className="col-form-label">Precio: </label>
                <input type="number" required className="form-control border-dark" name="precio" id="precio" min="0" step="0.01" pattern="^\d+(?:\.\d{1,2})?$" placeholder={juego.precio} onChange={(e) => setPrecio(e.target.value)} />
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModalEditar(false)}>Cancelar</button>
          <button type="button" id="btnActualizar" className="btn btn-primary" onClick={submitUpdate}>Actualizar</button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalAceptado}>
        <ModalBody>
          Petición correcta
        </ModalBody>
        <ModalFooter>
          <button type="submit" className="btn btn-secondary" onClick={refresh}>Aceptar</button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default Card;
