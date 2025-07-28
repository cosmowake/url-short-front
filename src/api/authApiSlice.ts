import apiSlice from "@/api/api";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    postLogin: build.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export default authApiSlice;
export const { usePostLoginMutation } = authApiSlice;
