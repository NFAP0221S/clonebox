import { fabric } from "fabric"; // Fabric.js 라이브러리를 가져옴
import { v4 as uuidv4 } from "uuid"; // UUID 생성 라이브러리를 가져옴

import {
  CustomFabricObject,
  ElementDirection,
  ImageUpload,
  ModifyShape,
} from "@/shared/types/type"; // 사용자 정의 타입을 가져옴

// 사각형(Rectangle) 객체를 생성하는 함수
export const createRectangle = (pointer: PointerEvent) => {
  const rect = new fabric.Rect({
    left: pointer.x, // 사각형의 왼쪽 위치
    top: pointer.y,  // 사각형의 위쪽 위치
    width: 100, // 사각형의 너비
    height: 100, // 사각형의 높이
    fill: "#aabbcc", // 사각형의 채우기 색상
    objectId: uuidv4(), // 고유 식별자 설정
  } as CustomFabricObject<fabric.Rect>); // 사용자 정의 Fabric 객체 타입으로 캐스팅

  return rect;
};

// 삼각형(Triangle) 객체를 생성하는 함수
export const createTriangle = (pointer: PointerEvent) => {
  return new fabric.Triangle({
    left: pointer.x, // 삼각형의 왼쪽 위치
    top: pointer.y,  // 삼각형의 위쪽 위치
    width: 100, // 삼각형의 너비
    height: 100, // 삼각형의 높이
    fill: "#aabbcc", // 삼각형의 채우기 색상
    objectId: uuidv4(), // 고유 식별자 설정
  } as CustomFabricObject<fabric.Triangle>); // 사용자 정의 Fabric 객체 타입으로 캐스팅
};

// 원(Circle) 객체를 생성하는 함수
export const createCircle = (pointer: PointerEvent) => {
  return new fabric.Circle({
    left: pointer.x, // 원의 중심 x 좌표
    top: pointer.y,  // 원의 중심 y 좌표
    radius: 100, // 원의 반지름
    fill: "#aabbcc", // 원의 채우기 색상
    objectId: uuidv4(), // 고유 식별자 설정
  } as any); // 타입을 any로 설정하여 타입스크립트 검사를 우회
};

// 선(Line) 객체를 생성하는 함수
export const createLine = (pointer: PointerEvent) => {
  return new fabric.Line(
    [pointer.x, pointer.y, pointer.x + 100, pointer.y + 100], // 선의 시작과 끝 좌표
    {
      stroke: "#aabbcc", // 선의 색상
      strokeWidth: 2, // 선의 두께
      objectId: uuidv4(), // 고유 식별자 설정
    } as CustomFabricObject<fabric.Line> // 사용자 정의 Fabric 객체 타입으로 캐스팅
  );
};

// 텍스트 객체를 생성하는 함수
export const createText = (pointer: PointerEvent, text: string) => {
  return new fabric.IText(text, {
    left: pointer.x, // 텍스트의 왼쪽 위치
    top: pointer.y,  // 텍스트의 위쪽 위치
    fill: "#aabbcc", // 텍스트의 색상
    fontFamily: "Helvetica", // 글꼴
    fontSize: 36, // 글꼴 크기
    fontWeight: "400", // 글꼴 두께
    objectId: uuidv4() // 고유 식별자 설정
  } as fabric.ITextOptions); // Fabric 텍스트 옵션으로 캐스팅
};

// 주어진 도형 타입에 따라 특정 도형을 생성하는 함수
export const createSpecificShape = (
  shapeType: string,
  pointer: PointerEvent
) => {
  switch (shapeType) {
    case "rectangle":
      return createRectangle(pointer); // 사각형 생성

    case "triangle":
      return createTriangle(pointer); // 삼각형 생성

    case "circle":
      return createCircle(pointer); // 원 생성

    case "line":
      return createLine(pointer); // 선 생성

    case "text":
      return createText(pointer, "Tap to Type"); // 텍스트 생성

    default:
      return null; // 지원되지 않는 도형 타입일 경우 null 반환
  }
};

// 이미지를 업로드하고 캔버스에 추가하는 함수
export const handleImageUpload = ({
  file,
  canvas,
  shapeRef,
  syncShapeInStorage,
}: ImageUpload) => {
  const reader = new FileReader(); // FileReader 객체 생성

  reader.onload = () => {
    fabric.Image.fromURL(reader.result as string, (img) => {
      img.scaleToWidth(200); // 이미지 너비 조정
      img.scaleToHeight(200); // 이미지 높이 조정

      canvas.current.add(img); // 이미지를 캔버스에 추가

      // @ts-ignore: TypeScript 검사를 무시
      img.objectId = uuidv4(); // 고유 식별자 설정

      shapeRef.current = img; // 이미지 객체를 shapeRef에 저장

      syncShapeInStorage(img); // 이미지를 스토리지에 동기화
      canvas.current.requestRenderAll(); // 모든 객체를 렌더링
    });
  };

  reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기
};

// 캔버스에 도형을 생성하는 함수
export const createShape = (
  canvas: fabric.Canvas,
  pointer: PointerEvent,
  shapeType: string
) => {
  if (shapeType === "freeform") {
    canvas.isDrawingMode = true; // 자유형 드로잉 모드 활성화
    return null;
  }

  return createSpecificShape(shapeType, pointer); // 특정 도형 생성
};

// 선택된 도형의 속성을 수정하는 함수
export const modifyShape = ({
  canvas,
  property,
  value,
  activeObjectRef,
  syncShapeInStorage,
}: ModifyShape) => {
  const selectedElement = canvas.getActiveObject(); // 현재 선택된 객체를 가져옴

  if (!selectedElement || selectedElement?.type === "activeSelection") return;

  // 속성이 너비 또는 높이인 경우, 선택된 객체의 스케일을 설정
  if (property === "width") {
    selectedElement.set("scaleX", 1); // x축 스케일을 1로 설정
    selectedElement.set("width", value); // 너비 설정
  } else if (property === "height") {
    selectedElement.set("scaleY", 1); // y축 스케일을 1로 설정
    selectedElement.set("height", value); // 높이 설정
  } else {
    if (selectedElement[property as keyof object] === value) return; // 이미 값이 설정되어 있으면 종료
    selectedElement.set(property as keyof object, value); // 속성 설정
  }

  activeObjectRef.current = selectedElement; // 선택된 객체를 activeObjectRef에 저장

  syncShapeInStorage(selectedElement); // 수정된 객체를 스토리지에 동기화
};

// 선택된 요소를 앞으로 가져오거나 뒤로 보내는 함수
export const bringElement = ({
  canvas,
  direction,
  syncShapeInStorage,
}: ElementDirection) => {
  if (!canvas) return;

  // 선택된 요소를 가져옴. 선택된 요소가 없거나 여러 개가 선택된 경우 함수 종료
  const selectedElement = canvas.getActiveObject();

  if (!selectedElement || selectedElement?.type === "activeSelection") return;

  // 선택된 요소를 앞으로 가져옴
  if (direction === "front") {
    canvas.bringToFront(selectedElement);
  } else if (direction === "back") {
    canvas.sendToBack(selectedElement);
  }

  // canvas.renderAll(); // 모든 객체를 다시 렌더링
  syncShapeInStorage(selectedElement); // 수정된 객체를 스토리지에 동기화
};
