import Students from "./components/Students/Students";
import Professors from "./components/Professors/Professors";
import Lessons from "./components/Lessons/Lessons";
import SelectUnit from "./components/SelectUnit/SelectUnit";

const routes = [
  { path: "/students", element: <Students /> },
  { path: "/professors", element: <Professors /> },
  { path: "/lessons", element: <Lessons /> },
  { path: "/select-unit", element: <SelectUnit /> },
];

export default routes;
