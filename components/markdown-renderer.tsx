"use client";

import React, { useState } from "react";
import { useMDXComponents } from "@/mdx-components";
import {
  Sparkles,
  Info,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Code,
  Eye,
  Zap,
} from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const components = useMDXComponents({});

  const H1 = (components.h1 || "h1") as React.ElementType;
  const H2 = (components.h2 || "h2") as React.ElementType;
  const H3 = (components.h3 || "h3") as React.ElementType;
  const H4 = (components.h4 || "h4") as React.ElementType;
  const P = (components.p || "p") as React.ElementType;
  const Ul = (components.ul || "ul") as React.ElementType;
  const Li = (components.li || "li") as React.ElementType;
  const Blockquote = (components.blockquote || "blockquote") as React.ElementType;
  const Pre = (components.pre || "pre") as React.ElementType;
  const CodeComp = (components.code || "code") as React.ElementType;

  const lines = content.split("\n");
  const parsedNodes: React.ReactNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Handle :::code-collapse blocks
    if (trimmed.startsWith(":::code-collapse") || trimmed.startsWith("::code-collapse")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(":::")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing :::

      parsedNodes.push(
        <CodeCollapseBlock key={`collapse-${i}`} content={codeLines.join("\n")} />
      );
      continue;
    }

    // 2. Handle ::tabs & :::tabs-item blocks
    if (trimmed.startsWith("::tabs")) {
      const tabItems: { label: string; content: string }[] = [];
      i++;
      let currentLabel = "Código";
      let currentContent: string[] = [];

      while (i < lines.length && lines[i].trim() !== "::" && lines[i].trim() !== "::::") {
        const itemMatch = lines[i].trim().match(/^:::tabs-item\{label="([^"]+)"/);
        if (itemMatch) {
          if (currentContent.length > 0) {
            tabItems.push({ label: currentLabel, content: currentContent.join("\n") });
            currentContent = [];
          }
          currentLabel = itemMatch[1];
        } else if (lines[i].trim() === ":::") {
          // end tab item
        } else {
          currentContent.push(lines[i]);
        }
        i++;
      }
      if (currentContent.length > 0) {
        tabItems.push({ label: currentLabel, content: currentContent.join("\n") });
      }
      i++; // skip closing ::

      parsedNodes.push(<TabsBlock key={`tabs-${i}`} items={tabItems} />);
      continue;
    }

    // 3. Handle :::tip, :::note, :::warning, :::caution, :::callout, :::alert, :::card
    if (
      trimmed.startsWith(":::tip") ||
      trimmed.startsWith(":::note") ||
      trimmed.startsWith(":::warning") ||
      trimmed.startsWith(":::caution") ||
      trimmed.startsWith(":::callout") ||
      trimmed.startsWith(":::alert") ||
      trimmed.startsWith("::callout") ||
      trimmed.startsWith("::tip") ||
      trimmed.startsWith("::note")
    ) {
      const calloutType = trimmed.includes("warning") || trimmed.includes("caution")
        ? "warning"
        : trimmed.includes("tip")
        ? "tip"
        : trimmed.includes("note")
        ? "note"
        : "info";

      const calloutLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("::")) {
        calloutLines.push(lines[i]);
        i++;
      }
      i++; // skip closing :::

      parsedNodes.push(
        <CalloutBlock
          key={`callout-${i}`}
          type={calloutType}
          content={calloutLines.join("\n")}
        />
      );
      continue;
    }

    // 4. Handle Standard Fenced Code Blocks
    if (trimmed.startsWith("```")) {
      const lang = trimmed.replace("```", "").trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```

      parsedNodes.push(
        <Pre key={`code-${i}`}>
          <CodeComp className={lang ? `language-${lang}` : ""}>
            {codeLines.join("\n")}
          </CodeComp>
        </Pre>
      );
      continue;
    }

    // 5. Standard Markdown Lines
    if (trimmed.startsWith("# ")) {
      parsedNodes.push(<H1 key={i}>{trimmed.replace("# ", "")}</H1>);
    } else if (trimmed.startsWith("## ")) {
      parsedNodes.push(<H2 key={i}>{trimmed.replace("## ", "")}</H2>);
    } else if (trimmed.startsWith("### ")) {
      parsedNodes.push(<H3 key={i}>{trimmed.replace("### ", "")}</H3>);
    } else if (trimmed.startsWith("#### ")) {
      parsedNodes.push(<H4 key={i}>{trimmed.replace("#### ", "")}</H4>);
    } else if (trimmed.startsWith("> ")) {
      parsedNodes.push(<Blockquote key={i}>{trimmed.replace("> ", "")}</Blockquote>);
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      parsedNodes.push(
        <Ul key={i}>
          <Li>{trimmed.replace(/^[-*]\s+/, "")}</Li>
        </Ul>
      );
    } else if (trimmed === "") {
      parsedNodes.push(<div key={i} className="h-2" />);
    } else {
      parsedNodes.push(<P key={i}>{line}</P>);
    }

    i++;
  }

  return (
    <div className="typeset typeset-docs max-w-none sm:max-w-[37em]">
      {parsedNodes}
    </div>
  );
}

/* Callout Block Component */
function CalloutBlock({
  type,
  content,
}: {
  type: "tip" | "note" | "warning" | "info";
  content: string;
}) {
  const config = {
    tip: {
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
      text: "text-emerald-700 dark:text-emerald-300",
      icon: <Sparkles className="size-4 text-emerald-500" />,
      label: "CONSEJO",
    },
    warning: {
      border: "border-amber-500/40",
      bg: "bg-amber-500/10 dark:bg-amber-500/15",
      text: "text-amber-700 dark:text-amber-300",
      icon: <AlertTriangle className="size-4 text-amber-500" />,
      label: "ADVERTENCIA",
    },
    note: {
      border: "border-purple-500/40",
      bg: "bg-purple-500/10 dark:bg-purple-500/15",
      text: "text-purple-700 dark:text-purple-300",
      icon: <Info className="size-4 text-purple-500" />,
      label: "NOTA",
    },
    info: {
      border: "border-blue-500/40",
      bg: "bg-blue-500/10 dark:bg-blue-500/15",
      text: "text-blue-700 dark:text-blue-300",
      icon: <Zap className="size-4 text-blue-500" />,
      label: "INFORMACIÓN",
    },
  }[type];

  return (
    <div
      className={`my-6 p-4 sm:p-5 rounded-2xl border ${config.border} ${config.bg} backdrop-blur-sm flex flex-col gap-2`}
    >
      <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
        {config.icon}
        <span className={config.text}>{config.label}</span>
      </div>
      <div className="text-sm sm:text-base text-foreground/90 leading-relaxed font-normal whitespace-pre-line">
        {content}
      </div>
    </div>
  );
}

/* Code Collapse Accordion Component */
function CodeCollapseBlock({ content }: { content: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-6 rounded-2xl border border-border/60 bg-card/60 overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between bg-muted/40 hover:bg-muted/70 text-xs font-semibold text-foreground transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <Code className="size-4 text-primary" />
          <span>Ver código adjunto / desplegable</span>
        </span>
        {isOpen ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
      </button>

      {isOpen && (
        <pre className="p-4 overflow-x-auto font-mono text-xs text-foreground bg-card/90 border-t border-border/40">
          <code>{content}</code>
        </pre>
      )}
    </div>
  );
}

/* Tabs Component */
function TabsBlock({ items }: { items: { label: string; content: string }[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (items.length === 0) return null;

  return (
    <div className="my-6 rounded-2xl border border-border/60 bg-card/50 overflow-hidden shadow-md">
      <div className="flex items-center gap-1 bg-muted/50 p-1.5 border-b border-border/40 overflow-x-auto">
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeIdx === idx
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            {item.label.toLowerCase().includes("code") ? (
              <Code className="size-3.5 text-primary" />
            ) : (
              <Eye className="size-3.5 text-emerald-500" />
            )}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="p-4 text-xs sm:text-sm leading-relaxed overflow-x-auto font-mono text-foreground">
        <pre className="bg-transparent p-0 m-0">
          <code>{items[activeIdx]?.content || ""}</code>
        </pre>
      </div>
    </div>
  );
}
