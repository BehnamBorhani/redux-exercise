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
    { field: "numberOfUnits", headerName: "تعداد واحد", width: 100 },
    { field: "code", headerName: "کد درس", width: 150 },
    { field: "professor", headerName: "استاد درس", width: 150 },
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

      {/* add new course Modal */}
      <Modal
        open={openModals.add}
        onClose={() =>
          setOpenModals((prevState) => ({ ...prevState, add: false }))
        }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            افزودن درس
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            مشخصات درس را وارد نمایید
          </Typography>
          <br />
          <div dir="rtl">
            <TextField
              fullWidth
              label="نام درس"
              id="fullWidth"
              value={course.name}
              onChange={(event) =>
                setCourse((prevState) => ({
                  ...prevState,
                  name: event.target.value,
                }))
              }
              sx={{ pb: 2 }}
            />
            <TextField
              type="number"
              fullWidth
              label="تعداد واحد"
              id="fullWidth"
              value={course.numberOfUnits}
              onChange={(event) =>
                setCourse((prevState) => ({
                  ...prevState,
                  numberOfUnits: event.target.value,
                }))
              }
              sx={{ pb: 2 }}
            />
            <TextField
              type="number"
              fullWidth
              label="کد درس"
              id="fullWidth"
              value={course.code}
              onChange={(event) =>
                setCourse((prevState) => ({
                  ...prevState,
                  code: event.target.value,
                }))
              }
              sx={{ pb: 2 }}
            />
            <TextField
              fullWidth
              label="استاد درس"
              id="fullWidth"
              value={course.professor}
              onChange={(event) =>
                setCourse((prevState) => ({
                  ...prevState,
                  professor: event.target.value,
                }))
              }
              sx={{ pb: 2 }}
            />
          </div>
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              onClick={() => {
                addCourse(course);
                setOpenModals((prevState) => ({ ...prevState, add: false }));
              }}
              variant="contained"
              color="success"
            >
              افزودن
            </Button>
            <Button
              onClick={() =>
                setOpenModals((prevState) => ({ ...prevState, add: false }))
              }
              variant="contained"
              color="error"
            >
              کنسل
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={openModals.edit}
        onClose={() =>
          setOpenModals((prevState) => ({ ...prevState, edit: false }))
        }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ویرایش درس
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            اطلاعات جدید درس را وارد نمایید.
          </Typography>
          <br />
          <div dir="rtl">
            <TextField
              fullWidth
              label="نام درس"
              id="fullWidth"
              value={course.name}
              onChange={(event) =>
                setCourse((prevState) => ({
                  ...prevState,
                  name: event.target.value,
                }))
              }
              sx={{ pb: 2 }}
            />
            <TextField
              type="number"
              fullWidth
              label="تعداد واحد"
              id="fullWidth"
              value={course.numberOfUnits}
              onChange={(event) =>
                setCourse((prevState) => ({
                  ...prevState,
                  numberOfUnits: event.target.value,
                }))
              }
              sx={{ pb: 2 }}
            />
            <TextField
              type="number"
              fullWidth
              label="کد درس"
              id="fullWidth"
              value={course.code}
              onChange={(event) =>
                setCourse((prevState) => ({
                  ...prevState,
                  code: event.target.value,
                }))
              }
              sx={{ pb: 2 }}
            />
            <TextField
              fullWidth
              label="استاد درس"
              id="fullWidth"
              value={course.professor}
              onChange={(event) =>
                setCourse((prevState) => ({
                  ...prevState,
                  professor: event.target.value,
                }))
              }
              sx={{ pb: 2 }}
            />
          </div>
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              onClick={() => {
                editCourse(course);
                setOpenModals((prevState) => ({ ...prevState, edit: false }));
              }}
              variant="contained"
              color="success"
            >
              ویرایش
            </Button>
            <Button
              onClick={() =>
                setOpenModals((prevState) => ({ ...prevState, edit: false }))
              }
              variant="contained"
              color="error"
            >
              کنسل
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={openModals.delete}
        onClose={() =>
          setOpenModals((prevState) => ({ ...prevState, delete: false }))
        }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            حذف درس
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            آیا از حذف این درس مطمعن هستید؟
          </Typography>
          <br />
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              onClick={() => {
                removeCourse(course.id);
                if (!isRemovingCourse) {
                  setOpenModals((prevState) => ({
                    ...prevState,
                    delete: false,
                  }));
                }
              }}
              variant="contained"
              color="error"
            >
              بله
            </Button>
            <Button
              onClick={() =>
                setOpenModals((prevState) => ({ ...prevState, delete: false }))
              }
              variant="contained"
              color="success"
            >
              خیر
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Courses;
