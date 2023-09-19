import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const coursesApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030" }),
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "courses",
      providesTags: ["Courses"],
    }),

    addCourse: builder.mutation({
      query: (course) => ({
        url: "courses",
        method: "POST",
        body: course,
      }),
      invalidatesTags: ["Courses"],
    }),

    editCourse: builder.mutation({
      query: (course) => ({
        url: `courses/${course.id}`,
        method: "PUT",
        body: course,
      }),
      invalidatesTags: ["Courses"],
    }),

    removeCourse: builder.mutation({
      query: (courseID) => ({
        url: `courses/${courseID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
    }),
  }),
});

export default coursesApi;
export const {
  useGetCoursesQuery,
  useAddCourseMutation,
  useEditCourseMutation,
  useRemoveCourseMutation,
} = coursesApi;
