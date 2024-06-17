import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api_routes } from "../../utils/api_routes";
import { useSearchParams } from "react-router-dom";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constants";
import api from "../../utils/axios";
import { SecurityQuestionType, PaginationType } from "../../utils/types";

export const SecurityQuestionQueryKey = "security_question";
export const SecurityQuestionsQueryKey = "security_questions";
export const SecurityQuestionSelectQueryKey = "security_question_select";

export const useSecurityQuestionsQuery: () => UseQueryResult<
  PaginationType<SecurityQuestionType>,
  unknown
> = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";
  return useQuery({
    queryKey: [SecurityQuestionsQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await api.get<PaginationType<SecurityQuestionType>>(
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
  return useQuery({
    queryKey: [SecurityQuestionSelectQueryKey],
    queryFn: async () => {
      const response = await api.get<{ data: SecurityQuestionType[] }>(
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
  return useQuery({
    queryKey: [SecurityQuestionQueryKey, id],
    queryFn: async () => {
      const response = await api.get<{ data: SecurityQuestionType }>(
        api_routes.admin.security_question.view(id)
      );
      return response.data.data;
    },
    enabled,
  });
};
