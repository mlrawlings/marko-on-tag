"use strict";

const STATE_CODE = 'CODE';
const STATE_STRING = 'STRING';

function findInCode(code, pattern, start) {
    let state = STATE_CODE;
    let stringChar;

    for(var i = start || 0; i < code.length; i++) {
        let char = code[i];
        if(state === STATE_CODE) {
            // look for match
            let match = pattern.exec(code.substring(i));

            if(match) {
                match.index += i;
                match.endIndex = match.index + match[0].length;
                return match;
            }

            // skip comments
            if(char === '/') {
                let nextChar = code[i+1];
                if(nextChar === '/') continueUtil('\n');
                else if(nextChar === '*') continueUtil('*/');
            }
            // enter string states
            else if(char === "'" || char === '"' || char === '`') {
                state = STATE_STRING;
                stringChar = char;
            }
        }

        else if(state === STATE_STRING) {
            // check for end of string
            if(char === stringChar) {
                state = STATE_CODE;
            }
            // skip escaped characters
            else if(char === '\\') {
                console.log('skipped '+code[i+1]);
                i++;
            }
        }
    }

    function continueUtil(string) {
        while(
            i < code.length &&
            code.substring(i, i+string.length) !== string
        ) i++;
    }
}

function parseOnTag(arg) {
    var stream, varName, dataEvent, endEvent;

    var inLocation = findInCode(arg, /\s+in\s+/);
    if(inLocation) {
        var beforeIn = arg.slice(0, inLocation.index);
        var afterIn = arg.slice(inLocation.endIndex);

        var asLocation = findInCode(beforeIn, /\s+as\s+/);
        if(asLocation) {
            dataEvent = beforeIn.slice(0, asLocation.index);
            varName = beforeIn.slice(asLocation.endIndex);
        } else {
            varName = beforeIn;
        }

        var untilLocation = findInCode(afterIn, /\s+until\s+/);
        if(untilLocation) {
            stream = afterIn.slice(0, untilLocation.index);
            endEvent = afterIn.slice(untilLocation.endIndex);
        } else {
            stream = afterIn;
        }
    }

    return { dataEvent, stream, varName, endEvent };
}

module.exports = parseOnTag;