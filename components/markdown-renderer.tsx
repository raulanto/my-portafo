"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useMDXComponents } from "@/mdx-components";
import {
  Info,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Code,
  Eye,
  Copy,
  Check,
  AlertOctagon,
  ShieldAlert,
  Sparkles,
  ArrowUpRight,
  PlaySquare,
} from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

// Inline formatting parser for **bold**, *italic*, `code`, [links]
function renderInlineContent(text: string): React.ReactNode[] {
  // Regex to split on bold, italic, code, links
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  while (remaining.length > 0) {
    // 1. Code inline `code`
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      parts.push(
        <code
          key={keyIdx++}
          className="px-1.5 py-0.5 rounded-md bg-muted font-mono text-xs text-primary border border-border/40"
        >
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // 2. Bold **text**
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      parts.push(
        <strong key={keyIdx++} className="font-extrabold text-foreground">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // 3. Italic *text*
    const italicMatch = remaining.match(/^\*([^*]+)\*/);
    if (italicMatch) {
      parts.push(
        <em key={keyIdx++} className="font-serif italic font-normal text-foreground/95 text-[1.05em] tracking-wide">
          {italicMatch[1]}
        </em>
      );
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // 4. Images ![alt](url)
    const imgMatch = remaining.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      parts.push(
        <span key={keyIdx++} className="block my-6 overflow-hidden rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md shadow-lg">
          <img
            src={imgMatch[2]}
            alt={imgMatch[1] || "Imagen ilustrativa"}
            className="w-full h-auto max-h-[500px] object-cover rounded-2xl"
          />
          {imgMatch[1] && (
            <span className="block p-3 text-center text-xs font-mono text-muted-foreground bg-muted/30 border-t border-border/30">
              {imgMatch[1]}
            </span>
          )}
        </span>
      );
      remaining = remaining.slice(imgMatch[0].length);
      continue;
    }

    // 5. Links [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      parts.push(
        <a
          key={keyIdx++}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-4 font-semibold hover:opacity-80 transition-opacity"
        >
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // Next plain character block
    const nextSpecial = remaining.search(/[`*!\[]/);
    if (nextSpecial === -1) {
      parts.push(remaining);
      break;
    } else if (nextSpecial === 0) {
      // Fallback if regex didn't capture properly
      parts.push(remaining[0]);
      remaining = remaining.slice(1);
    } else {
      parts.push(remaining.slice(0, nextSpecial));
      remaining = remaining.slice(nextSpecial);
    }
  }

  return parts;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const components = useMDXComponents({});

  const H1 = (components.h1 || "h1") as React.ElementType;
  const H2 = (components.h2 || "h2") as React.ElementType;
  const H3 = (components.h3 || "h3") as React.ElementType;
  const H4 = (components.h4 || "h4") as React.ElementType;

  const lines = content.split("\n");
  const parsedNodes: React.ReactNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Ignore YAML frontmatter (--- ... ---)
    if (i === 0 && trimmed === "---") {
      i++;
      while (i < lines.length && lines[i].trim() !== "---") {
        i++;
      }
      i++; // skip closing ---
      continue;
    }

    // 1. Handle ::steps directives
    const stepsMatch = trimmed.match(/^::+steps(\{.*?\})?/i);
    if (stepsMatch) {
      const stepLines: string[] = [];
      i++;

      while (
        i < lines.length &&
        lines[i].trim() !== "::" &&
        lines[i].trim() !== ":::" &&
        !lines[i].trim().startsWith("::steps")
      ) {
        stepLines.push(lines[i]);
        i++;
      }

      if (i < lines.length && (lines[i].trim() === "::" || lines[i].trim() === ":::")) {
        i++; // skip closing :: / :::
      }

      parsedNodes.push(<StepsDirectiveBlock key={`steps-${i}`} content={stepLines.join("\n")} />);
      continue;
    }

    // 2. Handle Directives ::warning, ::caution, ::note, ::tip, ::info, ::danger, ::callout (Single or triple colons)
    const directiveMatch = trimmed.match(/^::+(warning|caution|note|tip|info|danger|alert|callout)(\{.*?\})?/i);
    if (directiveMatch) {
      const typeStr = directiveMatch[1].toLowerCase();
      const attrStr = directiveMatch[2] || "";

      // Extract attributes like to="/blog/disenobd" icon="i-lucide-square-play" color="neutral"
      const toMatch = attrStr.match(/to="([^"]+)"/);
      const toUrl = toMatch ? toMatch[1] : null;

      const alertType: "warning" | "caution" | "note" | "tip" | "info" | "danger" =
        typeStr === "alert" || typeStr === "callout" ? "info" : (typeStr as any);

      const blockLines: string[] = [];
      i++;

      // Collect block content until matching closing :: or ::: or end of section
      while (
        i < lines.length &&
        lines[i].trim() !== "::" &&
        lines[i].trim() !== ":::" &&
        !lines[i].trim().match(/^::+(warning|caution|note|tip|info|danger|alert|callout)/i)
      ) {
        blockLines.push(lines[i]);
        i++;
      }

      if (i < lines.length && (lines[i].trim() === "::" || lines[i].trim() === ":::")) {
        i++; // skip closing :: / :::
      }

      parsedNodes.push(
        <BlockDirectiveAlert
          key={`directive-${i}`}
          type={alertType}
          to={toUrl}
          content={blockLines.join("\n").trim()}
        />
      );
      continue;
    }

    // 2. Handle Markdown Tables (supports both '| col1 | col2 |' and 'col1 | col2 | col3')
    const isTableLine = (l: string) => {
      const t = l.trim();
      if (!t || t.startsWith("```") || t.startsWith("::")) return false;
      // Must contain at least one pipe and have a table delimiter line nearby or pipe layout
      return t.includes("|");
    };

    if (isTableLine(trimmed)) {
      // Check if next line is a table header separator like `---|---` or `---|---|---`
      const nextLine = i + 1 < lines.length ? lines[i + 1].trim() : "";
      if (nextLine.match(/^\|?\s*[-:]+[\s|:-]*\|?\s*$/)) {
        const tableRows: string[] = [];
        while (i < lines.length && isTableLine(lines[i])) {
          tableRows.push(lines[i].trim());
          i++;
        }
        parsedNodes.push(<MarkdownTableBlock key={`table-${i}`} rows={tableRows} />);
        continue;
      }
    }

    // 3. Handle :::code-collapse blocks
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

    // 4. Handle ::tabs & :::tabs-item blocks
    if (trimmed.startsWith("::tabs") || trimmed.startsWith(":::tabs")) {
      const tabItems: { label: string; content: string }[] = [];
      i++;
      let currentLabel = "";
      let currentContent: string[] = [];

      while (i < lines.length) {
        const lineText = lines[i];
        const lineTrimmed = lineText.trim();

        // Check if starting a new tab item
        const itemMatch = lineTrimmed.match(/^:::?tabs-item\{label="([^"]+)"/);
        if (itemMatch) {
          if (currentLabel) {
            tabItems.push({ label: currentLabel, content: currentContent.join("\n") });
            currentContent = [];
          }
          currentLabel = itemMatch[1];
          i++;
          continue;
        }

        // Check if this line is an item end tag ":::" or outer tabs end tag "::"
        if (lineTrimmed === ":::" || lineTrimmed === "::" || lineTrimmed === "::::") {
          // If we have an active tab item, check if this line closes the tab item or the outer tabs container
          if (currentLabel) {
            // Count open fenced code blocks in currentContent to ensure we are not inside ```
            const codeFenceCount = currentContent.filter((l) => l.trim().startsWith("```")).length;
            if (codeFenceCount % 2 === 0) {
              // We are outside code fences. Save current tab item!
              tabItems.push({ label: currentLabel, content: currentContent.join("\n") });
              currentLabel = "";
              currentContent = [];

              // If it's "::", it's the main closing tag for ::tabs
              if (lineTrimmed === "::") {
                i++;
                break;
              }
              i++;
              continue;
            }
          } else {
            // No current tab item active, so "::" or ":::" ends the tabs block
            i++;
            break;
          }
        }

        currentContent.push(lineText);
        i++;
      }

      if (currentLabel && currentContent.length > 0) {
        tabItems.push({ label: currentLabel, content: currentContent.join("\n") });
      }

      if (tabItems.length > 0) {
        parsedNodes.push(<TabsBlock key={`tabs-${i}`} items={tabItems} />);
      }
      continue;
    }



    // 5. Handle Standard Fenced Code Blocks with copy bar
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

    // 6. Standard Headings, Quotes, Lists & Paragraphs
    if (trimmed.startsWith("# ")) {
      parsedNodes.push(
        <h1 key={i} className="text-3xl sm:text-5xl font-black tracking-tight text-foreground my-6">
          {renderInlineContent(trimmed.replace("# ", ""))}
        </h1>
      );
      i++;
    } else if (trimmed.startsWith("## ")) {
      parsedNodes.push(
        <h2 key={i} className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mt-10 mb-4 pt-4 border-t border-border/20">
          {renderInlineContent(trimmed.replace("## ", ""))}
        </h2>
      );
      i++;
    } else if (trimmed.startsWith("### ")) {
      parsedNodes.push(
        <h3 key={i} className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-8 mb-3">
          {renderInlineContent(trimmed.replace("### ", ""))}
        </h3>
      );
      i++;
    } else if (trimmed.startsWith("#### ")) {
      parsedNodes.push(
        <h4 key={i} className="text-lg font-bold tracking-tight text-foreground mt-6 mb-2">
          {renderInlineContent(trimmed.replace("#### ", ""))}
        </h4>
      );
      i++;
    } else if (trimmed.startsWith("> ")) {
      parsedNodes.push(
        <blockquote key={i} className="my-4 pl-4 border-l-4 border-primary text-muted-foreground italic font-medium">
          {renderInlineContent(trimmed.replace("> ", ""))}
        </blockquote>
      );
      i++;
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      parsedNodes.push(
        <ul key={i} className="my-2 ml-4 list-disc space-y-1">
          <li className="text-sm sm:text-base text-foreground/90 leading-relaxed">
            {renderInlineContent(trimmed.replace(/^[-*]\s+/, ""))}
          </li>
        </ul>
      );
      i++;
    } else if (trimmed.startsWith("---")) {
      parsedNodes.push(<hr key={i} className="my-8 border-border/40" />);
      i++;
    } else if (trimmed === "") {
      parsedNodes.push(<div key={i} className="h-2" />);
      i++;
    } else {
      // Collect contiguous paragraph text lines into a single paragraph
      const paragraphLines: string[] = [];
      while (
        i < lines.length &&
        lines[i].trim() !== "" &&
        !lines[i].trim().startsWith("#") &&
        !lines[i].trim().startsWith(">") &&
        !lines[i].trim().startsWith("- ") &&
        !lines[i].trim().startsWith("* ") &&
        !lines[i].trim().startsWith("```") &&
        !lines[i].trim().startsWith("::") &&
        !lines[i].trim().startsWith("---") &&
        !(lines[i].trim().startsWith("|") && lines[i].trim().includes("|"))
      ) {
        paragraphLines.push(lines[i].trim());
        i++;
      }

      if (paragraphLines.length > 0) {
        parsedNodes.push(
          <p key={`p-${i}`} className="text-sm sm:text-base text-foreground/90 leading-relaxed font-normal my-2">
            {renderInlineContent(paragraphLines.join(" "))}
          </p>
        );
      }
    }
  }

  return (
    <div className="typeset typeset-docs w-full flex flex-col gap-1.5">
      {parsedNodes}
    </div>
  );
}

/* Styled Steps Directive Component (::steps ... ::) */
function StepsDirectiveBlock({ content }: { content: string }) {
  // Clean markdown lines & parse step titles vs items
  const rawLines = content.split("\n").map((l) => l.trim()).filter(Boolean);
  const steps: { title: string; items: string[] }[] = [];

  let currentStep: { title: string; items: string[] } | null = null;

  for (const line of rawLines) {
    // Clean headers like "#### Title" -> "Title"
    const cleanedLine = line.replace(/^#{1,6}\s+/, "").trim();

    if (!line.startsWith("-") && !line.startsWith("*")) {
      if (currentStep) {
        steps.push(currentStep);
      }
      currentStep = { title: cleanedLine, items: [] };
    } else if (currentStep) {
      currentStep.items.push(cleanedLine.replace(/^[-*]\s+/, ""));
    }
  }
  if (currentStep) {
    steps.push(currentStep);
  }

  return (
    <div className="my-8 flex flex-col gap-6 py-2">
      <div className="relative flex flex-col gap-8 pl-6 sm:pl-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-px before:bg-border/60">
        {steps.map((step, idx) => (
          <div key={idx} className="relative flex flex-col gap-2 group">
            {/* Minimalist Step Number Pill */}
            <div className="absolute -left-6 sm:-left-8 top-0.5 size-5 sm:size-6 rounded-full bg-background border border-primary/40 flex items-center justify-center text-[11px] font-mono font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {idx + 1}
            </div>

            {/* Title without ### */}
            <h4 className="text-base sm:text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {renderInlineContent(step.title)}
            </h4>

            {/* Sub-items */}
            {step.items.length > 0 && (
              <ul className="flex flex-col gap-1.5 pt-1 pl-1">
                {step.items.map((sub, sIdx) => (
                  <li
                    key={sIdx}
                    className="text-xs sm:text-sm font-normal text-muted-foreground flex items-start gap-2 leading-relaxed"
                  >
                    <span className="size-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                    <span>{renderInlineContent(sub)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


/* Pure Minimalist Callout Line Indicator (::warning, ::caution, ::note, ::tip, ::info, ::danger, ::callout) */
function BlockDirectiveAlert({
  type,
  to,
  content,
}: {
  type: "warning" | "caution" | "note" | "tip" | "info" | "danger";
  to?: string | null;
  content: string;
}) {
  const configs = {
    warning: {
      border: "border-l-amber-500",
      text: "text-amber-600 dark:text-amber-400",
      icon: <AlertTriangle className="size-4 text-amber-500 flex-shrink-0" />,
      defaultTitle: "ADVERTENCIA",
    },
    caution: {
      border: "border-l-orange-500",
      text: "text-orange-600 dark:text-orange-400",
      icon: <ShieldAlert className="size-4 text-orange-500 flex-shrink-0" />,
      defaultTitle: "PRECAUCIÓN",
    },
    danger: {
      border: "border-l-rose-500",
      text: "text-rose-600 dark:text-rose-400",
      icon: <AlertOctagon className="size-4 text-rose-500 flex-shrink-0" />,
      defaultTitle: "RIESGO / ERROR",
    },
    note: {
      border: "border-l-blue-500",
      text: "text-blue-600 dark:text-blue-400",
      icon: <Info className="size-4 text-blue-500 flex-shrink-0" />,
      defaultTitle: "NOTA",
    },
    tip: {
      border: "border-l-emerald-500",
      text: "text-emerald-600 dark:text-emerald-400",
      icon: <CheckCircle2 className="size-4 text-emerald-500 flex-shrink-0" />,
      defaultTitle: "RECOMENDACIÓN",
    },
    info: {
      border: "border-l-purple-500",
      text: "text-purple-600 dark:text-purple-400",
      icon: to ? <PlaySquare className="size-4 text-primary flex-shrink-0" /> : <Sparkles className="size-4 text-purple-500 flex-shrink-0" />,
      defaultTitle: to ? "RECURSO RELACIONADO" : "INFORMACIÓN",
    },
  };

  const config = configs[type] || configs.info;
  const contentLines = content.split("\n").map((l) => l.trim()).filter(Boolean);

  return (
    <div className={`my-4 pl-4 border-l-2 ${config.border} flex items-start gap-3 group`}>
      <div className="pt-0.5">{config.icon}</div>

      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center justify-between gap-2">
          <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${config.text}`}>
            {config.defaultTitle}
          </h4>

          {to && (
            <Link
              href={to}
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-primary hover:underline group-hover:translate-x-0.5 transition-transform"
            >
              <span>Ver artículo</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-1 text-xs sm:text-sm text-foreground/90 font-normal leading-relaxed">
          {contentLines.map((line, idx) => (
            <div key={idx}>{renderInlineContent(line)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}



/* Styled Markdown Table Block Component */
function MarkdownTableBlock({ rows }: { rows: string[] }) {
  if (rows.length === 0) return null;

  // Filter out table delimiter line | --- | --- |
  const contentRows = rows.filter((r) => !r.match(/^\|[\s:-|-]+\|$/));

  const headerCells = contentRows[0]
    .split("|")
    .map((c) => c.trim())
    .filter(Boolean);

  const bodyRows = contentRows.slice(1).map((row) =>
    row
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean)
  );

  return (
    <div className="my-6 w-full overflow-x-auto rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md shadow-xl">
      <table className="w-full text-left text-xs sm:text-sm border-collapse">
        <thead className="bg-muted/70 border-b border-border/40 font-mono text-foreground font-bold">
          <tr>
            {headerCells.map((header, idx) => (
              <th key={idx} className="p-3.5 sm:p-4 tracking-wider uppercase">
                {renderInlineContent(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/20 font-medium">
          {bodyRows.map((rowCells, rIdx) => (
            <tr
              key={rIdx}
              className="hover:bg-muted/30 transition-colors"
            >
              {rowCells.map((cell, cIdx) => (
                <td key={cIdx} className="p-3.5 sm:p-4 text-foreground/90">
                  {renderInlineContent(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Styled Fenced Code Block Container with Prism Syntax Highlighting */
function CodeBlockContainer({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Map common aliases to Prism languages
  const getPrismLang = (l: string) => {
    const norm = (l || "").toLowerCase().trim();
    if (norm === "sql" || norm === "mysql" || norm === "postgresql") return "sql";
    if (norm === "js" || norm === "javascript") return "javascript";
    if (norm === "ts" || norm === "typescript") return "typescript";
    if (norm === "py" || norm === "python") return "python";
    if (norm === "bash" || norm === "sh" || norm === "zsh") return "bash";
    if (norm === "json") return "json";
    if (norm === "html") return "markup";
    if (norm === "css") return "css";
    if (norm === "go" || norm === "golang") return "go";
    if (norm === "rust") return "rust";
    return norm || "clike";
  };

  const prismLang = getPrismLang(lang);
  let highlightedHtml = "";

  try {
    const Prism = require("prismjs");

    // Load common language grammars if available
    require("prismjs/components/prism-sql");
    require("prismjs/components/prism-python");
    require("prismjs/components/prism-typescript");
    require("prismjs/components/prism-javascript");
    require("prismjs/components/prism-bash");
    require("prismjs/components/prism-json");
    require("prismjs/components/prism-go");
    require("prismjs/components/prism-rust");

    if (Prism.languages[prismLang]) {
      highlightedHtml = Prism.highlight(code, Prism.languages[prismLang], prismLang);
    } else {
      highlightedHtml = Prism.highlight(code, Prism.languages.clike || Prism.languages.markup, "markup");
    }
  } catch (e) {
    // Fallback if grammar load fails
    highlightedHtml = "";
  }

  return (
    <div className="my-6 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl overflow-hidden shadow-lg shadow-black/5">
      {/* MacOS Terminal Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b border-border/30 text-xs font-mono select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-rose-500/80 border border-rose-600/30" />
            <span className="size-3 rounded-full bg-amber-500/80 border border-amber-600/30" />
            <span className="size-3 rounded-full bg-emerald-500/80 border border-emerald-600/30" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-1">
            {lang ? lang.toUpperCase() : "CODE"}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-background/80 hover:bg-background border border-border/40 text-xs font-semibold text-foreground transition-all cursor-pointer shadow-sm"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-500" />
              <span>Copiado</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5 text-muted-foreground" />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-5 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed text-foreground bg-background/40">
        {highlightedHtml ? (
          <pre className="m-0 p-0 bg-transparent font-mono">
            <code
              className={`language-${prismLang}`}
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          </pre>
        ) : (
          <pre className="m-0 p-0 bg-transparent font-mono">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
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

/* Minimalist Tabs Component (::tabs ... ::) */
function TabsBlock({ items }: { items: { label: string; content: string }[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (items.length === 0) return null;

  // Clean raw directives if any remain in tab content string
  const getCleanContent = (raw: string) => {
    return raw
      .replace(/^::+callout\s*/gm, "")
      .replace(/^::+alert(\{.*?\})?\s*/gm, "")
      .replace(/^::+\s*$/gm, "")
      .trim();
  };

  const activeItem = items[activeIdx] || items[0];
  const activeContent = getCleanContent(activeItem.content);

  return (
    <div className="my-6 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-md overflow-hidden">
      {/* Tab Switcher Header */}
      <div className="flex items-center gap-1.5 bg-muted/40 p-2 border-b border-border/30 overflow-x-auto">
        {items.map((item, idx) => {
          const isCode =
            item.label.toLowerCase().includes("code") ||
            item.label.toLowerCase().includes("código") ||
            item.label.toLowerCase().includes("sql");
          const isActive = activeIdx === idx;

          return (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 select-none ${
                isActive
                  ? "bg-background text-foreground shadow-sm border border-border/40"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              {isCode ? (
                <Code className="size-3.5 text-primary" />
              ) : (
                <Eye className="size-3.5 text-emerald-500" />
              )}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panel Content: Rendered as nested Markdown for full directive & table support */}
      <div className="p-5">
        <MarkdownRenderer content={activeContent} />
      </div>
    </div>
  );
}


