// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

define(['lodash', 'slug'],
    function(_, slug) {
        'use strict';

        var StringUtilities = function() {};

        StringUtilities.prototype.equalsIgnoreCase = function(str1, str2) {
            return (str1 || '').toLowerCase() === (str2 || '').toLowerCase();
        };

        StringUtilities.prototype.startsWithIgnoreCase = function(str1, str2) {
            return _.startsWith((str1 || '').toLowerCase(), (str2 || '').toLowerCase());
        };

        StringUtilities.prototype.capitaliseFirstLetter = function(value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        };

        StringUtilities.prototype.uncapitaliseFirstLetter = function(value) {
            return value.charAt(0).toLowerCase() + value.slice(1);
        };

        StringUtilities.prototype.caseInsensitiveCmp = function(left, right) {
            return left.toUpperCase() === right.toUpperCase();
        };

        StringUtilities.prototype.stripHtmlFromText = function(text) {
            //tinymce related - redondant avec la ligne suivante....!?
            //var result = text.replace(new RegExp('<img[^>]*class="nonbreaking"[^>]*>', 'g'), ' ');

            return text.replace(/&nbsp;/g, ' ').replace(/<(?:.|\n)*?>/g, '');
        };

        StringUtilities.prototype.containsHtmlInText = function(text) {
            var nbsps = text.match(/&nbsp;/g);
            var tags = text.match(/<(?:.|\n)*?>/g);

            return nbsps || tags;
        };

        StringUtilities.prototype.trimRight = function(string, charlist) {
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
                //'8': 'infini',
                '£': 'livre'
            }),
            multicharmap: {}
        };

        StringUtilities.prototype.toSlug = function(text) {
            var self = this;

            if (!text) {
                return '';
            }

            text = self.stripHtmlFromText(text);
            text = text.replace(/&amp;/g, '&');
            text = removeFrenchArticles(text);

            return slug(text, slugOptions);
        };

        function removeFrenchArticles(text) {
            return text.replace(/\b(le|la|les|l'|l’|du|de|des|d'|d’)\b/gi, ' ');
        }

        return new StringUtilities();
    });
