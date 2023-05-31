import { Fragment, React, useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState()
    const [apellido, setApellido]=useState();
    const [telefono, setTelefono]=useState();
    const [email, setEmail]= useState();
    const [modalCrear, setModalCrear] = useState(false);
    const [modalAceptado, setModalAceptado] = useState(false);
    const API = "http://localhost:3001"
    const peticionGet = () => {
        axios.get(`${API}/usuarios`).then(response => {
            setUsuarios(response.data)
        })
    }
    const peticionPost=async ()=>{
        await axios.post(`${API}/crear-usuario`, {"nombre": nombre, "apellido":apellido, "telefono":telefono, "email":email}).then(()=>{
            setModalCrear(false);
            setModalAceptado(true);
        })
    }

    useEffect(() => {
        peticionGet()
    }, [])

    const refresh = (e) => {
        e.preventDefault();
        setModalAceptado(false)
        window.location.reload();
    }

    const submit = (e) => {
        e.preventDefault();
        peticionPost()
    };
    return (
        <Fragment>
            <main className="bg">
                <div className="container">
                    <div className="row" align="center">
                        <div className="col p-2">
                            <button className="btn btn-primary p-2" onClick={() => { setModalCrear(true) }}><i class='fa fa-user-plus fa-2x'></i> </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mt-5"></div>
                        <div className="col-lg-12">
                            <div className="table-responsive">
                                <table id="TableUser" className="table table-hover table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Nombres</th>
                                            <th scope="col">Apellidos</th>
                                            <th scope="col">Telefono</th>
                                            <th scope="col">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usuarios.map((usuario) => {
                                            return (
                                                <tr key={usuario.id}>
                                                    <th scope="row">{usuario.id}</th>
                                                    <td>{usuario.nombre}</td>
                                                    <td>{usuario.apellido}</td>
                                                    <td>{usuario.telefono}</td>
                                                    <td>{usuario.email}</td>
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
            <Modal isOpen={modalCrear}>
                <div className="modal-header">
                    <h5 className="modal-title fs-2" id="exampleModalLabel">Crar usuario</h5>
                </div>
                <ModalBody>
                    <form id="crarUsuario">
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="Nombre" className="col-form-label">Nombre: </label>
                                <input type="text" className="form-control border-dark" name="nombre" id="nombre" onChange={(e) => setNombre(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Apellido" className="col-form-label">Apellido: </label>
                                <input type="text" className="form-control border-dark" name="apellido" id="apellido" onChange={(e) => setApellido(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Telefono" className="col-form-label">Telefono: </label>
                                <input type="text" className="form-control border-dark" name="telefono" id="telefono" onChange={(e) => setTelefono(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Email" className="col-form-label">Email: </label>
                                <input type="email" className="form-control border-dark" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModalCrear(false)}>Cancelar</button>
                            <button type="button" id="btnEditar" className="btn btn-primary" onClick={submit} disabled={nombre!=null && apellido!=null && email!=null && telefono!=null ? false:true}>Crear</button>
                        </div>
                    </form>
                </ModalBody>
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
export default Usuarios;