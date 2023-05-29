import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./style/card.css"
const Card = ({ juego }) => {
    const [fecha, setFecha]=useState(juego.fechalanzamiento.split("T")[0])

  return (
    <div className="col-md-4 p-4">
      <div className='card'>
        <img src={juego.portada} alt={juego.nombre} className='card-img-top' width='100' height='400' />
        <div className="card-body bg-light">
          <h5>Alquiler: {juego.precio}</h5>
          <h5>Empresa: {juego.productor}</h5>
          <h5>Lanzamiento: {fecha}</h5>
          <button className="btn btn-success">Alquilar</button>
          <button className="btn btn-warning">Editar precio</button>
        </div>
      </div>
    </div>
  )
}

export default Card