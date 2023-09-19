import React from "react";
import "./SelectUnit.scss";
import { useDispatch, useSelector } from "react-redux";
import { select, unselect } from "../../redux/selectUnitCounterSlice";
import { useGetCoursesQuery } from "../../redux/services/coursesApi";
import { DataGrid } from "@mui/x-data-grid";

const SelectUnit = () => {
  const { data: courses } = useGetCoursesQuery();
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    { field: "code", headerName: "کد درس", width: 150 },
    { field: "name", headerName: "نام درس", width: 200 },
    { field: "NumberOfUnits", headerName: "تعداد واحد", width: 100 },
    { field: "professor", headerName: "استاد درس", width: 150 },
  ];

  return (
    <>
      <section id="courses">
        <div className="header">
          <h1 className="title">انتخاب واحد</h1>
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
