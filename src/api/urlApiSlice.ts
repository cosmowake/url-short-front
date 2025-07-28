import apiSlice from "@/api/api";

export interface PostSaveUrlRequest {
  url: string;
  alias?: string;
}

export interface PostSaveUrlResponse {
  alias?: string;
  status: "OK" | "Error";
  error?: string;
}

export interface GetUrlListRequest {
  page: number;
  size: number;
}

export interface PaginationResponse<T> {
  items?: T[];
  totalCount?: number;
  status: "OK" | "Error";
  error?: string;
}

export interface UrlDTO {
  id: number;
  url: string;
  alias: string;
}

const urlApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    postSaveUrl: build.mutation<PostSaveUrlResponse, PostSaveUrlRequest>({
      query: (data) => ({
        url: `/url`,
        method: "POST",
        body: data,
      }),
    }),
    getUrlList: build.query<PaginationResponse<UrlDTO>, GetUrlListRequest>({
      query: (data) => ({
        url: `/admin/url/list?page=${data.page}&size=${data.size}`,
        method: "GET",
      }),
    }),
    deleteUrl: build.mutation<string, { id: number }>({
      query: (data) => ({
        url: `/admin/url`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export default urlApiSlice;
export const {
  usePostSaveUrlMutation,
  useGetUrlListQuery,
  useLazyGetUrlListQuery,
  useDeleteUrlMutation,
} = urlApiSlice;
