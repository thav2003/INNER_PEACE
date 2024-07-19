import { SERVER_URL, VIETQR_URL } from "@env";
import axios from "axios";
import { formatError } from "..";
import { getState } from "~/stores/auth.store";
export async function createPaymentLink(formValue: {
  description: string;
  productName: string;
  price: number;
  returnUrl: string;
  cancelUrl: string;
  userId: number;
  packages: string;
}) {
  const accessToken = getState().accessToken;
  try {
    console.log(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/payment/create`);
    let res = await axios({
      method: "POST",
      url: `${process.env.EXPO_PUBLIC_API_URL}/api/v1/payment/create`,
      data: formValue,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(formatError(error));
    return error.response.data;
  }
}

export async function getOrder(orderId: string) {
  try {
    let res = await axios({
      method: "GET",
      url: `${process.env.EXPO_PUBLIC_API_URL}/api/v1/payment/${orderId}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function getBanksList() {
  try {
    let res = await axios({
      method: "GET",
      url: `${process.env.EXPO_PUBLIC_VIETQR_URL}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}
export async function cancelOrder(orderId: number) {
  try {
    const res = await axios({
      method: "PUT",
      url: `${process.env.EXPO_PUBLIC_API_URL}/api/v1/payment/${orderId}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}
