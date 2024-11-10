// nickname_api.js

const fetchSummaries = async () => {
  try {
    const nickname = localStorage.getItem("nickname");

    if (!nickname) {
      console.error("닉네임이 로컬 스토리지에 없습니다.");
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}chat/summary`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ receiver: nickname }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log("받아온 5개 요약 데이터:", result);
      return result.sentences;
    } else {
      console.error("서버 요청 실패");
      throw new Error("서버 요청 실패");
    }
  } catch (error) {
    console.error("요약API 요청 중 오류 발생:", error);
    throw error;
  }
};

export default fetchSummaries;
