import React, { useEffect } from 'react';
import { CursorChatProps, CursorMode } from '@/shared/types/type';
import CursorSVG from '@/../public/assets/CursorSVG';

export const CursorChat = ({ cursor, cursorState, setCursorState, updateMyPresence }: CursorChatProps) => {

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "/") {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        });
      } else if (e.key === "Escape") {
        updateMyPresence({ message: "" });
        setCursorState({ mode: CursorMode.Hidden });
      } else if (e.key === "e") {
        setCursorState({ mode: CursorMode.ReactionSelector });
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
      }
    };

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [updateMyPresence]);


  // 입력 변화가 있을 때 호출되는 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateMyPresence({ message: e.target.value }); // 사용자의 현재 메시지 상태를 업데이트
    setCursorState({
      mode: CursorMode.Chat, // 채팅 모드로 설정
      previousMessage: null, // 이전 메시지를 초기화
      message: e.target.value, // 현재 입력된 메시지 설정
    });
  };

  // 키 입력 이벤트를 처리하는 함수 (Enter, Escape 키)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { // Enter 키가 눌렸을 때
      setCursorState({
        mode: CursorMode.Chat, // 채팅 모드 유지
        // @ts-ignore
        previousMessage: cursorState.message, // 현재 메시지를 이전 메시지로 저장
        message: "", // 입력 필드를 비움
      });
    } else if (e.key === "Escape") { // Escape 키가 눌렸을 때
      setCursorState({
        mode: CursorMode.Hidden, // 채팅 입력을 숨김
      });
    }
  };

  return (
    <div
      className="absolute top-0 left-0"
      style={{
        transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`, // 커서 위치에 맞춰 이동
      }}
    >
      {/* 커서가 채팅 모드일 때 메시지 입력창 표시 */}
      {cursorState.mode === CursorMode.Chat && (
        <>
          {/* 사용자 정의 커서 모양 */}
          <CursorSVG color="#000" />

          <div
            className="absolute left-2 top-5 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white"
            onKeyUp={(e) => e.stopPropagation()} // keyup 이벤트 전파 중지
            style={{
              borderRadius: 20, // 메시지 상자에 둥근 모서리 스타일 적용
            }}
          >
            {/**
             * 이전 메시지가 있는 경우, 입력창 위에 표시
             *
             * 사용자가 Enter를 누르면 이전 메시지를 위에 표시하고
             * 입력창을 아래에 표시하기 위함
             */}
            {cursorState.previousMessage && <div>{cursorState.previousMessage}</div>}
            <input
              className="z-10 w-60 border-none bg-transparent text-white placeholder-blue-300 outline-none"
              autoFocus={true} // 입력창에 자동 포커스
              onChange={handleChange} // 입력값 변경 시 handleChange 호출
              onKeyDown={handleKeyDown} // 키 입력 시 handleKeyDown 호출
              placeholder={cursorState.previousMessage ? "" : "Say something…"} // 플레이스홀더 텍스트
              value={cursorState.message} // 입력값을 상태값으로 설정
              maxLength={50} // 입력 가능한 최대 길이 제한
            />
          </div>
        </>
      )}
    </div>
  );
};
