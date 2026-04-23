/* eslint-disable react-hooks/incompatible-library */

"use client";

import React, { useRef, useState, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

const TOTAL_COLUMNS = 10000;
const TOTAL_ROWS = 10000;

const CARD_WIDTH = 358;
const CARD_HEIGHT = 223;

const GAP_X = 32; // horizontal spacing
const GAP_Y = 32; // vertical spacing

const CELL_WIDTH = CARD_WIDTH + GAP_X;
const CELL_HEIGHT = CARD_HEIGHT + GAP_Y;

const projects = [...Array(200)];

export default function InfiniteGrid() {
  const parentRef = useRef<HTMLDivElement>(null);
  const [_size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resize = () => {
      if (!parentRef.current) return;
      setSize({
        width: parentRef.current.clientWidth,
        height: parentRef.current.clientHeight,
      });
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // prevent default vertical-only scroll behavior
      e.preventDefault();
      el.scrollTop += e.deltaY;
      el.scrollLeft += e.deltaX;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const rowVirtualizer = useVirtualizer({
    count: TOTAL_ROWS,
    getScrollElement: () => parentRef.current,
    estimateSize: () => CELL_HEIGHT,
    overscan: 5,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: TOTAL_COLUMNS,
    getScrollElement: () => parentRef.current,
    estimateSize: () => CELL_WIDTH,
    overscan: 5,
  });

  return (
    <section className="h-screen w-screen overflow-hidden select-none">
      <div ref={parentRef} className="h-full w-full overflow-auto">
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
            width: columnVirtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((row) => (
            <React.Fragment key={row.key}>
              {columnVirtualizer.getVirtualItems().map((col) => {
                // keeps column identity but adds variation
                const index = (col.index + row.index * 3) % projects.length;
                const project = projects[index];
                const key = row.index + col.index;
                return (
                  <div
                    key={key}
                    className="absolute grid place-content-center p-8"
                    style={{
                      top: row.start,
                      left: col.start,
                      width: CELL_WIDTH,
                      height: CELL_HEIGHT,
                    }}
                  >
                    {project}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
