/**
 * Tooltip content format
 */
export type TooltipFormat = "text" | "markdown"

/**
 * Lightweight markdown parser for tooltip content.
 * Supports: **bold**, *italic*, `code`, [links](url), and line breaks.
 */
export function parseMarkdown(text: string): string {
    if (!text) return ""

    let html = text
        // Escape HTML entities first
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        // Bold: **text** or __text__
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/__(.+?)__/g, "<strong>$1</strong>")
        // Italic: *text* or _text_ (but not inside words)
        .replace(/(?<!\w)\*([^*]+)\*(?!\w)/g, "<em>$1</em>")
        .replace(/(?<!\w)_([^_]+)_(?!\w)/g, "<em>$1</em>")
        // Inline code: `code`
        .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.1);padding:1px 4px;border-radius:3px;font-size:0.9em;">$1</code>')
        // Links: [text](url)
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:#60a5fa;text-decoration:underline;">$1</a>')
        // Line breaks: double newline = paragraph, single = br
        .replace(/\n\n/g, "</p><p>")
        .replace(/\n/g, "<br>")

    // Wrap in paragraph
    html = `<p>${html}</p>`

    return html
}

/**
 * CSS styles for markdown content in tooltips
 */
export const markdownStyles: Record<string, unknown> = {
    "& p": {
        margin: "0 0 0.5em 0",
    },
    "& p:last-child": {
        marginBottom: 0,
    },
    "& strong": {
        fontWeight: 600,
    },
    "& em": {
        fontStyle: "italic",
    },
    "& code": {
        background: "rgba(255,255,255,0.1)",
        padding: "1px 4px",
        borderRadius: "3px",
        fontSize: "0.9em",
    },
    "& a": {
        color: "#60a5fa",
        textDecoration: "underline",
    },
}
