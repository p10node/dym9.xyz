// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

class LocalStorage<T> {
  private reducerKey = "";

  constructor(reducerKey: string) {
    this.reducerKey = reducerKey;
  }

  get(defaultData: T) {
    const data = localStorage.getItem(this.reducerKey);
    if (data) {
      return JSON.parse(data) as T;
    }
    return defaultData;
  }

  set(data: T) {
    localStorage.setItem(this.reducerKey, JSON.stringify(data));
    return data;
  }
}

export default LocalStorage;
