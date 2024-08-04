import { fabric } from "fabric"; // Fabric.js 라이브러리를 가져옴
import { v4 as uuidv4 } from "uuid"; // UUID 생성 라이브러리를 가져옴

import { CustomFabricObject } from "@/shared/types/type"; // 사용자 정의 타입을 가져옴

// 캔버스에서 선택된 객체를 복사하는 함수
export const handleCopy = (canvas: fabric.Canvas) => {
  const activeObjects = canvas.getActiveObjects(); // 현재 선택된 객체를 가져옴
  if (activeObjects.length > 0) {
    // 선택된 객체를 직렬화(serialize)
    const serializedObjects = activeObjects.map((obj) => obj.toObject());
    // 직렬화된 객체를 클립보드에 저장
    localStorage.setItem("clipboard", JSON.stringify(serializedObjects));
  }

  return activeObjects; // 선택된 객체 반환
};

// 캔버스에 객체를 붙여넣는 함수
export const handlePaste = (
  canvas: fabric.Canvas,
  syncShapeInStorage: (shape: fabric.Object) => void
) => {
  if (!canvas || !(canvas instanceof fabric.Canvas)) {
    console.error("Invalid canvas object. Aborting paste operation.");
    return;
  }

  // 클립보드에서 직렬화된 객체 가져오기
  const clipboardData = localStorage.getItem("clipboard");

  if (clipboardData) {
    try {
      const parsedObjects = JSON.parse(clipboardData); // JSON 문자열을 객체로 변환
      parsedObjects.forEach((objData: fabric.Object) => {
        // localStorage에서 가져온 순수 JavaScript 객체를 fabric.js 객체로 변환
        fabric.util.enlivenObjects(
          [objData],
          (enlivenedObjects: fabric.Object[]) => {
            enlivenedObjects.forEach((enlivenedObj) => {
              // 붙여넣는 객체의 위치를 기존 객체와 겹치지 않도록 오프셋 설정
              enlivenedObj.set({
                left: enlivenedObj.left || 0 + 20, // 20px 오른쪽으로 이동
                top: enlivenedObj.top || 0 + 20,   // 20px 아래로 이동
                objectId: uuidv4(), // 새로운 고유 식별자 설정
                fill: "#aabbcc", // 기본 채우기 색상 설정
              } as CustomFabricObject<any>);

              canvas.add(enlivenedObj); // 캔버스에 객체 추가
              syncShapeInStorage(enlivenedObj); // 스토리지에 객체 동기화
            });
            canvas.renderAll(); // 캔버스를 다시 렌더링
          },
          "fabric"
        );
      });
    } catch (error) {
      console.error("Error parsing clipboard data:", error);
    }
  }
};

// 캔버스에서 선택된 객체를 삭제하는 함수
export const handleDelete = (
  canvas: fabric.Canvas,
  deleteShapeFromStorage: (id: string) => void
) => {
  const activeObjects = canvas.getActiveObjects(); // 현재 선택된 객체를 가져옴
  if (!activeObjects || activeObjects.length === 0) return;

  if (activeObjects.length > 0) {
    activeObjects.forEach((obj: CustomFabricObject<any>) => {
      if (!obj.objectId) return;
      canvas.remove(obj); // 객체를 캔버스에서 제거
      deleteShapeFromStorage(obj.objectId); // 스토리지에서 객체 제거
    });
  }

  canvas.discardActiveObject(); // 선택된 객체 해제
  canvas.requestRenderAll(); // 캔버스를 다시 렌더링
};

// 다양한 키보드 이벤트를 처리하는 함수
export const handleKeyDown = ({
  e,
  canvas,
  undo,
  redo,
  syncShapeInStorage,
  deleteShapeFromStorage,
}: {
  e: KeyboardEvent;
  canvas: fabric.Canvas | any;
  undo: () => void;
  redo: () => void;
  syncShapeInStorage: (shape: fabric.Object) => void;
  deleteShapeFromStorage: (id: string) => void;
}) => {
  // ctrl/cmd + c (복사)
  if ((e?.ctrlKey || e?.metaKey) && e.keyCode === 67) {
    handleCopy(canvas);
  }

  // ctrl/cmd + v (붙여넣기)
  if ((e?.ctrlKey || e?.metaKey) && e.keyCode === 86) {
    handlePaste(canvas, syncShapeInStorage);
  }

  // ctrl/cmd + x (잘라내기)
  if ((e?.ctrlKey || e?.metaKey) && e.keyCode === 88) {
    handleCopy(canvas);
    handleDelete(canvas, deleteShapeFromStorage);
  }

  // ctrl/cmd + z (되돌리기)
  if ((e?.ctrlKey || e?.metaKey) && e.keyCode === 90) {
    undo();
  }

  // ctrl/cmd + y (다시 실행)
  if ((e?.ctrlKey || e?.metaKey) && e.keyCode === 89) {
    redo();
  }

  // 슬래시('/') 입력을 방지
  if (e.keyCode === 191 && !e.shiftKey) {
    e.preventDefault();
  }
};
