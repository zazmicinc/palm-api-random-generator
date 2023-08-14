const https = require("https");

async function generateRandomName(namePrompt) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      content: namePrompt,
      format: "name"
    });

    const options = {
      hostname: process.env.HOSTNAME,
      port: process.env.PORT,
      path: process.env.PATH,
      method: process.env.METHOD,
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(`Generating random name for ${namePrompt}...`);
    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const parsedObject = JSON.parse(data);
        if (parsedObject === undefined) {
          console.log(`...Error generating random ${namePrompt}`);
          reject(`Error generating random ${namePrompt}`);
        } else {
          console.log("...Done");
          let res = parsedObject;
          resolve(res);
        }
      });
    });

    req.on("error", (error) => {
      console.error("Error calling API:", error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function randomFullName(firstNameLetter, lastNameLetter) {
  const namePrompt = `generate random full name (example: John Doe), only one item in result, as a plain text, without any other symbols or explanations, name should start with ${firstNameLetter}, surname should start with ${lastNameLetter}`;
  return generateRandomName(namePrompt);
}

async function randomFirstName(firstNameLetter) {
  const namePrompt = `generate random first name (example: John), only one item in result, as a plain text, without any other symbols or explanations, name should start with ${firstNameLetter}`;
  return generateRandomName(namePrompt);
}

async function randomLastName(lastNameLetter) {
  const namePrompt = `generate random last name (example: Jackson), only one item in result, as a plain text, without any other symbols or explanations, last name should start with ${lastNameLetter}`;
  return generateRandomName(namePrompt);
}

async function random(what) {
  const textPrompt = `generate random ${what}`;
  return generateRandomName(textPrompt);
}

module.exports = {
  randomFullName,
  randomFirstName,
  randomLastName,
  random
};
