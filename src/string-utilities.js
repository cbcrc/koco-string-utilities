define(['lodash'],
    function(_) {
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

        stringUtilities.stripHtmlFromText = function (text) {
            //tinymce related - redondant avec la ligne suivante....!?
            //var result = text.replace(new RegExp('<img[^>]*class="nonbreaking"[^>]*>', 'g'), ' ');

            return text.replace(/<(?:.|\n)*?>/gm, '');
        };

        stringUtilities.trimRight = function (string, charlist) {
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

        return stringUtilities;

    });
