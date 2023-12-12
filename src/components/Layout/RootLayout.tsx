// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const RootLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <div className="bg1" />
      <div className="bg2" />
      <div className="bg3" />
    </>
  );
};

export default RootLayout;
