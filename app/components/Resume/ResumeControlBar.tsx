import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import dynamic from "next/dynamic";
import { useSetDefaultScale } from "./hooks";
import { usePDF } from "@react-pdf/renderer";
import { useEffect } from "react";

const ResumeControlBar = ({
  scale,
  setScale,
  documentSize,
  document,
  fileName,
}: {
  scale: number;
  setScale: (scale: number) => void;
  documentSize: string;
  document: JSX.Element;
  fileName: string;
}) => {
  const { scaleOnResize, setScaleOnResize } = useSetDefaultScale({
    setScale,
    documentSize,
  });

  const [instance, update] = usePDF({ document });

  useEffect(() => {
    update(document);
    if (scaleOnResize) {
      // Example logic: adjust scale based on some condition
      // e.g., adjust scale or other effects
    }
  }, [update, document, scaleOnResize]);

  return (
    <div className="sticky bottom-0 left-0 right-0 flex h-[var(--resume-control-bar-height)]  items-center justify-center px-[var(--resume-padding)] text-white lg:justify-between">
     
      <div className="flex items-center bg-gray-900 text-white gap-2">
        <MagnifyingGlassIcon className="h-4 w-4" aria-hidden="true" />
        <input
          type="range"
          min={0.5}
          max={1.5}
          step={0.01}
          value={scale}
          onChange={(e) => {
            setScaleOnResize(false);
            setScale(Number(e.target.value));
          }}
        />
        <div className="w-10">{`${Math.round(scale * 100)}%`}</div>
        <label className="hidden items-center gap-1 lg:flex">
          <input
            type="checkbox"
            className="mt-2 h-4 w-4"
            checked={scaleOnResize}
            onChange={() => setScaleOnResize((prev) => !prev)}
          />
          <span className="select-none">Autoscale</span>
        </label>
      </div>

      <a
        className="ml-1 mt-10 flex items-center text-white gap-2 rounded-md bg-orange-600 border border-gray-100 px-3 py-0.5 hover:bg-orange-800 lg:ml-8"
        href={instance.url!}
        download={fileName}
      >
        <ArrowDownTrayIcon className="h-4  w-4" />
        <span className="whitespace-nowrap">Download Resume</span>
      </a>
    </div>
  );
};

export const ResumeControlBarCSR = dynamic(
  () => Promise.resolve(ResumeControlBar),
  {
    ssr: false,
  }
);
