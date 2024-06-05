import { useEffect, useState } from "react";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { ADD_TODO, GET_TODO } from "../Redux/ActionType";


function Home() {

    let [task, setTask] = useState({});
    let dispatch = useDispatch()

    let data = useSelector(store=>store.todo)


    let getValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setTask({ ...task, [name]: value });

    }

    let submitData = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/todo", task)
            .then((res) => {
                dispatch({ type: ADD_TODO, payload: res.data });
                alert("data added");
                setTask({})
                console.log(res.data)
            })
    }

    useEffect(() => {
        let getData = () => {
            axios.get("http://localhost:3000/todo")
                .then((res) => {
                    dispatch({type:GET_TODO,payload:res.data});
                }
            )
            }
        getData()
    }, [])

    return (
        <>
            <h1>Add Your Task</h1>

            <form onSubmit={(e) => submitData(e)} >
                <label>Enter Your Task :- </label>
                <input type="text" name="task" value={task.task ? task.task : ""} placeholder="Enter Your Task" onChange={(e) => getValue(e)} />
                <br /><br />
                <button type="submit" style={{ backgroundColor: "gray" }}>Submit</button>
            </form>

            <h1>View Your Task</h1>

            {data.map((v,i)=>{
                return(
                    <div key={i}>
                        <h3>TASK :- {v.task}</h3>
                    </div>
                )
            })}

        </>
    )
}

export default Home;