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
  Copy,
  Check,
  HelpCircle,
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

  const lines = content.split("\n");
  const parsedNodes: React.ReactNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // 0. Handle inline ::alert{type="..." title="..." description="..."} or :::alert{...}
    if (trimmed.includes("::alert{") || trimmed.includes(":::alert{")) {
      const alertTypeMatch = trimmed.match(/type="([^"]+)"/);
      const alertTitleMatch = trimmed.match(/title="([^"]+)"/);
      const alertDescMatch = trimmed.match(/description="([^"]+)"/);

      const type = (alertTypeMatch?.[1] || "info").toLowerCase() as any;
      const title = alertTitleMatch?.[1];
      const description = alertDescMatch?.[1] || trimmed.replace(/^::+:alert\{|\}$/g, "");

      parsedNodes.push(
        <AlertDirectiveBlock
          key={`alert-${i}`}
          type={type}
          title={title}
          description={description}
        />
      );
      i++;
      continue;
    }

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
    if (trimmed.startsWith("::tabs") || trimmed.startsWith(":::tabs")) {
      const tabItems: { label: string; content: string }[] = [];
      i++;
      let currentLabel = "Código";
      let currentContent: string[] = [];

      while (
        i < lines.length &&
        lines[i].trim() !== "::" &&
        lines[i].trim() !== "::::" &&
        lines[i].trim() !== ":::"
      ) {
        const itemMatch = lines[i].trim().match(/^:::tabs-item\{label="([^"]+)"/);
        if (itemMatch) {
          if (currentContent.length > 0) {
            tabItems.push({ label: currentLabel, content: currentContent.join("\n") });
            currentContent = [];
          }
          currentLabel = itemMatch[1];
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

    // 3. Handle :::tip, :::note, :::warning, :::caution, :::callout
    if (
      trimmed.startsWith(":::tip") ||
      trimmed.startsWith(":::note") ||
      trimmed.startsWith(":::warning") ||
      trimmed.startsWith(":::caution") ||
      trimmed.startsWith(":::callout") ||
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

    // 4. Handle Standard Fenced Code Blocks with copy bar
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
        <CodeBlockContainer key={`code-${i}`} lang={lang} code={codeLines.join("\n")} />
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
    <div className="typeset typeset-docs w-full flex flex-col gap-3">
      {parsedNodes}
    </div>
  );
}

/* Styled Code Block with Terminal Bar & Copy Button */
function CodeBlockContainer({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl border border-border/60 bg-card/95 overflow-hidden shadow-xl shadow-black/10">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/60 border-b border-border/40 text-xs font-mono text-muted-foreground select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-rose-500/80" />
            <span className="size-2.5 rounded-full bg-amber-500/80" />
            <span className="size-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] font-semibold text-foreground/80 ml-2">
            {lang ? lang.toUpperCase() : "CODE"}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background/80 hover:bg-background border border-border/40 text-[11px] font-semibold text-foreground transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-500" />
              <span>Copiado</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <pre className="p-5 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed text-foreground bg-transparent">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* Alert Directive Component (::alert{type="..." title="..." description="..."}) */
function AlertDirectiveBlock({
  type,
  title,
  description,
}: {
  type: "warning" | "info" | "success" | "error" | "neutral";
  title?: string;
  description: string;
}) {
  const configs = {
    warning: {
      border: "border-amber-500/40 dark:border-amber-500/30",
      bg: "bg-amber-500/10 dark:bg-amber-500/15",
      text: "text-amber-700 dark:text-amber-300",
      icon: <AlertTriangle className="size-5 text-amber-500 flex-shrink-0" />,
      defaultTitle: "Advertencia",
    },
    success: {
      border: "border-emerald-500/40 dark:border-emerald-500/30",
      bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
      text: "text-emerald-700 dark:text-emerald-300",
      icon: <CheckCircle2 className="size-5 text-emerald-500 flex-shrink-0" />,
      defaultTitle: "Conclusión",
    },
    error: {
      border: "border-rose-500/40 dark:border-rose-500/30",
      bg: "bg-rose-500/10 dark:bg-rose-500/15",
      text: "text-rose-700 dark:text-rose-300",
      icon: <AlertTriangle className="size-5 text-rose-500 flex-shrink-0" />,
      defaultTitle: "Atención",
    },
    info: {
      border: "border-purple-500/40 dark:border-purple-500/30",
      bg: "bg-purple-500/10 dark:bg-purple-500/15",
      text: "text-purple-700 dark:text-purple-300",
      icon: <Info className="size-5 text-purple-500 flex-shrink-0" />,
      defaultTitle: "Nota importante",
    },
    neutral: {
      border: "border-border/60",
      bg: "bg-card/70 dark:bg-card/50",
      text: "text-foreground",
      icon: <HelpCircle className="size-5 text-muted-foreground flex-shrink-0" />,
      defaultTitle: "Información",
    },
  };

  const config = configs[type] || configs.info;

  return (
    <div
      className={`my-6 p-5 sm:p-6 rounded-2xl border ${config.border} ${config.bg} backdrop-blur-md shadow-md flex items-start gap-4`}
    >
      {config.icon}
      <div className="flex flex-col gap-1">
        <h4 className={`text-sm font-bold tracking-tight ${config.text}`}>
          {title || config.defaultTitle}
        </h4>
        <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
          {description}
        </p>
      </div>
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
  return (
    <AlertDirectiveBlock
      type={type === "tip" ? "success" : type === "warning" ? "warning" : "info"}
      description={content}
    />
  );
}

/* Code Collapse Accordion Component */
function CodeCollapseBlock({ content }: { content: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-6 rounded-2xl border border-border/60 bg-card/60 overflow-hidden shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 flex items-center justify-between bg-muted/50 hover:bg-muted/80 text-xs sm:text-sm font-bold text-foreground transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-2.5">
          <Code className="size-4 text-primary" />
          <span>Ver código adjunto / desplegable</span>
        </span>
        {isOpen ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
      </button>

      {isOpen && (
        <pre className="p-5 overflow-x-auto font-mono text-xs sm:text-sm text-foreground bg-card/95 border-t border-border/40">
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
    <div className="my-6 rounded-2xl border border-border/60 bg-card/50 overflow-hidden shadow-lg">
      <div className="flex items-center gap-1.5 bg-muted/60 p-2 border-b border-border/40 overflow-x-auto">
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeIdx === idx
                ? "bg-background text-foreground shadow-md shadow-black/5"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
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

      <div className="p-5 text-xs sm:text-sm leading-relaxed overflow-x-auto font-mono text-foreground">
        <pre className="bg-transparent p-0 m-0">
          <code>{items[activeIdx]?.content || ""}</code>
        </pre>
      </div>
    </div>
  );
}
