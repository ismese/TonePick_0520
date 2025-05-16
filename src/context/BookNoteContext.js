import React, { createContext, useState, useContext } from 'react';

// Context 생성
const BookNoteContext = createContext();

// Provider 정의
export const BookNoteProvider = ({ children }) => {
  const [bookNotes, setBookNotes] = useState([]); // PDF 북노트 저장용

  // 새로운 북노트 추가
  const addBookNote = (title, uri) => {
    const now = new Date();
    const date = now.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    setBookNotes(prev => [{ title, date, uri }, ...prev]);
  };

  return (
    <BookNoteContext.Provider value={{ bookNotes, addBookNote }}>
      {children}
    </BookNoteContext.Provider>
  );
};

// 커스텀 훅
export const useBookNote = () => useContext(BookNoteContext);
