import { useState, useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { API_URL } from "../config/api";

const WorkoutForm = ({ workoutToEdit = null, onEditComplete = null }) => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    // Load workout data if in edit mode
    useEffect(() => {
        if (workoutToEdit) {
            setTitle(workoutToEdit.title);
            setLoad(workoutToEdit.load);
            setReps(workoutToEdit.reps);
        } else {
            // Clear the form when there is no workout to edit.
            setTitle("");
            setLoad("");
            setReps("");
        }
    }, [workoutToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError("You must be logged in");
            return;
        }

        const workout = { title, load, reps };

        const url = workoutToEdit 
            ? `${API_URL}/api/workouts/${workoutToEdit._id}` 
            : `${API_URL}/api/workouts`;
        
        const method = workoutToEdit ? "PATCH" : "POST";

        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields || []);
        }

        if (response.ok) {
            setTitle("");
            setLoad("");
            setReps("");
            setError(null);
            setEmptyFields([]);
            
            if (workoutToEdit) {
                dispatch({ type: "UPDATE_WORKOUT", payload: json });
                if (onEditComplete) {
                    onEditComplete(); // Callback to close edit mode
                }
            } else {
                dispatch({ type: "CREATE_WORKOUT", payload: json });
            }
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit} >
            <h3>{workoutToEdit ? "Edit Workout" : "Add a New Workout"}</h3>

            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes("title") ? "error" : ""}
            />
            <label>Load (in Kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes("load") ? "error" : ""}
            />
            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes("reps") ? "error" : ""}
            />
            <button>{workoutToEdit ? "Update Workout" : "Add Workout"}</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm