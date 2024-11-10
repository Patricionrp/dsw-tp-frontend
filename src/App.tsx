import React from "react";
import { MainPage } from "./components/pages/MainPage";
import { useNavigate } from "react-router-dom";

export function App() {
  console.log(localStorage.getItem("user"));
  return (
    <>
      <MainPage />
    </>
  );
}
