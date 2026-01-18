import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout, onEdit }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json })
    }
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit(workout);
    }
  }

  return (
    <div className="workout-details">
      <div>
        <h4>{workout.title}</h4>
        <div>
          <span className="material-symbols-outlined" onClick={handleEdit}>edit</span>
          <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
        </div>
      </div>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
    </div>
  )
}

export default WorkoutDetails