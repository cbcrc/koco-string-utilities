// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import slug from 'url-slug';
import he from 'he';

const tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';
const tagOrComment = new RegExp(
    '<(?:'
    // Comment body.
    + '!--(?:(?:-*[^->])*--+|-?)'
    // Special "raw text" elements whose content should be elided.
    + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
    + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
    // Regular name
    + '|/?[a-z]'
    + tagBody
    + ')>',
    'gi');

class StringUtilities {

  equalsIgnoreCase(first, second) {
    return (first || '').toLowerCase() === (second || '').toLowerCase();
  }

  caseInsensitiveCmp(left, right) {
    return this.equalsIgnoreCase(left, right);
  }

  startsWithIgnoreCase(first, second) {
    first = first || '';
    second = second || '';
    return this.equalsIgnoreCase(first.substr(0, second.length), second);
  }

  capitaliseFirstLetter(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  uncapitaliseFirstLetter(value) {
    return value.charAt(0).toLowerCase() + value.slice(1);
  }

  stripHtmlFromText(html) {
    if (!html) {
      return '';
    }
    // From http://stackoverflow.com/a/430240/184596
    while(html !== (html = html.replace(tagOrComment, ''))) {}
    return html.replace(/</g, '&lt;').replace(/&nbsp;/g, ' ');
  }

  containsHtmlInText(text) {
    const nbsps = text.match(/&nbsp;/g);
    const tags = text.match(tagOrComment);

    return nbsps || tags;
  }

  trimRight(text, charlist) {
    if (!text) {
      return '';
    }

    if (text.toString) {
      text = text.toString();
    }

    if (charlist === undefined) {
      charlist = '\s';
    }

    return text.replace(new RegExp(`[${charlist}]+$`), '');
  }

  toSlug(text) {
    if (!text) {
      return '';
    }

    return slug(this.decodeHtmlEntities(this.stripHtmlFromText(text)));
  }

  encodeHtmlEntities(text) {
    return he.encode(text, {
      useNamedReferences: false
    });
  }

  decodeHtmlEntities(text) {
    return he.decode(text);
  }
}

export default new StringUtilities();
