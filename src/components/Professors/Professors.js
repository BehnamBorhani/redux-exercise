import React, { useState } from "react";
import "./Professors.scss";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import {
  useAddProfessorMutation,
  useEditProfessorMutation,
  useGetProfessorsQuery,
  useRemoveProfessorMutation,
} from "../../redux/services/professorsApi";

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

const Professors = () => {
  const [professor, setProfessor] = useState({});
  const [openModals, setOpenModals] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  const { data: professors, isLoading } = useGetProfessorsQuery();
  const [addProfessor, { isLoading: isAddingProfessor }] =
    useAddProfessorMutation();
  const [editProfessor, { isLoading: isEditingProfessor }] =
    useEditProfessorMutation();
  const [removeProfessor, { isLoading: isRemovingProfessor }] =
    useRemoveProfessorMutation();

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    { field: "name", headerName: "نام", width: 130 },
    { field: "family", headerName: "نام خانوادگی", width: 130 },
    {
      field: "courses",
      headerName: "مدرس دروس",
      width: 350,
      renderCell: (params) => {
        return params.row.courses.join(" - ");
      },
    },
    { field: "personnelID", headerName: "شماره پرسنلی", width: 200 },
    {
      field: "edit",
      headerName: "ویرایش",
      width: 50,
      renderCell: (params) => {
        return (
          <EditIcon
            className="actionIcons editIcon"
            onClick={() => {
              setProfessor({
                ...params.row,
                courses: params.row.courses.join(" - "),
              });
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
              setProfessor(params.row);
              setOpenModals((prevState) => ({ ...prevState, delete: true }));
            }}
          />
        );
      },
    },
  ];

  return (
    <>
      <section id="professors">
        <div className="header">
          <h1 className="title">لیست اساتید</h1>
          <Button
            onClick={() => {
              setOpenModals((prevState) => ({ ...prevState, add: true }));
              setProfessor({});
            }}
            variant="contained"
            color="success"
          >
            افزودن استاد
          </Button>
        </div>
        {professors?.length && (
          <div className="table">
            <DataGrid
              rows={professors}
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

      {/* add new professor Modal */}
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
              value={professor.name}
              onChange={(event) =>
                setProfessor((prevState) => ({
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
              value={professor.family}
              onChange={(event) =>
                setProfessor((prevState) => ({
                  ...prevState,
                  family: event.target.value,
                }))
              }
              sx={{ pb: 2 }}
            />
            <TextField
              fullWidth
              label="مدرس دروس"
              id="fullWidth"
              value={professor.courses}
              onChange={(event) =>
                setProfessor((prevState) => ({
                  ...prevState,
                  courses: event.target.value,
                }))
              }
              sx={{ pb: 2 }}
            />
            <TextField
              fullWidth
              label="شماره پرسنلی"
              id="fullWidth"
              value={professor.personnelID}
              onChange={(event) =>
                setProfessor((prevState) => ({
                  ...prevState,
                  personnelID: event.target.value,
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
                addProfessor(professor);
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
            ویرایش استاد
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            اطلاعات جدید استاد را وارد نمایید.
          </Typography>
          <br />
          <div dir="rtl">
            <TextField
              fullWidth
              label="نام"
              id="fullWidth"
              value={professor.name}
              onChange={(event) =>
                setProfessor((prevState) => ({
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
              value={professor.family}
              onChange={(event) =>
                setProfessor((prevState) => ({
                  ...prevState,
                  family: event.target.value,
                }))
              }
              sx={{ pb: 2 }}
            />
            <TextField
              fullWidth
              label="مدرس دروس"
              id="fullWidth"
              value={professor.courses}
              onChange={(event) =>
                setProfessor((prevState) => ({
                  ...prevState,
                  courses: event.target.value,
                }))
              }
              sx={{ pb: 2 }}
            />
            <TextField
              fullWidth
              label="شماره پرسنلی"
              id="fullWidth"
              value={professor.personnelID}
              onChange={(event) =>
                setProfessor((prevState) => ({
                  ...prevState,
                  personnelID: event.target.value,
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
                editProfessor(professor);
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
            حذف استاد
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            آیا از حذف این استاد مطمعن هستید؟
          </Typography>
          <br />
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              onClick={() => {
                removeProfessor(professor.id);
                if (!isRemovingProfessor) {
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

export default Professors;
