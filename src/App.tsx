import { MainPage } from "./components/pages/MainPage";

export function App() {
  console.log(localStorage.getItem("user"));
  return (
    <>
      <MainPage />
    </>
  );
}
