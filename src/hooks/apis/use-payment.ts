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
import { useTranslation } from "../use-translation";

export const usePayment = () => {
  const { t } = useTranslation();
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
        toast({ title: t.common.messages.payment_marked_as_paid });
        onClose();
      },
      onError: (error) => {
        toast({
          title: error.message,
          description: t.common.messages.please_check_your_input_and_try_again,
          variant: "destructive",
        });
      },
    });

  return {
    useGetPayments,
    useSendPayment,
  };
};
