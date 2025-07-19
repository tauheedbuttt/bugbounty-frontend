import { queryKey } from "@/constants/queryKeys";
import useGetQuery from "../use-get-query";
import { usePaymentStore } from "@/stores/payment";
import {
  SendPaymentData,
  PaymentData,
  PaymentResponse,
  PaymentsQuery,
} from "@/types/payment";
import { getPayments, sendPayment } from "@/apis/payment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";

export const usePayment = () => {
  const { setPayments } = usePaymentStore();
  const queryClient = useQueryClient();

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

  const useSendPayment = (onClose: VoidFunction) =>
    useMutation({
      mutationFn: (data: SendPaymentData) => sendPayment(data),
      onSuccess: (data: PaymentData) => {
        queryClient.invalidateQueries({
          queryKey: [queryKey.PAYMENTS],
        });
        toast({ title: "Payment marked as Paid!" });
        onClose();
      },
      onError: (error) => {
        toast({
          title: error.message,
          description: "Please check your input and try again.",
          variant: "destructive",
        });
      },
    });

  return {
    useGetPayments,
    useSendPayment,
  };
};
