import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import {
  useAddStudentMutation,
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
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [student, setStudent] = useState({});

  const { data: rows, isLoading } = useGetStudentsQuery();
  const [addStudent, { isLoading: isAddingStudent }] = useAddStudentMutation();
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
            className="actionIcons studentEditIcon"
            onClick={() => {
              setStudent(params.row);
              setOpenEditModal(true);
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
            className="actionIcons studentDeleteIcon"
            onClick={() => {
              setStudent(params.row);
              setOpenDeleteModal(true);
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
            onClick={() => setOpenAddModal(true)}
            variant="contained"
            color="success"
          >
            افزودن دانشجو
          </Button>
        </div>
        {rows?.length && (
          <div className="table">
            <DataGrid
              rows={rows}
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
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
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
                  setOpenDeleteModal(false);
                }
              }}
              variant="contained"
              color="error"
            >
              بله
            </Button>
            <Button
              onClick={() => setOpenDeleteModal(false)}
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
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit User
               </Typography>
               <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Enter new user information's.
               </Typography>
               <br />
               <div dir="rtl">
               <TextField
                  fullWidth
                  label="نام"
                  id="fullWidth"
                  value={student.name}
                  onChange={(event) => setStudent(prevStudent=>(console.log(prevStudent)))}
                  sx={{ pb: 2 }}
               />
               <TextField
                  fullWidth
                  label="نام خانوادگی"
                  id="fullWidth"
                  value={student.family}
                  onChange={(event) => setStudent(event.target.value)}
                  sx={{ pb: 2 }}
               />
               <TextField
                  fullWidth
                  label="رشته تحصیلی"
                  id="fullWidth"
                  value={student.fieldOfStudy}
                  onChange={(event) => setStudent(event.target.value)}
                  sx={{ pb: 2 }}
               />
               <TextField
                  fullWidth
                  label="شماره دانشجویی"
                  id="fullWidth"
                  value={student.studentNumber}
                  onChange={(event) => setStudent(event.target.value)}
                  sx={{ pb: 2 }}
               />
               </div>
               <br />
               <br />
               <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                  <Button
                     onClick={() => editUser()}
                     variant="contained"
                     color="success"
                  >
                     Edit
                  </Button>
                  <Button
                     onClick={() => setOpenEditModal(false)}
                     variant="contained"
                     color="error"
                  >
                     Cancel
                  </Button>
               </div>
            </Box>
         </Modal>
    </>
  );
}
