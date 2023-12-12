// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

export type Response<T> = {
  status: boolean;
  version: "0.1.0";
  message: { code: number; text: string };
  data: T;
  error: string;
};
