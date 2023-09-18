import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import {
  useAddStudentMutation,
  useEditStudentMutation,
  useGetStudentsQuery,
  useRemoveStudentMutation,
} from "../../redux/services/studentsApi";
import "./Students.scss";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

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

export default function Students() {
  const [student, setStudent] = useState({});
  const [openModals, setOpenModals] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  const { data: students, isLoading } = useGetStudentsQuery();
  const [addStudent, { isLoading: isAddingStudent }] = useAddStudentMutation();
  const [editStudent, { isLoading: isEditingStudent }] =
    useEditStudentMutation();
  const [removeStudent, { isLoading: isRemovingStudent }] =
    useRemoveStudentMutation();

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    { field: "name", headerName: "نام", width: 130 },
    { field: "family", headerName: "نام خانوادگی", width: 130 },
    {
      field: "fieldOfStudy",
      headerName: "رشته تحصیلی",
      width: 200,
    },
    {
      field: "studentNumber",
      headerName: "شماره دانشجویی",
      width: 200,
    },
    {
      field: "edit",
      headerName: "ویرایش",
      width: 50,
      renderCell: (params) => {
        return (
          <EditIcon
            className="actionIcons editIcon"
            onClick={() => {
              setStudent(params.row);
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
              setStudent(params.row);
              setOpenModals((prevState) => ({ ...prevState, delete: true }));
            }}
          />
        );
      },
    },
  ];

  return (
    <>
      <section id="students">
        <div className="header">
          <h1 className="title">لیست دانشجویان</h1>
          <Button
            onClick={() => {
              setOpenModals((prevState) => ({ ...prevState, add: true }));
              setStudent({});
            }}
            variant="contained"
            color="success"
          >
            افزودن دانشجو
          </Button>
        </div>
        {students?.length && (
          <div className="table">
            <DataGrid
              rows={students}
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
            حذف دانشجو
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            آیا از حذف این دانجشو مطمعن هستید؟
          </Typography>
          <br />
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              onClick={() => {
                removeStudent(student.id);
                if (!isRemovingStudent) {
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
            ویرایش دانشجو
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            اطلاعات جدید دانشجو را وارد نمایید.
          </Typography>
          <br />
          <div dir="rtl">
            <TextField
              fullWidth
              label="نام"
              id="fullWidth"
              value={student.name}
              onChange={(event) =>
                setStudent((prevState) => ({
                  ...prevState,
                  name: event.target.value,
                }))
              }
              sx={{ pb: 2 }}
            />
            <TextField
              fullWidth
              label="نام خانوادگی"
              id="fullWidth"
              value={student.family}
              onChange={(event) =>
                setStudent((prevState) => ({
                  ...prevState,
                  family: event.target.value,
                }))
              }
              sx={{ pb: 2 }}
            />
            <TextField
              fullWidth
              label="رشته تحصیلی"
              id="fullWidth"
              value={student.fieldOfStudy}
              onChange={(event) =>
                setStudent((prevState) => ({
                  ...prevState,
                  fieldOfStudy: event.target.value,
                }))
              }
              sx={{ pb: 2 }}
            />
            <TextField
              fullWidth
              label="شماره دانشجویی"
              id="fullWidth"
              value={student.studentNumber}
              onChange={(event) =>
                setStudent((prevState) => ({
                  ...prevState,
                  studentNumber: event.target.value,
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
                editStudent(student);
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

      {/* add new student Modal */}
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
            افزودن دانجشو
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            مشخصات دانشجو را وارد نمایید
          </Typography>
          <br />
          <div dir="rtl">
            <TextField
              fullWidth
              label="نام"
              id="fullWidth"
              value={student.name}
              onChange={(event) =>
                setStudent((prevState) => ({
                  ...prevState,
                  name: event.target.value,
                }))
              }
              sx={{ pb: 2 }}
            />
            <TextField
              fullWidth
              label="نام خانوادگی"
              id="fullWidth"
              value={student.family}
              onChange={(event) =>
                setStudent((prevState) => ({
                  ...prevState,
                  family: event.target.value,
                }))
              }
              sx={{ pb: 2 }}
            />
            <TextField
              fullWidth
              label="رشته تحصیلی"
              id="fullWidth"
              value={student.fieldOfStudy}
              onChange={(event) =>
                setStudent((prevState) => ({
                  ...prevState,
                  fieldOfStudy: event.target.value,
                }))
              }
              sx={{ pb: 2 }}
            />
            <TextField
              fullWidth
              label="شماره دانشجویی"
              id="fullWidth"
              value={student.studentNumber}
              onChange={(event) =>
                setStudent((prevState) => ({
                  ...prevState,
                  studentNumber: event.target.value,
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
                addStudent(student);
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
    </>
  );
}
