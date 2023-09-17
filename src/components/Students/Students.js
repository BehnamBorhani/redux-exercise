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
import { Box, Button, Modal, Typography } from "@mui/material";

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
  const [studentID, setStudentID] = useState(1);

  const { data: rows, isLoading } = useGetStudentsQuery();
  const [addStudent, { isLoading: isAddingStudent }] = useAddStudentMutation();
  const [removeStudent, { isLoading: isRemovingStudent }] =
    useRemoveStudentMutation();

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
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
      field: "delete",
      headerName: "حذف",
      width: 50,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutlineIcon
              className="actionIcons studentDeleteIcon"
              onClick={() => {
                setStudentID(params.row.id);
                setOpenDeleteModal(true);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <section id="students">
        <h1>لیست دانشجویان</h1>
        {rows?.length && (
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
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
                removeStudent(studentID);
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
    </>
  );
}
