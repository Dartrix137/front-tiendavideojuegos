import { Fragment, React, useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
const Alquileres = () => {
    const [alquileres, setAlquileres] = useState([])
    const [modalEditar, setModalEditar] = useState(false);
    const [modalAceptado, setModalAceptado] = useState(false);
    const [idAlquiler, setIdAlquiler] = useState();
    const API = "http://localhost:3001"
    const peticionGet = () => {
        axios.get(`${API}/alquileres`).then(response => {
            setAlquileres(response.data)
        })
    }
    const peticionPut = async (id, fecha) => {
        await axios.put(`${API}/actualizar-fechavuelta-alquiler/${id}`, { "fechadevuelta": fecha }).then(response => {
            setModalEditar(false);
            setModalAceptado(true);
        });
    }
    const submitUpdate = (e) => {
        e.preventDefault();
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
        let fechaDeVuelta = [year, mes, day].join('-');
        peticionPut(idAlquiler, fechaDeVuelta)
    };

    const refresh = (e) => {
        e.preventDefault();
        setModalAceptado(false)
        window.location.reload();
    }
    useEffect(() => {
        peticionGet()
    }, [])
    return (
        <Fragment>
            <main className="bg">
                <div className="container">
                    <div className="row">
                        <div className="mt-5"></div>
                        <div className="col-lg-12">
                            <div className="table-responsive">
                                <table id="TableUser" className="table table-hover table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Juego</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Telefono</th>
                                            <th scope="col">Fecha alquiler</th>
                                            <th scope="col">Fecha de vuelta</th>
                                            <th scope="col">Actualizar alquiler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {alquileres.map((alquiler) => {
                                            return (
                                                <tr key={alquiler.id}>
                                                    <th scope="row">{alquiler.id}</th>
                                                    <td>{alquiler.juego}</td>
                                                    <td>{alquiler.nombre}</td>
                                                    <td>{alquiler.telefono}</td>
                                                    <td>{alquiler.fechaalquiler.split("T")[0]}</td>
                                                    <td>{alquiler.fechadevuelta ? alquiler.fechadevuelta.split("T")[0] : ""}</td>
                                                    <td>
                                                        <div className="btn-group d-flex justify-content-center" role="group">
                                                            <button type="button" className="btn btn-warning btn-table" data-toggle="modal"
                                                                data-target="#modalCRU" onClick={() => { setModalEditar(true); setIdAlquiler(alquiler.id) }}>
                                                                <i className='fa fa-calendar'></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            <Modal isOpen={modalEditar}>
                <div className="modal-header">
                    <h5 className="modal-title fs-2" id="exampleModalLabel">Establecer fecha de vuelta</h5>
                </div>
                <ModalBody>
                    <form id="formEditarFehcaDeVuelta">
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="Precio" className="col-form-label">¿Desea registrar el retorno del juego a la tienda?</label>
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
        </Fragment >
    )
}
export default Alquileres;