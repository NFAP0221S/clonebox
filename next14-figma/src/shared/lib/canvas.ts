import { fabric } from "fabric";
import { v4 as uuid4 } from "uuid";

import {
  CanvasMouseDown,
  CanvasMouseMove,
  CanvasMouseUp,
  CanvasObjectModified,
  CanvasObjectScaling,
  CanvasPathCreated,
  CanvasSelectionCreated,
  RenderCanvas,
} from "@/shared/types/type";
import { defaultNavElement } from "@/shared/constants";
import { createSpecificShape } from "./shapes";

// Fabric.js 캔버스 초기화 함수
export const initializeFabric = ({
  fabricRef,
  canvasRef,
}: {
  fabricRef: React.MutableRefObject<fabric.Canvas | null>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}) => {
  // DOM에서 캔버스 엘리먼트를 가져옴
  const canvasElement = document.getElementById("canvas");

  // Fabric.js 캔버스를 생성하고, 캔버스 크기를 설정함
  const canvas = new fabric.Canvas(canvasRef.current, {
    width: canvasElement?.clientWidth,
    height: canvasElement?.clientHeight,
  });

  // 생성한 캔버스를 fabricRef에 저장하여 이후 사용 가능하게 함
  fabricRef.current = canvas;

  return canvas;
};

// 사용자가 캔버스를 클릭할 때 처리하는 함수
export const handleCanvasMouseDown = ({
  options,
  canvas,
  selectedShapeRef,
  isDrawing,
  shapeRef,
}: CanvasMouseDown) => {
  // 현재 마우스 포인터의 좌표를 가져옴
  const pointer = canvas.getPointer(options.e);

  /**
   * 클릭한 대상 객체를 가져옴
   * findTarget() 메서드는 클릭된 객체를 반환함
   *
   * findTarget: http://fabricjs.com/docs/fabric.Canvas.html#findTarget
   */
  const target = canvas.findTarget(options.e, false);

  // 캔버스의 드로잉 모드를 비활성화함
  canvas.isDrawingMode = false;

  // 선택된 도형이 'freeform'인 경우, 드로잉 모드를 활성화하고 리턴함
  if (selectedShapeRef.current === "freeform") {
    isDrawing.current = true;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 5;
    return;
  }

  // 드로잉 모드를 비활성화함
  canvas.isDrawingMode = false;

  // 클릭한 대상이 선택된 도형이거나 활성화된 선택 영역인 경우
  if (
    target &&
    (target.type === selectedShapeRef.current ||
      target.type === "activeSelection")
  ) {
    isDrawing.current = false;

    // 클릭한 대상을 활성 객체로 설정
    canvas.setActiveObject(target);

    /**
     * setCoords() 메서드는 객체의 컨트롤을 업데이트함
     * setCoords: http://fabricjs.com/docs/fabric.Object.html#setCoords
     */
    target.setCoords();
  } else {
    isDrawing.current = true;

    // 커스텀 Fabric 객체/도형을 생성하고 shapeRef에 저장
    shapeRef.current = createSpecificShape(
      selectedShapeRef.current,
      pointer as any
    );

    // shapeRef가 null이 아닌 경우, 캔버스에 객체를 추가함
    if (shapeRef.current) {
      // add: http://fabricjs.com/docs/fabric.Canvas.html#add
      canvas.add(shapeRef.current);
    }
  }
};

// 캔버스에서 마우스를 이동할 때 도형의 크기를 조절하는 함수
export const handleCanvaseMouseMove = ({
  options,
  canvas,
  isDrawing,
  selectedShapeRef,
  shapeRef,
  syncShapeInStorage,
}: CanvasMouseMove) => {
  // 드로잉 모드가 아니거나 선택된 도형이 'freeform'인 경우 함수 종료
  if (!isDrawing.current) return;
  if (selectedShapeRef.current === "freeform") return;

  canvas.isDrawingMode = false;

  // 현재 마우스 포인터의 좌표를 가져옴
  const pointer = canvas.getPointer(options.e);

  // 선택된 도형에 따라 크기를 설정
  switch (selectedShapeRef?.current) {
    case "rectangle":
      shapeRef.current?.set({
        width: pointer.x - (shapeRef.current?.left || 0),
        height: pointer.y - (shapeRef.current?.top || 0),
      });
      break;

    case "circle":
      shapeRef.current.set({
        radius: Math.abs(pointer.x - (shapeRef.current?.left || 0)) / 2,
      });
      break;

    case "triangle":
      shapeRef.current?.set({
        width: pointer.x - (shapeRef.current?.left || 0),
        height: pointer.y - (shapeRef.current?.top || 0),
      });
      break;

    case "line":
      shapeRef.current?.set({
        x2: pointer.x,
        y2: pointer.y,
      });
      break;

    case "image":
      shapeRef.current?.set({
        width: pointer.x - (shapeRef.current?.left || 0),
        height: pointer.y - (shapeRef.current?.top || 0),
      });
      break;

    default:
      break;
  }

  // 캔버스에 있는 모든 객체를 렌더링함
  // renderAll: http://fabricjs.com/docs/fabric.Canvas.html#renderAll
  canvas.renderAll();

  // 객체가 스토리지에 동기화될 수 있도록 설정
  if (shapeRef.current?.objectId) {
    syncShapeInStorage(shapeRef.current);
  }
};

