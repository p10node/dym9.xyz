// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

import React from "react";
import Deploy from "../../components/Home/Deploy";
import Guide from "../../components/Home/Guide";
import Hero from "../../components/Home/Hero";

const Home: React.FC = () => {
  return (
    <div className="text-white">
      <Hero />
      {/* <Rewards /> */}
      <Guide />
      <Deploy />
    </div>
  );
};

export default Home;
