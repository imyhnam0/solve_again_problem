import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Savetitle.css";

const TitlePage = () => {
  const { titleId } = useParams(); // URL에서 제목 ID 가져오기
  const [titles, setTitles] = useState([
    { id: 1, title: "백준" },
    { id: 2, title: "컴구" },
    { id: 3, title: "알고리즘"},
  ]); 
  const [problems, setProblems] = useState([
    { id: 1, name: "문제 1" },
    { id: 2, name: "문제 2" },
    { id: 3, name: "문제 3" },
  ]);

  const [showInput, setShowInput] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // 검색된 제목 필터링
  const filteredProblems = problems.filter((problem) =>
    problem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // 제목 삭제
  const handleDeleteTitle = (id) => {
    setProblems((prev) => prev.filter((problem) => problem.id !== id)); // 삭제된 제목 제거
  };

  // 현재 제목 가져오기
  const currentTitle = titles.find((t) => t.id === parseInt(titleId))?.title || "제목 없음";

   // 문제 추가 (백엔드 저장)
   const handleAddProblem = async () => {
    if (!newTitle.trim()) return;

    try {
      const response = await fetch("http://your-backend-url/problems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newTitle, titleId: parseInt(titleId) }),
      });

      if (!response.ok) {
        throw new Error("문제를 저장하는 중 오류가 발생했습니다");
      }

      const newProblem = await response.json();
      setProblems((prev) => [...prev, newProblem]); // 새로운 문제 추가
      setNewTitle("");
      setShowInput(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="title-page-app">
      <header className="header">
        <h1>{currentTitle}</h1>
        <div className="header-actions">
        <input
            type="text"
            placeholder="검색하기"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // 검색어 업데이트
          />
          <button onClick={() => setShowInput(true)}>추가하기</button>
        </div>
      </header>
      {showInput && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>문제를 입력하세요</h2>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="문제 입력"
            />
            <div className="modal-buttons">
              <button onClick={handleAddProblem}>확인</button>
              <button onClick={() => setShowInput(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

      <main className="content">
        <h2>문제 리스트</h2>
        {filteredProblems.length > 0 ? (
          filteredProblems.map((problem) => (
            <div
              key={problem.id}
              className="title-item"
              onClick={() => navigate(`/problem/${problem.id}`)} // 문제 클릭 시 이동
            >
              <span className="title-link">{problem.name}</span>
              <button onClick={(e) => {
                e.stopPropagation(); // 클릭 이벤트 전파 방지
                handleDeleteTitle(problem.id);
              }}>삭제하기</button>
            </div>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </main>
    </div>
  );
};

export default TitlePage;
