import { queryKey } from "@/constants/queryKeys";
import useGetQuery from "../use-get-query";
import { LandingDataResponse } from "@/types/landing";
import { getLandingStats } from "@/apis/landing";

const useLanding = () => {
  const useGetLanding = ({
    onSuccess,
  }: {
    onSuccess?: (data: LandingDataResponse) => void;
  }) => {
    return useGetQuery<LandingDataResponse, {}>({
      queryKey: queryKey.LANDING,
      queryFn: getLandingStats,
      params: {},
      onSuccess,
    });
  };

  return {
    useGetLanding,
  };
};

export default useLanding;
