import React from "react";

const RouteGuard = (props) => {
  const { Component } = props;
  const token = localStorage.getItem("token");

  return token ? <Component /> : null;
};

export default RouteGuard;
