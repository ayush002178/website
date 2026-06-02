import toml from 'toml';

export function parseMarkdown(rawContent) {
  let frontmatter = {};
  let content = rawContent;

  const tomlRegex = /^\+\+\+([\s\S]*?)\+\+\+/;
  const yamlRegex = /^---([\s\S]*?)---/;

  if (tomlRegex.test(rawContent)) {
    const match = rawContent.match(tomlRegex);
    try {
      frontmatter = toml.parse(match[1]);
    } catch (e) {
      console.error('TOML parse error', e);
    }
    content = rawContent.replace(tomlRegex, '').trim();
  } else if (yamlRegex.test(rawContent)) {
    const match = rawContent.match(yamlRegex);
    // basic fallback
    content = rawContent.replace(yamlRegex, '').trim();
  }

  return { frontmatter, content };
}
