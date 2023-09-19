import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const professorsApi = createApi({
  reducerPath: "professorsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030" }),
  endpoints: (builder) => ({
    getProfessors: builder.query({
      query: () => "professors",
      providesTags: ["Professors"],
    }),

    addProfessor: builder.mutation({
      query: (newProfessor) => ({
        url: "professors",
        method: "POST",
        body: { ...newProfessor, courses: newProfessor.courses.split(" - ") },
      }),
      invalidatesTags: ["Professors"],
    }),

    editProfessor: builder.mutation({
      query: (professor) => ({
        url: `professors/${professor.id}`,
        method: "PUT",
        body: professor,
      }),
      invalidatesTags: ["Professors"],
    }),

    removeProfessor: builder.mutation({
      query: (professorID) => ({
        url: `professors/${professorID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Professors"],
    }),
  }),
});

export default professorsApi;
export const {
  useGetProfessorsQuery,
  useAddProfessorMutation,
  useEditProfessorMutation,
  useRemoveProfessorMutation,
} = professorsApi;
