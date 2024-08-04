import { useThreads } from "@liveblocks/react/suspense"; // Liveblocks 라이브러리에서 useThreads 훅을 가져옴
import { useMemo } from "react"; // React의 useMemo 훅을 가져옴

// 모든 쓰레드의 가장 높은 z-index를 반환하는 커스텀 훅
export const useMaxZIndex = () => {
  // 모든 쓰레드를 가져옴
  const { threads } = useThreads();

  // 최대 z-index를 계산함
  return useMemo(() => {
    let max = 0; // 최대 z-index를 저장할 변수를 초기화

    // 각 쓰레드를 순회하면서 z-index 값을 확인
    for (const thread of threads) {
      // @ts-ignore: TypeScript 검사를 무시
      if (thread.metadata.zIndex > max) {
        // @ts-ignore: TypeScript 검사를 무시
        max = thread.metadata.zIndex; // 현재 쓰레드의 z-index가 더 크다면 max를 업데이트
      }
    }

    return max; // 계산된 최대 z-index를 반환
  }, [threads]); // threads가 변경될 때만 메모이제이션된 값을 다시 계산
};
