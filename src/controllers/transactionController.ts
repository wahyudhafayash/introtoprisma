import { Request, Response } from "express";
import axios from "axios";
import { Transaction } from "../utils/interface.ts";
import dotenv from "dotenv";
dotenv.config();

export const createBankTransferTransaction = async (
  req: Request,
  res: Response
) => {
  const {
    order_id,
    gross_amount,
    bank_code,
    first_name,
    last_name,
    email,
    phone,
  } = req.body;
  try {
    const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY as string;
    const base64EncodedKey = Buffer.from(SERVER_KEY).toString("base64");
    const bodyRequest: Transaction = {
      payment_type: "bank_transfer",
      transaction_details: {
        order_id: order_id,
        gross_amount: gross_amount,
      },
      bank_transfer: {
        bank: bank_code,
      },
      customer_details: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
      },
    };
    const transactionResponse = await axios.post(
      "https://api.sandbox.midtrans.com/v2/charge",
      bodyRequest,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${base64EncodedKey}`,
        },
      }
    );
    res.status(201).send({
      data: transactionResponse.data,
    });
  } catch (error: any) {
    res.status(500).send({
      error: "Failed to create bank transfer transaction",
      status: error.response?.status + " " + error.response?.statusText,
      description: error.response?.data,
    });
  }
};

export const createSnapTransaction = async (req: Request, res: Response) => {
  const { order_id, gross_amount, first_name, last_name, email, phone } =
    req.body;
  const body: Transaction = {
    transaction_details: {
      order_id: order_id,
      gross_amount: Number(gross_amount),
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
    },
  };
  try {
    const midtransResponse = await axios.post(
      "https://app.sandbox.midtrans.com/snap/v1/transactions",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            process.env.MIDTRANS_SERVER_KEY + ":"
          ).toString("base64")}`,
        },
      }
    );
    res.status(201).send({ data: midtransResponse.data });
  } catch (error: any) {
    res
      .status(500)
      .send({ data: error.response ? error.response.data : error.message });
  }
};
