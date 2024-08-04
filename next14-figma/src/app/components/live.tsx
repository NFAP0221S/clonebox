'use client' 

import React, { useCallback, useState } from 'react';
import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import { CursorChat, LiveCurosrs } from './cursor';
import { CursorMode, CursorState } from '@/shared/types/type';

export const Live = () => {
  const others = useOthers(); // 다른 사용자 정보를 가져옴
  const [{ cursor }, updateMyPresence] = useMyPresence() as any; // 현재 사용자의 커서 위치와 업데이트 함수를 가져옴

  // 커서 상태를 관리하는 상태 훅
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden, // 초기 커서 모드는 Hidden으로 설정
  });

  // 마우스 포인터가 움직일 때 호출되는 함수
  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault(); // 기본 포인터 동작을 방지

    // 커서가 반응 선택 모드가 아닌 경우, 커서 위치를 업데이트
    if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
      // 캔버스에서의 커서 위치를 계산
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

      // 다른 사용자에게 커서 위치를 전송
      updateMyPresence({
        cursor: {
          x,
          y,
        },
      });
    }
  }, [cursorState.mode, cursor, updateMyPresence]);

  // 마우스 포인터가 요소를 벗어날 때 호출되는 함수
  const handlePointerLeave = useCallback(() => {
    setCursorState({
      mode: CursorMode.Hidden,
    });
    // 커서와 메시지를 null로 업데이트하여 숨김
    updateMyPresence({
      cursor: null,
      message: null,
    });
  }, [updateMyPresence]);

  // 마우스를 누를 때 호출되는 함수
  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      // 캔버스에서의 커서 위치를 계산
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

      // 현재 커서 위치를 업데이트
      updateMyPresence({
        cursor: {
          x,
          y,
        },
      });

      // 커서가 Reaction 모드인 경우 isPressed를 true로 설정
      // setCursorState((state: CursorState) =>
      //   cursorState.mode === CursorMode.Reaction ? { ...state, isPressed: true } : state
      // );
    },
    [cursorState.mode, setCursorState, updateMyPresence]
  );

  return (
    <div 
      onPointerMove={handlePointerMove} // 포인터가 움직일 때 handlePointerMove 함수가 호출됨
      onPointerLeave={handlePointerLeave} // 포인터가 요소를 벗어날 때 handlePointerLeave 함수가 호출됨
      onPointerDown={handlePointerDown} // 포인터가 요소를 누를 때 handlePointerDown 함수가 호출됨
      className="h-[100vh] w-full flex justify-center items-center text-center"
    >
        <h1 className="text-2xl text-white">
          라이브블럭 피그마 클론
        </h1>
        {cursor && (
          <CursorChat
            cursor={cursor}
            cursorState={cursorState}
            setCursorState={setCursorState}
            updateMyPresence={updateMyPresence}
          />
        )}
        <LiveCurosrs others={others} /> {/* 다른 사용자의 커서를 표시하는 컴포넌트 */}
    </div>
  )
}
