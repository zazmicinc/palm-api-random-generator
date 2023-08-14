const vscode = require("vscode");
const RandomGenerator = require("./utils/RandomGenerator");
const AIGenerator = require("./utils/AIGenerator");

const funProgressTitles = [
  "Magic in the Making...",
  "Cracking the Code Eggs 🥚",
  "Weaving the Code Spells ✨",
  "Turning Code into Gold ✨",
  "Unleashing the Code Genie 🧞",
  "Flipping Code Pancakes 🥞",
  "Sculpting the Digital Clay 🎨",
  "Converting Pixels to Poems ✍️",
  "Cooking up Some Code Delights 🍳",
  "Transforming 1s and 0s 🌌",
];

async function generateRandom(format) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return; // No open text editor
  }

  const selection = editor.selection;

  // Get the start and end positions of the selection
  const startPosition = selection.start;
  const endPosition = selection.end;

  let result = "";
  let startDate;
  let endDate;
  let firstNameLetter;
  let lastNameLetter;
  switch (format) {
    case "alphaNumeric":
      result = RandomGenerator.randomText(50);
      break;
    case "sentence":
    case "paragraph":
    case "quote":
    case "joke":
    case "nickName":
      result = await AIGenerator.random(format);
      break;
    case "fullName":
      firstNameLetter = RandomGenerator.randomLetters(1);
      lastNameLetter = RandomGenerator.randomLetters(1);
      result = await AIGenerator.randomFullName(
        firstNameLetter,
        lastNameLetter
      );
      break;
    case "firstName":
      firstNameLetter = RandomGenerator.randomLetters(1);
      result = await AIGenerator.randomFirstName(firstNameLetter);
      break;
    case "lastName":
      lastNameLetter = RandomGenerator.randomLetters(1);
      result = await AIGenerator.randomLastName(lastNameLetter);
      break;
    case "phone":
      result = RandomGenerator.randomPhoneNumber();
      break;
    case "past":
      startDate = new Date(1900, 0, 1);
      endDate = new Date(Date.now());
      result = RandomGenerator.randomDate(startDate, endDate);
      break;
    case "future":
      startDate = new Date(Date.now());
      endDate = new Date(2050, 0, 1); // Approximately the maximum representable date
      result = RandomGenerator.randomDate(startDate, endDate);
      break;
    case "float":
      result = RandomGenerator.randomFloat(0, 20);
      break;
    default:
      result = RandomGenerator.randomNumber(20);
      break;
  }

  // Create a TextEditorEdit object to apply the replacement
  const edit = new vscode.TextEdit(
    new vscode.Range(startPosition, endPosition),
    result
  );

  // Apply the edit to the document
  const workspaceEdit = new vscode.WorkspaceEdit();
  workspaceEdit.set(editor.document.uri, [edit]);
  vscode.workspace.applyEdit(workspaceEdit);
}

function registerCommandWithProgress(commandId, format) {
  return vscode.commands.registerCommand(commandId, async () => {
    const randomTitleIndex = Math.floor(
      Math.random() * funProgressTitles.length
    );
    const randomTitle = funProgressTitles[randomTitleIndex];

    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: randomTitle,
        cancellable: true,
      },
      async () => {
        await generateRandom(format);
      }
    );
  });
}

function activate(context) {
  const commands = [
    { id: "palm-api-random-generator.Random", format: "number" },
    { id: "palm-api-random-generator.Number.Integer", format: "integer" },
    { id: "palm-api-random-generator.Number.Float", format: "float" },
    { id: "palm-api-random-generator.Date.Past", format: "past" },
    { id: "palm-api-random-generator.Date.Future", format: "future" },
    { id: "palm-api-random-generator.Person.FirstName", format: "firstName" },
    { id: "palm-api-random-generator.Person.LastName", format: "lastName" },
    { id: "palm-api-random-generator.Person.FullName", format: "fullName" },
    { id: "palm-api-random-generator.Person.PhoneNumber", format: "phone" },
    { id: "palm-api-random-generator.Person.NickName", format: "nickName" },
    {
      id: "palm-api-random-generator.Text.AlphaNumeric",
      format: "alphaNumeric",
    },
    { id: "palm-api-random-generator.Text.Sentence", format: "sentence" },
    { id: "palm-api-random-generator.Text.Paragraph", format: "paragraph" },
    { id: "palm-api-random-generator.Text.Quote", format: "quote" },
    { id: "palm-api-random-generator.Text.Joke", format: "joke" },
  ];

  commands.forEach(({ id, format }) => {
    let disposable;
    if (
      format === "fullName" ||
      format === "firstName" ||
      format === "lastName" ||
      format === "alphaNumeric" ||
      format === "sentence" ||
      format === "paragraph" ||
      format === "quote" ||
      format === "joke" ||
      format === "nickName"
    ) {
      disposable = registerCommandWithProgress(id, format);
    } else {
      disposable = vscode.commands.registerCommand(id, () => {
        generateRandom(format);
      });
    }
    context.subscriptions.push(disposable);
  });
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