// 캔버스에서 마우스를 놓을 때 드로잉을 중지하는 함수
export const handleCanvasMouseUp = ({
  canvas,
  isDrawing,
  shapeRef,
  activeObjectRef,
  selectedShapeRef,
  syncShapeInStorage,
  setActiveElement,
}: CanvasMouseUp) => {
  // 드로잉 상태를 false로 설정
  isDrawing.current = false;
  if (selectedShapeRef.current === "freeform") return;

  // 드로잉이 중지되었으므로 객체를 스토리지에 동기화함
  syncShapeInStorage(shapeRef.current);

  // 모든 참조값을 null로 초기화
  shapeRef.current = null;
  activeObjectRef.current = null;
  selectedShapeRef.current = null;

  // 캔버스가 드로잉 모드가 아닐 때, 700ms 후에 기본 네비게이션 요소로 활성화된 요소를 설정
  if (!canvas.isDrawingMode) {
    setTimeout(() => {
      setActiveElement(defaultNavElement);
    }, 700);
  }
};

// 객체가 수정될 때 객체를 스토리지에 업데이트하는 함수
export const handleCanvasObjectModified = ({
  options,
  syncShapeInStorage,
}: CanvasObjectModified) => {
  const target = options.target;
  if (!target) return;

  if (target?.type == "activeSelection") {
    // 이 부분은 추가 구현이 필요함
  } else {
    // 변경된 객체를 스토리지에 동기화함
    syncShapeInStorage(target);
  }
};

// 자유형 모드에서 경로가 생성될 때 경로를 스토리지에 업데이트하는 함수
export const handlePathCreated = ({
  options,
  syncShapeInStorage,
}: CanvasPathCreated) => {
  // 경로 객체를 가져옴
  const path = options.path;
  if (!path) return;

  // 경로 객체에 고유 ID를 설정
  path.set({
    objectId: uuid4(),
  });

  // 경로 객체를 스토리지에 동기화함
  syncShapeInStorage(path);
};

// 캔버스 위에서 객체가 이동할 때 객체의 이동을 제한하는 함수
export const handleCanvasObjectMoving = ({
  options,
}: {
  options: fabric.IEvent;
}) => {
  // 이동 중인 대상 객체를 가져옴
  const target = options.target as fabric.Object;

  // 대상 객체가 이동 중인 캔버스를 가져옴
  const canvas = target.canvas as fabric.Canvas;

  // 대상 객체의 좌표를 설정
  target.setCoords();

  // 객체를 캔버스의 가로 경계 내로 제한함
  if (target && target.left) {
    target.left = Math.max(
      0,
      Math.min(
        target.left,
        (canvas.width || 0) - (target.getScaledWidth() || target.width || 0)
      )
    );
  }

  // 객체를 캔버스의 세로 경계 내로 제한함
  if (target && target.top) {
    target.top = Math.max(
      0,
      Math.min(
        target.top,
        (canvas.height || 0) - (target.getScaledHeight() || target.height || 0)
      )
    );
  }
};

// 요소가 선택되었을 때 요소의 속성을 설정하는 함수
export const handleCanvasSelectionCreated = ({
  options,
  isEditingRef,
  setElementAttributes,
}: CanvasSelectionCreated) => {
  // 사용자가 수동으로 편집 중인 경우 함수 종료
  if (isEditingRef.current) return;

  // 선택된 요소가 없는 경우 함수 종료
  if (!options?.selected) return;

  // 선택된 요소를 가져옴
  const selectedElement = options?.selected[0] as fabric.Object;

  // 하나의 요소만 선택된 경우 요소의 속성을 설정
  if (selectedElement && options.selected.length === 1) {
    // 객체의 크기를 계산
    const scaledWidth = selectedElement?.scaleX
      ? selectedElement?.width! * selectedElement?.scaleX
      : selectedElement?.width;

    const scaledHeight = selectedElement?.scaleY
      ? selectedElement?.height! * selectedElement?.scaleY
      : selectedElement?.height;

    setElementAttributes({
      width: scaledWidth?.toFixed(0).toString() || "",
      height: scaledHeight?.toFixed(0).toString() || "",
      fill: selectedElement?.fill?.toString() || "",
      stroke: selectedElement?.stroke || "",
      // @ts-ignore
      fontSize: selectedElement?.fontSize || "",
      // @ts-ignore
      fontFamily: selectedElement?.fontFamily || "",
      // @ts-ignore
      fontWeight: selectedElement?.fontWeight || "",
    });
  }
};

