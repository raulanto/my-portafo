import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1
        className="text-3xl sm:text-4xl font-black text-foreground mt-8 mb-4 tracking-tight"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="text-2xl sm:text-3xl font-extrabold text-foreground mt-8 mb-4 tracking-tight border-b border-border/40 pb-2"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="text-xl sm:text-2xl font-bold text-foreground mt-6 mb-3 tracking-tight"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p
        className="text-base sm:text-lg text-muted-foreground leading-relaxed my-3 font-normal"
        {...props}
      >
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="my-4 ml-6 list-disc space-y-2 text-muted-foreground" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-4 ml-6 list-decimal space-y-2 text-muted-foreground" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-6 border-l-4 border-primary/60 bg-primary/5 pl-4 py-3 rounded-r-2xl italic text-foreground/90 font-medium"
        {...props}
      >
        {children}
      </blockquote>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="my-6 overflow-x-auto rounded-2xl border border-border/60 bg-card/90 p-4 font-mono text-xs sm:text-sm text-foreground shadow-lg shadow-black/5"
        {...props}
      >
        {children}
      </pre>
    ),
    code: ({ children, ...props }) => (
      <code
        className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-primary font-semibold"
        {...props}
      >
        {children}
      </code>
    ),
    table: ({ children, ...props }) => (
      <div className="my-6 overflow-x-auto rounded-2xl border border-border/50 bg-card/30">
        <table className="w-full text-left text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th
        className="border-b border-border/60 bg-muted/50 p-3 font-bold text-foreground"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        className="border-b border-border/40 p-3 text-muted-foreground"
        {...props}
      >
        {children}
      </td>
    ),
    a: ({ href, children, ...props }) => {
      const hrefStr = typeof href === "string" ? href : "";
      const isInternal =
        hrefStr && (hrefStr.startsWith("/") || hrefStr.startsWith("#"));

      if (isInternal) {
        return (
          <Link
            href={hrefStr}
            className="font-semibold text-primary underline underline-offset-4 hover:opacity-80"
            {...props}
          >
            {children}
          </Link>
        );
      }
      return (
        <a
          href={hrefStr}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-4 hover:opacity-80"
          {...props}
        >
          {children}
          <ArrowUpRight className="size-3.5" />
        </a>
      );
    },
    ...components,
  };
}
