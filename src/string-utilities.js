// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

define(['slug'],
    function(slug) {
        'use strict';

        var StringUtilities = function() {
            this.slugOptions = {
                lower: true,
                symbols: false,
                multicharmap: {}
            };
        };

        StringUtilities.prototype.equalsIgnoreCase = function(str1, str2) {
            str1 = str1 || '';
            str2 = str2 || '';
            return str1.toLowerCase() === str2.toLowerCase();
        };

        StringUtilities.prototype.caseInsensitiveCmp = function(left, right) {
            return this.equalsIgnoreCase(left, right);
        };

        StringUtilities.prototype.startsWithIgnoreCase = function(str1, str2) {
            str1 = str1 || '';
            str2 = str2 || '';
            return this.equalsIgnoreCase(str1.substr(0, str2.length), str2);
        };

        StringUtilities.prototype.capitaliseFirstLetter = function(value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        };

        StringUtilities.prototype.uncapitaliseFirstLetter = function(value) {
            return value.charAt(0).toLowerCase() + value.slice(1);
        };

        StringUtilities.prototype.stripHtmlFromText = function(text) {
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

        StringUtilities.prototype.toSlug = function(text) {
            if (!text) {
                return '';
            }

            text = this.stripHtmlFromText(text);
            text = text.replace(/&amp;/g, '&');

            return slug(text, this.slugOptions);
        };

        return new StringUtilities();
    });
