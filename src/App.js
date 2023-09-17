import "./styles/App.scss";
import Navbar from "./components/Navbar/Navbar";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {
  const router = useRoutes(routes);
  return (
    <>
      <Navbar />
      {router}
    </>
  );
}

export default App;
