// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

define(['lodash', 'slug'],
    function(_, slug) {
        'use strict';

        var stringUtilities = {};

        stringUtilities.equalsIgnoreCase = function(str1, str2) {
            return (str1 || '').toLowerCase() === (str2 || '').toLowerCase();
        };

        stringUtilities.startsWithIgnoreCase = function(str1, str2) {
            return _.startsWith((str1 || '').toLowerCase(), (str2 || '').toLowerCase());
        };

        stringUtilities.capitaliseFirstLetter = function(value) {
            return _.capitalize(value);
        };

        stringUtilities.uncapitaliseFirstLetter = function(value) {
            return value.charAt(0).toLowerCase() + value.slice(1);
        };

        stringUtilities.caseInsensitiveCmp = function(left, right) {
            return left.toUpperCase() === right.toUpperCase();
        };

        stringUtilities.stripHtmlFromText = function(text) {
            //tinymce related - redondant avec la ligne suivante....!?
            //var result = text.replace(new RegExp('<img[^>]*class="nonbreaking"[^>]*>', 'g'), ' ');

            return text.replace(/&nbsp;/g, ' ').replace(/<(?:.|\n)*?>/g, '');
        };

        stringUtilities.trimRight = function(string, charlist) {
            if (string) {
                if (string.toString) {
                    string = string.toString();
                }

                if (charlist === undefined) {
                    charlist = '\s';
                }

                return string.replace(new RegExp('[' + charlist + ']+$'), '');
            }

            return '';
        };

        var slugOptions = {
            lower: true,
            symbols: false,
            charmap: _.assign({}, slug.charmap, {
                '\'': ' ',
                '’': ' ',
                '&': 'et',
                '|': '',
                '<': '',
                '>': '',
                '8': 'infini',
                '?': 'franc',
                '£': 'livre'
            }),
            multicharmap: {}
        };

        stringUtilities.toSlug = function(text) {
            if (!text) {
                return '';
            }

            text = stringUtilities.stripHtmlFromText(text);
            text = text.replace(/&amp;/g, '&');
            text = removeFrenchArticles(text);

            return slug(text, slugOptions);
        };

        function removeFrenchArticles(text) {
            return text.replace(/\b(le|la|les|l'|l’|du|de|des|d'|d’)\b/gi, ' ');
        }

        return stringUtilities;

    });
