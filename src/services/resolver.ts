// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

export const resolverError = (key: string, type: string, message: string) => {
  return {
    [key]: { type, message },
  };
};
