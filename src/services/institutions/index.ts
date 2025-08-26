import { publicApi } from "../api";
import { IPagination, IPaginationResponse } from "../type";
import { IInstitution } from "./type";

export const institutionsApi = publicApi.injectEndpoints({
  endpoints: (build) => ({
    getInstitutions: build.query<
      IPaginationResponse<IInstitution[]>,
      IPagination & { typeId?: IInstitution["typeId"] }
    >({
      query: (params) => {
        console.log(params, "params");
        return {
          url: "/institution",
          params,
        };
      },
    }),
  }),
});

export const { useGetInstitutionsQuery } = institutionsApi;