// 요소가 크기 조정될 때 요소의 속성을 업데이트하는 함수
export const handleCanvasObjectScaling = ({
  options,
  setElementAttributes,
}: CanvasObjectScaling) => {
  const selectedElement = options.target;

  // 객체의 크기를 계산
  const scaledWidth = selectedElement?.scaleX
    ? selectedElement?.width! * selectedElement?.scaleX
    : selectedElement?.width;

  const scaledHeight = selectedElement?.scaleY
    ? selectedElement?.height! * selectedElement?.scaleY
    : selectedElement?.height;

  // 이전 상태에 새로운 크기를 업데이트하여 설정
  setElementAttributes((prev) => ({
    ...prev,
    width: scaledWidth?.toFixed(0).toString() || "",
    height: scaledHeight?.toFixed(0).toString() || "",
  }));
};

// 스토리지에서 오는 캔버스 객체들을 캔버스에 렌더링하는 함수
export const renderCanvas = ({
  fabricRef,
  canvasObjects,
  activeObjectRef,
}: RenderCanvas) => {
  // 캔버스를 지움
  fabricRef.current?.clear();

  // 캔버스에 모든 객체를 렌더링함
  Array.from(canvasObjects, ([objectId, objectData]) => {
    /**
     * enlivenObjects() 메서드는 캔버스에 객체를 렌더링하는 데 사용됨
     * 두 개의 인수를 받음:
     * 1. objectData: 캔버스에 렌더링할 객체 데이터
     * 2. callback: 객체가 캔버스에 렌더링된 후 실행할 콜백 함수
     *
     * enlivenObjects: http://fabricjs.com/docs/fabric.util.html#.enlivenObjectEnlivables
     */
    fabric.util.enlivenObjects(
      [objectData],
      (enlivenedObjects: fabric.Object[]) => {
        enlivenedObjects.forEach((enlivenedObj) => {
          // 요소가 활성화되어 있으면, 계속 활성 상태를 유지하여 추가 편집이 가능하게 함
          if (activeObjectRef.current?.objectId === objectId) {
            fabricRef.current?.setActiveObject(enlivenedObj);
          }

          // 객체를 캔버스에 추가
          fabricRef.current?.add(enlivenedObj);
        });
      },
      /**
       * Fabric이 캔버스에 객체를 렌더링할 수 있도록 객체의 네임스페이스를 지정
       * 네임스페이스는 객체 유형을 식별하는 문자열임
       *
       * Fabric Namespace: http://fabricjs.com/docs/fabric.html
       */
      "fabric"
    );
  });

  fabricRef.current?.renderAll();
};

// 창 크기가 변경될 때 캔버스 크기를 조정하는 함수
export const handleResize = ({ canvas }: { canvas: fabric.Canvas | null }) => {
  const canvasElement = document.getElementById("canvas");
  if (!canvasElement) return;

  if (!canvas) return;

  // 캔버스의 크기를 DOM 요소의 크기에 맞게 설정
  canvas.setDimensions({
    width: canvasElement.clientWidth,
    height: canvasElement.clientHeight,
  });
};

// 마우스 휠로 캔버스를 확대/축소하는 함수
export const handleCanvasZoom = ({
  options,
  canvas,
}: {
  options: fabric.IEvent & { e: WheelEvent };
  canvas: fabric.Canvas;
}) => {
  const delta = options.e?.deltaY;
  let zoom = canvas.getZoom();

  // 최소 20%에서 최대 100%까지 확대/축소를 허용
  const minZoom = 0.2;
  const maxZoom = 1;
  const zoomStep = 0.001;

  // 마우스 휠에 따라 확대/축소를 계산하고 최소 및 최대 줌 수준을 적용
  zoom = Math.min(Math.max(minZoom, zoom + delta * zoomStep), maxZoom);

  // 줌을 캔버스에 설정
  // zoomToPoint: http://fabricjs.com/docs/fabric.Canvas.html#zoomToPoint
  canvas.zoomToPoint({ x: options.e.offsetX, y: options.e.offsetY }, zoom);

  options.e.preventDefault();
  options.e.stopPropagation();
};
