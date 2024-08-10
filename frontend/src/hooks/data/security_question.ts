import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { SecurityQuestionType, PaginationType } from "../../utils/types";
import { useAxios } from "../useAxios";
import { api_routes } from "../../utils/routes/api";
import { usePaginationQueryParam } from "../usePaginationQueryParam";
import { useSearchQueryParam } from "../useSearchQueryParam";

export const SecurityQuestionQueryKey = "security_question";
export const SecurityQuestionsQueryKey = "security_questions";
export const SecurityQuestionSelectQueryKey = "security_question_select";

export const useSecurityQuestionsQuery: () => UseQueryResult<
  PaginationType<SecurityQuestionType>,
  unknown
> = () => {
  const axios = useAxios();
  const { page, limit } = usePaginationQueryParam();
  const { search } = useSearchQueryParam();
  return useQuery({
    queryKey: [SecurityQuestionsQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<PaginationType<SecurityQuestionType>>(
        api_routes.admin.security_question.paginate +
          `?page=${page}&total=${limit}&filter[search]=${search}`
      );
      return response.data;
    },
  });
};

export const useSecurityQuestionSelectQuery: (
  enabled: boolean
) => UseQueryResult<SecurityQuestionType[], unknown> = (enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [SecurityQuestionSelectQueryKey],
    queryFn: async () => {
      const response = await axios.get<{ data: SecurityQuestionType[] }>(
        api_routes.admin.security_question.all
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useSecurityQuestionQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<SecurityQuestionType, unknown> = (id, enabled) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [SecurityQuestionQueryKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: SecurityQuestionType }>(
        api_routes.admin.security_question.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
