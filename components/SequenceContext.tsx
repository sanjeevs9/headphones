"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface FrameSequence {
  id: number;
  label: string;
  count: number;
  getPath: (index: number) => string;
}

export const SEQUENCES: FrameSequence[] = [

  {
    id: 1,
    label: "Sequence 1",
    count: 168,
    getPath: (i) => `/720-webp/frame_${String(i + 15).padStart(3, "0")}_delay-0.043s.png`,
  },
  {
    id: 2,
    label: "Sequence 2",
    count: 35,
    getPath: (i) => `/720p-jpg/ezgif-frame-${String(i + 6).padStart(3, "0")}.jpg`,
  },
  {
    id: 3,
    label: "Sequence 3",
    count: 239,                                                                                                                                  
    getPath: (i) => `/720-upscale-jpg/ezgif-frame-${String(i + 20).padStart(3, "0")}.jpg`, 
  },
  {
    id: 4,
    label: "Sequence 4",
    count: 239,
    getPath: (i) => `/720-jpg-notupscaled/ezgif-frame-${String(i + 20).padStart(3, "0")}.jpg`,
  },
  {
    id: 5,
    label: "Sequence 5",
    count: 192,
    getPath: (i) => `/1080p-webp-split/frame_${String(i).padStart(3, "0")}_delay-0.042s.png`,
  },
  {
    id: 6,
    label: "Sequence 6",
    count: 240,
    getPath: (i) => `/1080p-video-jpg/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`,
  },
];

interface SequenceContextValue {
  activeSequence: FrameSequence;
  setActiveSequence: (seq: FrameSequence) => void;
}

const SequenceContext = createContext<SequenceContextValue>({
  activeSequence: SEQUENCES[0],
  setActiveSequence: () => {},
});

export function SequenceProvider({ children }: { children: ReactNode }) {
  const [activeSequence, setActiveSequence] = useState<FrameSequence>(SEQUENCES[0]);
  return (
    <SequenceContext.Provider value={{ activeSequence, setActiveSequence }}>
      {children}
    </SequenceContext.Provider>
  );
}

export function useSequence() {
  return useContext(SequenceContext);
}
