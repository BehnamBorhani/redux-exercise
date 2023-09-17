import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const studentsApi = createApi({
  reducerPath: "studentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030" }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "students",
      providesTags: ["Students"],
    }),

    addStudent: builder.mutation({
      query: (newStudent) => ({
        url: "students",
        method: "POST",
        body: newStudent,
      }),
      invalidatesTags: ["Students"],
    }),

    editStudent: builder.mutation({
      query: (student) => ({
        url: `students/${student.id}`,
        method: "PUT",
        body: student,
      }),
      invalidatesTags: ["Students"],
    }),

    removeStudent: builder.mutation({
      query: (studentID) => ({
        url: `students/${studentID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),
  }),
});

export default studentsApi;
export const {
  useGetStudentsQuery,
  useAddStudentMutation,
  useEditStudentMutation,
  useRemoveStudentMutation,
} = studentsApi;
