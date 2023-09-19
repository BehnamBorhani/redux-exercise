import Students from "./components/Students/Students";
import Professors from "./components/Professors/Professors";
import Courses from "./components/Courses/Courses";
import SelectUnit from "./components/SelectUnit/SelectUnit";

const routes = [
  { path: "/students", element: <Students /> },
  { path: "/professors", element: <Professors /> },
  { path: "/lessons", element: <Courses /> },
  { path: "/select-unit", element: <SelectUnit /> },
];

export default routes;
