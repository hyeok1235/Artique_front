import React from "react";
import "../../../style/background_picture.css";

export default function Last() {
  return (
    <div className="start-page">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", // 화면의 중앙에 세로 정렬
          textAlign: "center",
        }}
      >
        <h1>「별이 빛나는 밤에」</h1>
        <p>
          대화가 종료되었습니다.<br></br>
          <br></br>예술로 영혼이 치유되는 따뜻한 경험이 되었길 바랍니다.
          <br></br>
          <br></br>(엔딩크레딧 들어갈 자리)
        </p>
      </div>
    </div>
  );
}
