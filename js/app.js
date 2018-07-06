var pointer = 0; //controls which bit is being edited;

//content = what to set to, either zero, one or clear
//bit specifies a single bit to change, otherwise all are set
function set (content, bit) {
    let target;
    if (bit == undefined) {
        //i.e. target unspecified
        target = $('.bit');
    } else {
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
            console.log('invalid set() operator')
    }
}

function keypress (key) {
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
            console.log('space pressed');
            set(undefined, pointer);
    }
    pointer = (pointer + 1) % 8; //increments the pointer, looping back to the start
    if (pointer == 0) { submit() };
}

function submit() {

}

$(document).ready(function(){
    console.log('ready')
    document.addEventListener("keypress", keypress);
});