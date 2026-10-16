// Minimal syntax highlighter for the short Python and shell snippets on the
// site. Output is HTML with .tok-* spans (styled in assets/css/main.css);
// every piece of source text is escaped before it is wrapped.

export type CodeLang = "python" | "bash";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const rules: Record<CodeLang, [string, RegExp][]> = {
  python: [
    ["comment", /#[^\n]*/y],
    ["string", /"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/y],
    ["keyword", /\b(?:from|import|as|def|class|return|if|elif|else|for|in|with|None|True|False)\b/y],
    ["func", /\b[A-Za-z_]\w*(?=\()/y],
    ["number", /\b\d+(?:\.\d+)?\b/y],
  ],
  bash: [
    ["comment", /#[^\n]*/y],
    ["string", /"(?:\\.|[^"\\\n])*"|'[^'\n]*'/y],
    ["func", /(?<=^|\n)[\w.-]+/y],
    ["flag", /(?<=\s)--?[\w-]+/y],
  ],
};

export function highlight(code: string, lang: CodeLang): string {
  const lexers = rules[lang];
  let out = "";
  let plain = "";
  let i = 0;
  outer: while (i < code.length) {
    for (const [kind, re] of lexers) {
      re.lastIndex = i;
      const m = re.exec(code);
      if (m && m[0].length) {
        out += escapeHtml(plain) + `<span class="tok-${kind}">${escapeHtml(m[0])}</span>`;
        plain = "";
        i += m[0].length;
        continue outer;
      }
    }
    plain += code[i++];
  }
  return out + escapeHtml(plain);
}
