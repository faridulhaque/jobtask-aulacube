import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Alert } from "react-st-modal";
const Edit = () => {
  const { i } = useParams();

  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");

      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const t = tasks[i];

  const updateTask = (e) => {
    e.preventDefault();

    const task = e.target.elements.task.value;
    const level = e.target.elements.level.value;
    const description = e.target.elements.description.value;
    const date = e.target.elements.date.value;
    const complete = false;

    const info = {
      task,
      level,
      description,
      complete,
      date,
    };


    tasks.splice(i, 1, info);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    setTasks(tasks)

    Alert("Task updated successfully", "");
  };

  return (
    <>
      <Navbar></Navbar>
      <form onSubmit={updateTask} className="modal-box mx-auto">
        <h3 className="font-bold text-lg">Update a task!</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Task name</span>
          </label>
          <input
            type="task"
            placeholder="Add task name"
            className="input input-bordered"
            name="task"
            defaultValue={t?.task}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            type="text"
            placeholder="Add a description"
            className="input input-bordered"
            name="description"
            required
            defaultValue={t?.description}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last Date</span>
          </label>
          <input
            type="date"
            placeholder="Select a deadline"
            className="input input-bordered"
            name="date"
            required
            defaultValue={t?.date}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Select priority level</span>
          </label>
          <select
            name="level"
            defaultValue=""
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>
              {parseInt(t?.level) === 1
                ? "Top"
                : parseInt(t?.level) === 2
                ? "Mid"
                : "Low"}
            </option>
            <option value="1">Top</option>
            <option value="2">Mid</option>
            <option value="3">Low</option>
          </select>
        </div>
        <div className="form-control">
          <button type="submit" className="w-full mt-5 btn btn-accent">
            Submit
          </button>
          <button
            onClick={() => navigate("/")}
            type="button"
            className="w-full mt-5 btn btn-neutral"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default Edit;
