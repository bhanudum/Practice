var generateCaptchaText = (userPattern) => {
    var pattern = 'ULUNLU';
    if (userPattern) {
        pattern = userPattern;
    }
    var patternlist = pattern.split('');
    console.log(patternlist);
    var captchaText = '';
    for (var i = 0 ; i < patternlist.length; i++) {
        switch(patternlist[i]) {
            case 'U':
                captchaText += getRandomUpperCaseChar();
                break;
            case 'L':
                captchaText += getRandomLowerCaseChar();
                break;
            case 'N':
                captchaText += getRandomNumber();
                break;
        }
    }
    return captchaText;
}

var getRandomLowerCaseChar = () => {
    var min = 97;
    var max = 122;
    var randomAscii = Math.floor(Math.random() * (max - min) + min);
    return String.fromCharCode(randomAscii);
}

var getRandomUpperCaseChar = () => {
    var min = 65;
    var max = 90;
    var randomAscii = Math.floor(Math.random() * (max - min) + min);
    return String.fromCharCode(randomAscii);
}

var getRandomNumber = () => {
    var randomNumber = Math.floor(Math.random() * 10);
    return randomNumber;
}