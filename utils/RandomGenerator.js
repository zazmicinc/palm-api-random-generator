function randomNumber(length) {
  let randomNumber = "";

  for (let i = 0; i < length; i++) {
    const digit = Math.floor(Math.random() * 10);
    randomNumber += digit;
  }

  return randomNumber;
}

function randomText(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
  let randomText = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters[randomIndex];
  }
  return randomText;
}

function randomLetters(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomText = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters[randomIndex];
  }
  return randomText;
}

function randomPhoneNumber() {
  const countryCode = Math.floor(Math.random() * 100); // Simplified country code
  const areaCode = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // 3-digit area code
  const number = Math.floor(Math.random() * 10000).toString().padStart(7, '0'); // 4-digit number

  const phoneNumber = `+${countryCode}-${areaCode}-${number}`;
  return phoneNumber;
}

function randomDate(startDate, endDate) {
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();
  const randomTimestamp = Math.random() * (endTimestamp - startTimestamp) + startTimestamp;

  return new Date(randomTimestamp).toISOString();
}


module.exports = {
  randomNumber,
  randomText,
  randomLetters,
  randomPhoneNumber,
  randomDate,
};
