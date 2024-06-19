import { useEffect, useState } from "react";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { ADD_TODO, DELETE_TODO, EDIT_TODO, GET_TODO } from "../Redux/ActionType";


function Home() {

    let [task, setTask] = useState({});
    let dispatch = useDispatch();
    let [id,setId] = useState(0);
    let[filtered,setFiltered] = useState("")

    let data = useSelector(store => store.todo)


    let getValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setTask({ ...task, [name]: value });

    }

    let submitData = (e) => {
        e.preventDefault();
        if(id === 0){
        axios.post("http://localhost:3000/todo", task)
            .then((res) => {
                dispatch({ type: ADD_TODO, payload: res.data });
                alert("data added");
                setTask({})
                console.log(res.data)
                getData()
            })
        }
        else{
            axios.patch(`http://localhost:3000/todo/${id}`,task)
            .then(()=>{
                dispatch({type:EDIT_TODO,payload:id})
                setTask({});
                setId(0)
                getData()
            })
        }
    }

    let getData = () => {
        axios.get("http://localhost:3000/todo")
            .then((res) => {
                dispatch({ type: GET_TODO, payload: res.data });
            })
    }

    useEffect(() => {
        getData()
    }, []);

    let deleteTask = (id) => {
        axios.delete(`http://localhost:3000/todo/${id}`)
            .then(() => {
                dispatch({ type: DELETE_TODO, payload: id });
                alert("data deleted");
                getData();
            })
    }

    let editTask = (id) => {
        let dd = data.find((v)=>v.id==id);
        setTask(dd)
        setId(id)
    }
    let filteredData = filtered ? data.filter((v) => v.category === filtered):data  ;

    return (
        <>
            <h1>Add Your Task</h1>

            <form onSubmit={(e) => submitData(e)} >
                <label>Enter Your Task :- </label>
                <input type="text" name="task" value={task.task ? task.task : ""} placeholder="Enter Your Task" onChange={(e) => getValue(e)} />
                <br /><br />
                <label htmlFor="">Select Category :- </label>
                <select name="category" id="" value={task.category?task.category :""} onChange={(e) => getValue(e)}>
                    <option value="">Select Category</option>
                    <option value="personal">Personal</option>
                    <option value="private">Private</option>
                    <option value="family">Family</option>
                    <option value="other">Other</option>
                </select>
                <br /><br />
                <button type="submit" style={{ backgroundColor: "gray" }}>{id === 0 ? "Submit":"Edit"}</button>
            </form>

            <div>
                <input type="radio" name="filter" value="" checked={filtered === ""} onChange={(e)=>setFiltered(e.target.value)} />
                <label htmlFor="">All</label>
                <input type="radio" name="filter" value="personal" checked={filtered === "personal"}  onChange={(e)=>setFiltered(e.target.value)}/>
                <label htmlFor="">Personal</label>
                <input type="radio" name="filter" value="private" checked={filtered === "private"} onChange={(e)=>setFiltered(e.target.value)}/>
                <label htmlFor="">Private</label>
                <input type="radio" name="filter" value="family" checked={filtered === "family"} onChange={(e)=>setFiltered(e.target.value)}/>
                <label htmlFor="">Family</label>
                <input type="radio" name="filter" value="other" checked={filtered === "other"} onChange={(e)=>setFiltered(e.target.value)}/>
                <label htmlFor="">Other</label>
            </div>

            <h1>View Your Task</h1>

            {filteredData.map((v, i) => {
                return (
                    <div key={i}>
                        <h3>TASK :- {v.task}</h3>
                        <h3>Category :- {v.category}</h3>
                        <button onClick={() => deleteTask(v.id)}>delete</button>
                        <button onClick={() => editTask(v.id)}>Edit</button>
                    </div>
                )
            })}

        </>
    )
}

export default Home;