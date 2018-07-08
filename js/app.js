let pointer = 0; //controls which bit is being edited;
const bits = 8; //length of input
let cursorBlinkRate = 530;

//content = what to set to, either zero, one or clear
//bit specifies a single bit to change, otherwise all are set
let set = function (content, bit) {
    let target;
    if (bit == undefined) {
        //i.e. target unspecified
        target = $('.bit');
    } else {
        if (bit >= bits) {
            console.log('ERROR: set operation cancelled. invalid target.')
            return;
        }
        target = $('.bit').eq(bit);
    }
    switch (content) {
        case "zero" | 0:
            target.removeClass('one')
                  .addClass('zero')
            break;
        case "one" | 1:
            target.removeClass('zero')
                  .addClass('one')
            break;
                         //not sure why but double pipe needed here for it to work 
        case "clear" | "" || undefined:
            console.log('clear');
            target.removeClass('one')
                  .removeClass('zero')
            break;
        default:
            console.log('ERROR: invalid operand to set operation.')
    }
}

let get = function(bit) {
    if (bit == undefined) {
        //i.e. all bits
        let output = [];
        for (i = 0; i < bits; i++) {
            let val = get(i);
            output.push(val);
        }
        return output;
    } else if (bit < bits) {
        //i.e. valid target given
        let target = $('.bit').eq(bit),
            zero = target.hasClass('zero'),
            one = target.hasClass('one');
        if ( zero && !one ) {
            return 0;
        } else if ( !zero && one ) {
            return 1;
        } else if ( zero && one ) {
            console.log('ERROR: bit ' + bit + ' has both zero and one classes');
            return false;
        } else if ( !zero && !one ) {
            console.log('WARNING: bit ' + bit + ' is empty');
            return null;
        }
    } else {
        //invalid target given
        console.log('ERROR: invalid target in set operation');
        return false;
    }
}

let setAccent = function(bit) {
    $('.bit').removeClass('accent')
             .eq(bit).addClass('accent');;
}

let keypress = function(key) {
    // console.log(key.which);
    switch (key.which) {
        case 48:
            //0 or numpad0
            // console.log('0 pressed');
            set(0, pointer); //set the bit at pointer to 0
            break;
        case 49:
            //1 or numpad1
            // console.log('1 pressed');
            set(1, pointer);
            break;
        case 32:
            //spacebar
            // console.log('space pressed');
            set(undefined, pointer);
        default:
            console.log("ERROR: invalid keypress")
            return false;
    }
    increment();
}

let increment = function() {
    if (pointer == (bits - 1) ) { submit() }; //if a full byte is completed
    pointer = (pointer + 1) % bits; //increments the pointer, looping back to the start
    setAccent(pointer);
}

let submit = function() {
    const bitArray = get();
    const bitString = binaryArrayToString(bitArray);
    const decimalVal = parseInt(bitString, 2);
    const char = String.fromCharCode(decimalVal);
    console.log(bitArray, bitString, decimalVal, char);
    output(char);
    set();
}

let output = function(char) {
    $('.output').attr('data-output', char);
}

let binaryArrayToString = function(array) {
    let string = '';
    for (i = 0; i < array.length; i++) {
        if ( (array[i] != 0) && (array[i] != 1) ) {
            console.log('ERROR:binary array contained char other than 0 or 1');
            return "ERROR"
        }
        string += array[i];
    }
    // console.log(string);
    return string;
}

let init = function() {
    setAccent(pointer);
    $('.output').attr('data-output', '~');
}

const blink = setInterval( function(){
    $('.bit').toggleClass('blink');
}, cursorBlinkRate)

$(document).ready(function(){
    console.log('ready');
    init();
    document.addEventListener("keypress", keypress);
});