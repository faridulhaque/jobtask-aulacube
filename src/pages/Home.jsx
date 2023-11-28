
import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";

const Home = () => {


  return (
    <>
      <Navbar></Navbar>
      <div>
        <h2 className="text-4xl text-center mt-5">All Tasks</h2>
        <TaskList></TaskList>
      </div>
    </>
  );
};

export default Home;
