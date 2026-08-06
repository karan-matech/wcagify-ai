"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  ShieldCheck,
  Settings,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

interface WidgetProps {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  autoOpen?: boolean;
}

export const WcagifyWidget: React.FC<WidgetProps> = ({
  position = "bottom-right",
  autoOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [mounted, setMounted] = useState(false);
  const [widgetPosition, setWidgetPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  const widgetRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const positionStartRef = useRef<{ x: number; y: number } | null>(null);

  // 1. Handle portal mount safely for Next.js SSR
  useEffect(() => {
    setMounted(true);
    // Load position from localStorage safely on client mount
    const savedPosition = localStorage.getItem("wcagify-widget-position");
    if (savedPosition) {
      try {
        setWidgetPosition(JSON.parse(savedPosition));
      } catch {
        // Fallback if parsing fails
      }
    }
  }, []);

  // 2. Drag handlers
  const handleDragStart = (e: React.MouseEvent) => {
    // Ignore drag start if clicking buttons/interactive elements inside
    if ((e.target as HTMLElement).closest("button")) return;

    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
    positionStartRef.current = widgetPosition;
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleDragMove = (e: MouseEvent) => {
      if (!dragStartRef.current || !positionStartRef.current) return;

      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      setWidgetPosition({
        x: positionStartRef.current.x + dx,
        y: positionStartRef.current.y + dy,
      });
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      setWidgetPosition((latest) => {
        localStorage.setItem("wcagify-widget-position", JSON.stringify(latest));
        return latest;
      });
    };

    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);

    return () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
    };
  }, [isDragging]);

  // Get base CSS classes
  const getPositionClasses = () => {
    const baseClasses =
      "fixed z-50 bg-white rounded-xl shadow-2xl border border-slate-200 select-none cursor-grab active:cursor-grabbing";
    switch (position) {
      case "bottom-right":
        return `${baseClasses} bottom-6 right-6`;
      case "bottom-left":
        return `${baseClasses} bottom-6 left-6`;
      case "top-right":
        return `${baseClasses} top-6 right-6`;
      case "top-left":
        return `${baseClasses} top-6 left-6`;
      default:
        return `${baseClasses} bottom-6 right-6`;
    }
  };

  // Don't render on server during SSR pre-pass
  if (!mounted) return null;

  return createPortal(
    <div
      ref={widgetRef}
      className={getPositionClasses()}
      style={{
        transform: `translate3d(${widgetPosition.x}px, ${widgetPosition.y}px, 0)`,
      }}
      onMouseDown={handleDragStart}
      role="dialog"
      aria-label="WCAGify Accessibility Widget"
      aria-modal="false"
    >
      <div className="flex flex-col w-72">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50 rounded-t-xl">
          <div className="flex items-center gap-2">
            <ShieldCheck
              className="w-5 h-5 text-emerald-600"
              aria-hidden="true"
            />
            <span className="text-sm font-bold text-slate-900">
              WCAGify Accessibility
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-indigo-600 outline-none"
              aria-label={isOpen ? "Collapse widget" : "Expand widget"}
            >
              {isOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            <button
              type="button"
              className="p-1 rounded hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-indigo-600 outline-none"
              aria-label="Widget settings"
            >
              <Settings className="w-4 h-4 text-slate-600" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Content */}
        {isOpen && (
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2
                className="w-4 h-4 text-emerald-500 shrink-0"
                aria-hidden="true"
              />
              <span className="text-slate-700">
                Site is WCAG 2.2 AA Compliant
              </span>
            </div>
            <div className="text-xs text-slate-500">
              Powered by WCAGify AI Native Source Remediation
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 rounded-b-xl">
          <button
            type="button"
            className="w-full text-xs text-slate-600 hover:text-slate-900 font-medium focus-visible:ring-2 focus-visible:ring-indigo-600 outline-none"
            aria-label="Learn more about WCAGify"
          >
            Learn more about WCAGify
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
