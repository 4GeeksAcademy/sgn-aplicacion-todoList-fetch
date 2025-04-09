import React, { useState, useEffect } from "react";



const Acordeon = () => {



    const [tarea, setTarea] = useState("");
    const [tareas, setTareas] = useState([]);



    const agregarTarea = () => {

        if (tarea.trim() !== "") {
            setTareas([...tareas, tarea]);
            setTarea("");
        }

    };

    const eliminarTarea = (index) => {
        let borrar = [...tareas]
        borrar.splice(index, 1)
        setTareas(borrar)
    };



    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            agregarTarea();
        }
    };




    return (


        <div className="toDo">


            <table className="table table-striped ">
                <thead>
                    <tr>
                        <td>
                            <input onChange={(e) => setTarea(e.target.value)} onKeyDown={handleKeyDown} value={tarea}

                                type="text" className="form" placeholder="Whats need to be done?"  ></input>
                        </td>

                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <td className="text-start" scope="row">{tareas.map((tarea, index) => {
                            return (
                                <div className="tarea-item" key={index}>
                                    <p>{tarea} </p>
                                    < button
                                        className="button" onClick={() => eliminarTarea(index)}
                                    >
                                        <i className="fa-solid fa-x"></i>
                                    </button>
                                </div>

                            )

                        })}

                        </td>

                    </tr>


                </tbody>
            </table>

            <p className="tarea-indice">
                {tareas.length === 0 ? "No hay tareas, agrega alguna" : `${tareas.length} Item${tareas.length > 1 ? "s" : ""}`}

            </p>




        </div >

    );

}






export default Acordeon;

