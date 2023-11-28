import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Confirm } from "react-st-modal";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const [count, setCount] = useState({ start: 0, end: 5 });


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

  if (tasks?.length === 0) {
    return <h2 className="text-green-500 text-center mt-10">No tasks added</h2>;
  }

  const handleComplete = async (i) => {
    const result = await Confirm("Are you sure?");

    if (result) {
      const updatedTasks = [...tasks];
      updatedTasks[i + count.start].complete = true;
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const handleDelete = async (i) => {
    const result = await Confirm("Are you sure?");

    if (result) {
      const updatedTasks = tasks.filter((task, index) => index !== i);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };
  


  return (
    <div>
      <div className="overflow-x-auto ml-5 mt-5 lg:h-[600px]">
        <table className="table">
          <thead>
            <tr>
              <th>Mark complete</th>
              <th>Task</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Due date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks
              ?.sort((a, b) => parseInt(a.level) - parseInt(b.level))
              .slice(count.start, count.end)
              .map((t, i) => (
                <tr
                  key={i}
                  className={` ${t?.complete ? "bg-green-200" : "bg-slate-50"}`}
                >
                  <td onClick={() => handleComplete(i)}>
                    <input
                      type="checkbox"
                      checked={t?.complete}
                      disabled={t?.complete === true}
                      className={`checkbox `}
                    />
                  </td>
                  <td>{t?.task}</td>
                  <td>{t?.description}</td>
                  <td>
                    {parseInt(t?.level) === 1
                      ? "Top"
                      : parseInt(t?.level) === 2
                      ? "Mid"
                      : "Low"}
                  </td>
                  <td
                    className={`${
                      t?.complete ? "text-green-500" : "text-yellow-500"
                    }`}
                  >
                    {t?.complete ? "Completed" : "Pending"}
                  </td>
                  <td
                    className={`${
                      t?.complete ? "text-green-500" : "text-yellow-500"
                    }`}
                  >
                    {t?.date}
                  </td>
                  <td>
                    <button
                      disabled={t?.complete}
                      onClick={() => navigate(`/${i}`)}
                      className={`btn btn-accent `}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(i)}
                      className="btn btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="join grid grid-cols-2 mx-auto lg:w-2/4 sm:w-4/5 mt-5">
        <button
          onClick={() =>
            setCount({ start: count.start - 5, end: count.end - 5 })
          }
          className="join-item btn btn-outline"
          disabled={count.start === 0}
        >
          Previous
        </button>
        <button
          disabled={count.end > tasks?.length}
          onClick={() =>
            setCount({ start: count.start + 5, end: count.end + 5 })
          }
          className="join-item btn btn-outline"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
