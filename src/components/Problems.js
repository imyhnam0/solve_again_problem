import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import "./Problems.css";

const Problems = () => {
  const [content, setContent] = useState([{ type: "text", content: "" }]); // 초기 텍스트 입력 공간 포함
  const [showPreview, setShowPreview] = useState(false); // 미리보기 모달 상태

  useEffect(() => {
    const savedContent = JSON.parse(localStorage.getItem("content")) || [{ type: "text", content: "" }];
    setContent(savedContent);
  }, []);

  useEffect(() => {
    localStorage.setItem("content", JSON.stringify(content));
  }, [content]);

  // 이미지 업로드 시 이미지 + 텍스트 입력 공간 추가
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = { type: "image", content: reader.result };
        const newText = { type: "text", content: "" }; // 이미지 아래 텍스트 입력 공간 추가

        setContent((prev) => [...prev, newImage, newText]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => onDrop(files),
    accept: "image/*",
  });

  // 입력창 자동 크기 조절 함수
  const handleTextChange = (index, value) => {
    setContent((prev) =>
      prev.map((c, idx) => (idx === index ? { type: "text", content: value } : c))
    );
  };

  // 아이템 삭제
  const handleDelete = (index) => {
    setContent((prev) => prev.filter((_, idx) => idx !== index));
  };

  // 미리보기 버튼 클릭 시
  const handlePreview = () => {
    setShowPreview(true);
  };

  return (
    <div className="app">
      {/* 제목 및 버튼 컨테이너 */}
      <div className="header">
        <h1>Notion 스타일 메모</h1>
        <div className="header-buttons">
          <button className="preview-btn" onClick={handlePreview}>미리보기</button>
        </div>
      </div>

      {/* 이미지 업로드 영역 */}
      <div className="dropzone-container">
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>이미지를 드래그하거나 클릭해서 업로드</p>
        </div>
      </div>

      {/* 콘텐츠 리스트 */}
      <div className="content-list">
        {content.map((item, index) => (
          <div key={index} className="content-item">
            {item.type === "image" ? (
              <img src={item.content} alt="Uploaded" />
            ) : (
              <AutoResizeTextarea
                value={item.content}
                onChange={(e) => handleTextChange(index, e.target.value)}
              />
            )}
            <button className="delete-btn" onClick={() => handleDelete(index)}>삭제</button>
          </div>
        ))}
      </div>

      {/* 미리보기 모달 */}
      {showPreview && (
        <div className="modal-overlay" onClick={() => setShowPreview(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>미리보기</h2>
            <div className="preview-content">
              {content.map((item, index) => (
                <div key={index} className="preview-item">
                  {item.type === "image" ? (
                    <img src={item.content} alt="Uploaded" />
                  ) : (
                    <p>{item.content}</p>
                  )}
                </div>
              ))}
            </div>
            <button className="close-btn" onClick={() => setShowPreview(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

// 자동 크기 조절되는 textarea 컴포넌트
const AutoResizeTextarea = ({ value, onChange }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 초기화
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"; // 내용에 따라 높이 조절
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder="여기에 입력하세요..."
      className="auto-resize-textarea"
    />
  );
};

export default Problems;
