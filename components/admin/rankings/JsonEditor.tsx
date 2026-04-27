"use client";

import React, { useState } from "react";
import { JsonEditorProps } from "./types";
import { Button } from "@/components/ui/button";
import { Copy, AlertCircle } from "lucide-react";

export const JsonEditor: React.FC<JsonEditorProps> = ({
  json,
  readOnly = true,
  onChange,
  height = "400px",
  theme = "light",
  error,
}) => {
  const [displayValue, setDisplayValue] = useState<string>(
    JSON.stringify(json, null, 2)
  );
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [jsonError, setJsonError] = useState<string | null>(null);

  const handleChange = (newValue: string) => {
    setDisplayValue(newValue);

    if (!readOnly) {
      try {
        const parsed = JSON.parse(newValue);
        setJsonError(null);
        onChange?.(parsed);
      } catch (e) {
        setJsonError(`Invalid JSON: ${(e as Error).message}`);
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayValue);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(displayValue);
      const formatted = JSON.stringify(parsed, null, 2);
      handleChange(formatted);
    } catch (e) {
      setJsonError(`Cannot format invalid JSON`);
    }
  };

  return (
    <div className="w-full border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b p-3 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {readOnly ? "JSON Data (Read-only)" : "JSON Data (Editable)"}
        </span>
        <div className="flex gap-2">
          {!readOnly && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleFormat}
              className="text-xs"
            >
              Format
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="text-xs"
          >
            <Copy className="w-3 h-3 mr-1" />
            {copyFeedback ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>

      {/* Error Messages */}
      {(error || jsonError) && (
        <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 p-3 flex gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <span className="text-sm text-red-700 dark:text-red-300">
            {error || jsonError}
          </span>
        </div>
      )}

      {/* Editor */}
      <textarea
        value={displayValue}
        onChange={(e) => handleChange(e.target.value)}
        readOnly={readOnly}
        className={`w-full p-4 font-mono text-sm resize-none focus:outline-none ${
          readOnly
            ? "bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300"
            : "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-none focus:ring-2 focus:ring-blue-500"
        } ${
          jsonError && !readOnly ? "ring-2 ring-red-500" : ""
        }`}
        style={{
          height,
          fontFamily: "'Fira Code', 'Courier New', monospace",
          lineHeight: "1.5",
        }}
      />
    </div>
  );
};
