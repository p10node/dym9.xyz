// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

export const sleep = async (timeMs: number): Promise<null> =>
  new Promise((resolve) => {
    setTimeout(resolve, timeMs);
  });
