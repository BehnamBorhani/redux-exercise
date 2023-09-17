import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetStudentsQuery } from "../../redux/services/studentsApi";

export default function Students() {
  const { data: rows, isLoading } = useGetStudentsQuery();
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
 ];

  return (
    <section id="students">
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
