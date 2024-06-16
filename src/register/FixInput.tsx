

import { parsePhoneNumberFromString } from 'libphonenumber-js';

const hasOnlyHebrew =(text: string| undefined): boolean => {
    if(text == undefined){
        return false;
    }
    const hebrewRegex = /^[\u0590-\u05FF\s]+$/;
    return hebrewRegex.test(text);
}

const hasOnlyNumbers = (phoneNumber: string | undefined): boolean => {
    if(phoneNumber == undefined){
        return false;
    }
    const numberRegex = /^[0-9]+$/;
    if(numberRegex.test(phoneNumber)){
        // const phoneUtil = PhoneNumber.PhoneNumberUtil.getInstance();
        const number = parsePhoneNumberFromString(phoneNumber, 'IL');
        return !!number && number.isValid();
    }
    return false;
}

const isValidIsraeliID = (id: string | undefined) : boolean => {

    if (id == undefined || !/^\d{9}$/.test(id)) {
        return false;
    }

    const idDigits = id.split('').map(Number);
    const checksum = idDigits[8];
    const idWithoutChecksum = idDigits.slice(0, 8);

    const weightedSum = idWithoutChecksum.reduce((acc, digit, index) => {
        const weight = (index % 2 === 0) ? 1 : 2;
        const value = digit * weight;
        return acc + ((value > 9) ? value - 9 : value);
    }, 0);

    const calculatedChecksum = (10 - (weightedSum % 10)) % 10;

    return checksum === calculatedChecksum;
};

const isValidGmail = (email: string | undefined): boolean => {
    if (email == undefined ) {
        return false;
    }
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
};

export {hasOnlyHebrew,hasOnlyNumbers,isValidIsraeliID,isValidGmail};