import {Alert} from "react-st-modal"

const CreateTaskModal = () => {
  const createTask = (e) => {
    e.preventDefault();

    let tasks = null;

    try {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        tasks = JSON.parse(storedTasks);
      }
    } catch (error) {
      console.error(error);
    }

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
      date
    };

    tasks = tasks || [];

    tasks.push(info);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    e.target.reset();
    Alert("Task added successfully")
    document.getElementById("create_task_modal").close();
  };

  return (
    <dialog id="create_task_modal" className="modal">
      <form onSubmit={createTask} className="modal-box">
        <h3 className="font-bold text-lg">Create a task!</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Task name</span>
          </label>
          <input
            type="task"
            placeholder="Add task name"
            className="input input-bordered"
            name="task"
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
              Select priority level
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
            onClick={() => document.getElementById("create_task_modal").close()}
            type="button"
            className="w-full mt-5 btn btn-neutral"
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default CreateTaskModal;
