import Navbar from "../components/Navbar";
import CreateTaskModal from "../components/CreateTaskModal";

const CreateTask = () => {
  const openCreateTaskModal = () => {
    document.getElementById("create_task_modal").showModal();
  };

  return (
    <>
      <Navbar></Navbar>

      <div>
        <button onClick={openCreateTaskModal} className="btn btn-accent mt-10 mx-auto block">
          Create a task
        </button>
      </div>
      <CreateTaskModal></CreateTaskModal>
    </>
  );
};

export default CreateTask;
