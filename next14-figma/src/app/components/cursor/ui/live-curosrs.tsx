import { COLORS } from '@/shared/constants';
import { LiveCursorProps } from '@/shared/types/type'
import React from 'react'
import { Cursor } from './cursor';

export const LiveCurosrs = ({ others }: LiveCursorProps) => {
  return others.map(({ connectionId, presence }) => {
    if (presence == null || !presence?.cursor) {
      return null;
    }

    return (
      <Cursor
        key={connectionId}
        color={COLORS[Number(connectionId) % COLORS.length]}
        x={presence.cursor.x}
        y={presence.cursor.y}
        message={presence.message}
      />
    );
  });
}
