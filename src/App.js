import "./styles/App.scss";
import Navbar from "./components/Navbar/Navbar";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  const router = useRoutes(routes);

  return (
    <Provider store={store}>
      <Navbar />
      <div className="container">{router}</div>
    </Provider>
  );
}

export default App;
