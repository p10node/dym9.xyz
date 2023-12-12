// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

const openInNewTab = (url: string) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export const openInCurrentTab = (url: string) => {
  const newWindow = window.open(url, "_self");
  if (newWindow) newWindow.opener = null;
};

export default openInNewTab;
