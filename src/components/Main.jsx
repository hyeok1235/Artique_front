import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./section/Header";
import Footer from "./section/Footer";
import { NavigationButton } from "../style/jsx/button";
import "../style/background_picture.css";

export default function Main() {
  const navigate = useNavigate();

  return (
    <>
      <div className="start-page">
        <Header />
        <main style={{ textAlign: "center", marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <NavigationButton onClick={() => navigate("/adminview")}>
              관리자 모드
            </NavigationButton>
            <NavigationButton onClick={() => navigate("/userview")}>
              관람객 모드
            </NavigationButton>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
