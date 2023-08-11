const https = require("https");

async function randomName(firstNameLetter, lastNameLetter) {
    const namePrompt = `generate random full name (example: John Doe), only one item in result, as a plain text, without any other symbols or explanations, name should start with ${firstNameLetter}, surname should start with ${lastNameLetter}`;

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

    console.log("Generating random name...");
    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        // Handle the API response here
        const parsedObject = JSON.parse(data);
        if (parsedObject === undefined) {
          console.log("...Error generating random name");
          reject("Error generating random name");
        } else {
          console.log("...Done");
          let res = parsedObject;
          resolve(res);
        }
      });
    });

    req.on("error", (error) => {
      // Handle any errors that occur during the API call
      console.error("Error calling API:", error.message);
      reject(error); // Reject the Promise with the error
    });

    req.write(postData);
    req.end();
  });
}

module.exports = {
  randomName,
};
