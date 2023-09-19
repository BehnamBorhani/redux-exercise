import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import "./Courses.scss";
import {
  useAddCourseMutation,
  useEditCourseMutation,
  useGetCoursesQuery,
  useRemoveCourseMutation,
} from "../../redux/services/coursesApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Courses = () => {
  const [course, setCourse] = useState({});
  const [openModals, setOpenModals] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  const { data: courses, isLoading } = useGetCoursesQuery();
  const [addCourse, { isLoading: isAddingCourse }] = useAddCourseMutation();
  const [editCourse, { isLoading: isEditingCourse }] = useEditCourseMutation();
  const [removeCourse, { isLoading: isRemovingCourse }] =
    useRemoveCourseMutation();

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    { field: "name", headerName: "نام درس", width: 200 },
    { field: "NumberOfUnits", headerName: "تعداد واحد", width: 100 },
    { field: "code", headerName: "کد درس", width: 150 },
    {
      field: "edit",
      headerName: "ویرایش",
      width: 50,
      renderCell: (params) => {
        return (
          <EditIcon
            className="actionIcons editIcon"
            onClick={() => {
              setCourse(params.row);
              setOpenModals((prevState) => ({ ...prevState, edit: true }));
            }}
          />
        );
      },
    },
    {
      field: "delete",
      headerName: "حذف",
      width: 50,
      renderCell: (params) => {
        return (
          <DeleteOutlineIcon
            className="actionIcons deleteIcon"
            onClick={() => {
              setCourse(params.row);
              setOpenModals((prevState) => ({ ...prevState, delete: true }));
            }}
          />
        );
      },
    },
  ];

  return (
    <>
      <section id="courses">
        <div className="header">
          <h1 className="title">لیست دروس</h1>
          <Button
            onClick={() => {
              setOpenModals((prevState) => ({ ...prevState, add: true }));
              setCourse({});
            }}
            variant="contained"
            color="success"
          >
            افزودن درس
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

export default Courses;
