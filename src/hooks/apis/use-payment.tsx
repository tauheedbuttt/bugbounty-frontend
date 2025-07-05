import { queryKey } from "@/constants/queryKeys";
import useGetQuery from "../use-get-query";
import { usePaymentStore } from "@/stores/payment";
import { PaymentResponse, PaymentsQuery } from "@/types/payment";
import { getPayments } from "@/apis/payment";

export const usePayment = () => {
  const { setPayments } = usePaymentStore();

  const useGetPayments = ({
    params,
    onSuccess,
  }: {
    params: PaymentsQuery;
    onSuccess?: (data: PaymentResponse) => void;
  }) => {
    return useGetQuery<PaymentResponse, PaymentsQuery>({
      queryKey: queryKey.PAYMENTS,
      queryFn: getPayments,
      params,
      onSuccess,
      setItems: setPayments,
      extractItems: (data) => data?.data?.payment.items ?? [],
    });
  };

  return {
    useGetPayments,
  };
};
