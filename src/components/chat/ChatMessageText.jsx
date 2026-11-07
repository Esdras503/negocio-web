import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const INLINE_PATTERN =
  /(\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*\n]+)\*)/g;
const BULLET_PATTERN = /^\s*[-*•]\s+(.+)$/;
const ORDERED_PATTERN = /^\s*(\d+)[.)]\s+(.+)$/;
const INTERNAL_PATH_PATTERN =
  /^\/(?:demo\/[a-z0-9-]+|demos\/gimnasio)?\/?$/i;
const INTERNAL_HASH_PATH_PATTERN = /^\/#(?:demos|proceso|plantilla)$/i;
const HASH_PATTERN = /^#(?:demos|proceso|plantilla)$/i;

function hasUnsafeUrlCharacters(value) {
  for (const character of value) {
    const code = character.codePointAt(0);
    if (code <= 0x1f || code === 0x7f || /\s/.test(character)) return true;
  }

  return false;
}

/**
 * Solo permitimos enlaces internos conocidos y el WhatsApp público del
 * estudio. Cualquier otro enlace generado por el modelo se muestra como texto.
 */
function getSafeLink(rawUrl) {
  const url = rawUrl.trim();

  if (!url || hasUnsafeUrlCharacters(url)) return null;

  if (HASH_PATTERN.test(url)) {
    return { kind: 'hash', href: url };
  }

  if (INTERNAL_HASH_PATH_PATTERN.test(url)) {
    return { kind: 'hash', href: url };
  }

  if (
    url.startsWith('/') &&
    !url.startsWith('//') &&
    !url.includes('\\') &&
    INTERNAL_PATH_PATTERN.test(url)
  ) {
    return { kind: 'internal', href: url };
  }

  try {
    const parsed = new URL(url);

    if (
      parsed.protocol === 'https:' &&
      parsed.hostname === 'wa.me' &&
      parsed.pathname === '/50372877953' &&
      !parsed.port &&
      !parsed.username &&
      !parsed.password
    ) {
      return { kind: 'external', href: parsed.toString() };
    }
  } catch {
    return null;
  }

  return null;
}

function renderInline(text, keyPrefix) {
  const nodes = [];
  let lastIndex = 0;
  let match;
  let itemIndex = 0;
  const pattern = new RegExp(INLINE_PATTERN.source, 'g');

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      const label = match[2];
      const link = getSafeLink(match[3]);
      const key = `${keyPrefix}-link-${itemIndex}`;
      itemIndex += 1;

      if (link?.kind === 'external') {
        nodes.push(
          <a
            key={key}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </a>,
        );
      } else if (link?.kind === 'internal') {
        nodes.push(
          <Link key={key} to={link.href}>
            {label}
          </Link>,
        );
      } else if (link?.kind === 'hash') {
        nodes.push(
          <a key={key} href={link.href}>
            {label}
          </a>,
        );
      } else {
        nodes.push(label);
      }
    } else if (match[4]) {
      nodes.push(
        <strong key={`${keyPrefix}-bold-${itemIndex}`}>
          {renderInline(match[4], `${keyPrefix}-bold-${itemIndex}`)}
        </strong>,
      );
      itemIndex += 1;
    } else if (match[5]) {
      nodes.push(
        <em key={`${keyPrefix}-italic-${itemIndex}`}>
          {renderInline(match[5], `${keyPrefix}-italic-${itemIndex}`)}
        </em>,
      );
      itemIndex += 1;
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function Paragraph({ lines, keyPrefix }) {
  return (
    <p>
      {lines.map((line, index) => (
        <Fragment key={`${keyPrefix}-line-${index}`}>
          {index > 0 && <br />}
          {renderInline(line, `${keyPrefix}-${index}`)}
        </Fragment>
      ))}
    </p>
  );
}

export default function ChatMessageText({ text }) {
  const normalized = String(text ?? '')
    .replace(/\r\n?/g, '\n')
    .trim();

  if (!normalized) return null;

  const blocks = [];
  let paragraphLines = [];
  let list = null;
  let blockIndex = 0;

  const flushParagraph = () => {
    if (!paragraphLines.length) return;
    blocks.push({
      type: 'paragraph',
      lines: paragraphLines,
      key: `paragraph-${blockIndex}`,
    });
    blockIndex += 1;
    paragraphLines = [];
  };

  const flushList = () => {
    if (!list) return;
    blocks.push({ ...list, key: `list-${blockIndex}` });
    blockIndex += 1;
    list = null;
  };

  for (const rawLine of normalized.split('\n')) {
    const line = rawLine.replace(/\s+$/, '');

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    const bullet = line.match(BULLET_PATTERN);
    if (bullet) {
      flushParagraph();
      if (!list || list.type !== 'ul') {
        flushList();
        list = { type: 'ul', items: [] };
      }
      list.items.push(bullet[1]);
      continue;
    }

    const ordered = line.match(ORDERED_PATTERN);
    if (ordered) {
      flushParagraph();
      if (!list || list.type !== 'ol') {
        flushList();
        list = { type: 'ol', items: [] };
      }
      list.items.push(ordered[2]);
      continue;
    }

    if (line.trim() === '---') {
      flushParagraph();
      flushList();
      blocks.push({ type: 'rule', key: `rule-${blockIndex}` });
      blockIndex += 1;
      continue;
    }

    const heading = line.match(/^#{1,4}\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({
        type: 'heading',
        text: heading[1],
        key: `heading-${blockIndex}`,
      });
      blockIndex += 1;
      continue;
    }

    flushList();
    paragraphLines.push(line);
  }

  flushParagraph();
  flushList();

  return (
    <div className="chat-md">
      {blocks.map((block) => {
        if (block.type === 'paragraph') {
          return (
            <Paragraph
              key={block.key}
              lines={block.lines}
              keyPrefix={block.key}
            />
          );
        }

        if (block.type === 'heading') {
          return (
            <p key={block.key} className="chat-md__heading">
              {renderInline(block.text, block.key)}
            </p>
          );
        }

        if (block.type === 'rule') {
          return <hr key={block.key} className="chat-md__rule" />;
        }

        const items = block.items.map((item, index) => (
          <li key={`${block.key}-item-${index}`}>
            {renderInline(item, `${block.key}-${index}`)}
          </li>
        ));

        return block.type === 'ol' ? (
          <ol key={block.key} className="chat-md__list">
            {items}
          </ol>
        ) : (
          <ul key={block.key} className="chat-md__list">
            {items}
          </ul>
        );
      })}
    </div>
  );
}
