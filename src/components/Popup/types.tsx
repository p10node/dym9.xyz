// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

export type PopupType = {
  title: string;
  content: JSX.Element;
  okCallback: () => Promise<boolean>;
  cancelCallback: () => void;
  type?: "success" | "warning" | "error" | "info" | "confirm" | "yesno";
  cancelText?: string;
  okText?: string;
  showOk?: boolean;
  showCancel?: boolean;
  showClose?: boolean;
  clickBackgroundToClose?: boolean;
};
