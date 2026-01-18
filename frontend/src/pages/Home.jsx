import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [workoutToEdit, setWorkoutToEdit] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json })
      }
    }

    if(user){
      fetchWorkouts();
    }

  }, [dispatch, user])

  const handleEdit = (workout) => {
    setWorkoutToEdit(workout);
  }

  const handleEditComplete = () => {
    setWorkoutToEdit(null);
  }

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails 
            key={workout._id} 
            workout={workout} 
            onEdit={handleEdit}
          />
        ))}
      </div>
      <div className="workout-form">
        <WorkoutForm 
          workoutToEdit={workoutToEdit}
          onEditComplete={handleEditComplete}
        />
      </div>
    </div>
  )
}

export default Home