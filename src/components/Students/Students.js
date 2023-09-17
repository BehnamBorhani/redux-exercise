import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import {
  useAddStudentMutation,
  useGetStudentsQuery,
  useRemoveStudentMutation,
} from "../../redux/services/studentsApi";
import "./Students.scss";

export default function Students() {
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
              onClick={() => removeStudent(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
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
  );
}
