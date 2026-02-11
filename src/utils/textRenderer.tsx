import React from 'react';
import _truncate from 'lodash/truncate';
import * as linkify from 'linkifyjs';
import type { PluginArg } from 'linkifyjs';
import { createTokenClass, registerPlugin, init } from 'linkifyjs';
import 'linkify-plugin-mention';

// Initialize linkify
init();

// Register hashtag plugin for linkifyjs 4.x
const HashtagToken = createTokenClass('hashtag', {
  isLink: true,
  toHref() {
    return this.toString();
  },
});

registerPlugin('hashtag', ({ scanner, parser }: PluginArg) => {
  const { POUND, UNDERSCORE, LOCALHOST } = scanner.tokens as Record<string, string>;
  const { domain } = scanner.tokens.groups;

  // #
  const Hash = parser.start.tt(POUND);

  // Valid hashtag
  const Hashtag = Hash.tt(UNDERSCORE, HashtagToken);
  Hash.ta(domain, Hashtag);

  // Continue hashtag
  Hashtag.ta(domain, Hashtag);
  Hashtag.tt(UNDERSCORE, Hashtag);

  // Support for _ in hashtags (like original implementation)
  Hashtag.tt(LOCALHOST, Hashtag);
});

type ClickCallback = (word: string) => void;
type Word = string | JSX.Element;
type WordArray = Array<Word | Word[] | WordArray>;
type WordArrayArray = Array<WordArray | Word | WordArrayArray>;

type CustomAnchorProps = {
  type: 'mention' | 'hashtag';
  value: string;
  word: string;
  clickCallback?: ClickCallback;
  parentClass?: string;
};

const CustomAnchor = ({ type, word, parentClass, value, clickCallback = () => {} }: CustomAnchorProps) => (
  <React.Fragment>
    {!word.startsWith(value) && word.slice(0, word.indexOf(value))}
    <a onClick={() => clickCallback(value.substring(1))} className={`${parentClass}__${type}`}>
      {value}
    </a>
    {!word.endsWith(value) && word.slice(word.indexOf(value) + value.length)}
  </React.Fragment>
);

const renderWord = (
  word: string,
  key: string,
  parentClass?: string,
  onClickMention?: ClickCallback,
  onClickHashtag?: ClickCallback,
): Word => {
  const [link] = linkify.find(word);
  if (!link) return word;

  const { type, value, href } = link;

  if (onClickMention && type === 'mention') {
    return (
      <CustomAnchor
        key={key}
        type={type}
        value={value}
        word={word}
        clickCallback={onClickMention}
        parentClass={parentClass}
      />
    );
  }

  if (onClickHashtag && type === 'hashtag') {
    return (
      <CustomAnchor
        key={key}
        type={type}
        value={value}
        word={word}
        clickCallback={onClickHashtag}
        parentClass={parentClass}
      />
    );
  }

  if (type === 'email' || type === 'url') {
    return (
      <a
        href={encodeURI(href)}
        className={`${parentClass}__link`}
        target="blank"
        data-testid="renderWord-hyperlink"
        rel="nofollow noreferrer noopener"
        key={key}
      >
        {type === 'email' ? value : _truncate(value.replace(/(http(s?):\/\/)?(www\.)?/, ''), { length: 33 })}
      </a>
    );
  }

  return word;
};

export const textRenderer = (
  text?: string,
  parentClass?: string,
  onClickMention?: ClickCallback,
  onClickHashtag?: ClickCallback,
) => {
  if (!text) return <></>;

  const renderedText = text
    .split(/\r\n|\r|\n/) // first break on line
    .map((line, i) =>
      line
        .split(' ') // break for each word
        .map((word, j) => renderWord(word, `item-${i}-${j}`, parentClass, onClickMention, onClickHashtag))
        .reduce<WordArray>((acc, elem) => (acc.length ? [acc, ' ', elem] : [elem]), []),
    )
    .reduce<WordArrayArray>((acc, elem) => (acc.length ? [acc, '\n', elem] : [elem]), []);

  return <>{renderedText}</>;
};
