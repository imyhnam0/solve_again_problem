import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Savetitle.css";

const Savetitle = () => {
  const [titles, setTitles] = useState([
    { id: 1, title: "백준", link: "/page/1" },
    { id: 2, title: "컴구", link: "/page/2" },
    { id: 3, title: "알고리즘", link: "/page/3" },
  ]); // 더미 데이터
  const [newTitle, setNewTitle] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // 제목 추가
  const handleAddTitle = () => {
    const newId = titles.length > 0 ? titles[titles.length - 1].id + 1 : 1;
    const newEntry = { id: newId, title: newTitle, link: `/page/${newId}` };
    setTitles((prev) => [...prev, newEntry]);
    setNewTitle("");
    setShowInput(false);
  };

  // 제목 삭제
  const handleDeleteTitle = (id) => {
    setTitles((prev) => prev.filter((title) => title.id !== id)); // 삭제된 제목 제거
  };

  // 검색된 제목 필터링
  const filteredTitles = titles.filter((title) =>
    title.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="savetitle-app">
      <header className="header">
        <h1>Solveagin</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="검색하기"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => setShowInput(true)}>추가하기</button>
        </div>
      </header>

      {showInput && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>제목을 입력하세요</h2>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="제목 입력"
            />
            <div className="modal-buttons">
              <button onClick={handleAddTitle}>확인</button>
              <button onClick={() => setShowInput(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

      <main className="content">
        <h2>제목</h2>
        {filteredTitles.length > 0 ? (
          filteredTitles.map((title) => (
            <div
              key={title.id}
              className="title-item"
              onClick={() => navigate(`/page/${title.id}`)}
            >
              <span className="title-link">{title.title}</span>
              <button onClick={(e) => {
                e.stopPropagation(); // 클릭 이벤트 전파 방지
                handleDeleteTitle(title.id);
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

export default Savetitle;
