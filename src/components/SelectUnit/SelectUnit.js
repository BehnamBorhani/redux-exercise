import React from "react";
import "./SelectUnit.scss";
import { useDispatch, useSelector } from "react-redux";
import { select, unselect } from "../../redux/selectUnitCounterSlice";
import {
  useEditCourseMutation,
  useGetCoursesQuery,
} from "../../redux/services/coursesApi";
import { DataGrid } from "@mui/x-data-grid";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Tooltip } from "@mui/material";

const SelectUnit = () => {
  const { data: courses } = useGetCoursesQuery();
  const [editCourse] = useEditCourseMutation();
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    { field: "code", headerName: "کد درس", width: 150 },
    { field: "name", headerName: "نام درس", width: 200 },
    { field: "numberOfUnits", headerName: "تعداد واحد", width: 100 },
    { field: "professor", headerName: "استاد درس", width: 150 },
    {
      field: "selected",
      headerName: "انتخاب",
      width: 50,
      renderCell: (params) => {
        const course = params.row;
        if (course.selected) {
          return (
            <Tooltip title="حذف" placement="right" arrow>
              <CloseIcon
                className="actionIcons deleteIcon"
                onClick={() => {
                  if (count - course.numberOfUnits >= 0) {
                    dispatch(unselect(course?.numberOfUnits));
                    editCourse({ ...course, selected: false });
                  } else {
                    alert("شما هنوز هیچ واحدی انتخاب نکرده اید");
                  }
                }}
              />
            </Tooltip>
          );
        } else {
          return (
            <Tooltip title="انتخاب" placement="right" arrow>
              <DoneIcon
                className="actionIcons editIcon"
                onClick={() => {
                  if (count + course.numberOfUnits <= 20) {
                    dispatch(select(course?.numberOfUnits));
                    editCourse({ ...course, selected: true });
                  } else {
                    alert("شما مجاز به انتخاب بیشتر از 20 واحد نیستید");
                  }
                }}
              />
            </Tooltip>
          );
        }
      },
    },
  ];

  return (
    <>
      <section id="courses">
        <div className="header">
          <h1 className="title">انتخاب واحد</h1>
          <Button variant="contained" color="success">
            تعداد واحد انتخاب شده: {count}
          </Button>
        </div>
        {courses?.length && (
          <div className="table">
            <DataGrid
              rows={courses}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default SelectUnit;
