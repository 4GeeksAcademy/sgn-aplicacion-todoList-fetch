import React, { useState, useEffect } from "react";



const Acordeon = () => {



    const [tarea, setTarea] = useState("");
    const [tareas, setTareas] = useState([]);



    const crearTarea = async () => {
        if (tarea === "") {
            return;
        }
        let nuevaTarea = { "label": tarea, "is_done": false }
        try {
            const respuesta = await fetch('https://playground.4geeks.com/todo/todos/sebastian',
                {
                    method: "POST",
                    body: JSON.stringify(nuevaTarea),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            if (!respuesta.ok) {
                throw new Error('No se pudo crear la tarea');
            }

            const data = await respuesta.json();
            setTareas([...tareas, nuevaTarea]);
            setTarea("");

        } catch (error) {
            console.error('Error al traer tarea', error);
        }

    };






    const traerTareas = async () => {


        try {
            const respuesta = await fetch('https://playground.4geeks.com/todo/users/sebastian')

            if (!respuesta.ok) {
                throw new Error('Error en la respuesta de la API');
            }

            const data = await respuesta.json();
            setTareas(data.todos)

        } catch (error) {
            console.error('Error al obtener tarea ', error);
        }
    };



    const eliminarTarea = async (id) => {

        try {
            const respuesta = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "DELETE",
                
            });
            if (!respuesta.ok) { 
                throw new Error('Error al eliminar la tarea');
            }
            traerTareas()

        } catch (error) {
            console.error('Error al eliminar tarea', error);
        }

    };


    const eliminarTodo = async () => {
        try {
            
            const promesas = tareas.map((tarea) =>
                fetch(`https://playground.4geeks.com/todo/todos/${tarea.id}`, {
                    method: "DELETE",
            
                })
            );
    
            
            const respuestas = await Promise.all(promesas);
    
            
            const errores = respuestas.filter((respuesta) => !respuesta.ok);
            if (errores.length > 0) {
                throw new Error("Algunas tareas no se pudieron eliminar");
            }
    
            console.log("Todas las tareas eliminadas con éxito");
            setTareas([]); 
        } catch (error) {
            console.error("Error al eliminar todas las tareas:", error);
        }
    };
 

    


const handleKeyDown = (e) => {
    if (e.key === "Enter") {
        crearTarea();
    }
};



useEffect(() => {
    traerTareas()
}, [])



return (


    <div className="toDo">


        <table className="table table-striped ">
            <thead>
                <tr>
                    <td>
                        <input onChange={(e) => setTarea(e.target.value)} onKeyDown={handleKeyDown} value={tarea}

                            type="text" className="form" placeholder="Whats need to be done?" id="input" ></input>
                    </td>

                </tr>
            </thead>
            <tbody>
                <tr>

                    <td className="text-start" scope="row">{tareas.map((tarea, index) => {
                        return (
                            <div className="tarea-item" key={index}>
                                <p>{tarea.label} </p>
                                < button
                                    className="button" onClick={() => eliminarTarea(tarea.id)}
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
        <button id="reset" className="buttonReset" onClick={eliminarTodo}>Reset</button>
        <p className="tarea-indice">
            {tareas.length === 0 ? "No hay tareas, agrega alguna" : `${tareas.length} Item${tareas.length > 1 ? "s" : ""}`}

        </p>




    </div >

);

};






export default Acordeon

