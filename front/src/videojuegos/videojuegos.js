import { Fragment, React, useState, useEffect } from "react";
import Card from "../components/card/card";
import axios from "axios";
const Videojuegos = () => {
    const API = "http://localhost:3001"
    const [game, setGames] = useState([]);
    useEffect(() => {
        axios.get(`${API}/videojuegos`).then((response) => {
            setGames(response.data);
        });
        if (!game) return null;
    }, []);
    return (
        <Fragment>
            <main className="bg">
                <div className="container">
                <div className='row pt-2'>
                    {game.map((data) => {
                        return (<Card juego={data}/>)
                    })}
                </div>
            </div>
        </main>
        </Fragment >
    )
}
export default Videojuegos;