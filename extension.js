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
  switch (format) {
    case "text":
      result = RandomGenerator.randomText(50);
      break;
    case "name":
      let firstNameLetter = RandomGenerator.randomLetters(1);
      let lastNameLetter = RandomGenerator.randomLetters(1);
      result = await AIGenerator.randomName(firstNameLetter, lastNameLetter);
      break;
    case "phone":
      result = RandomGenerator.randomPhoneNumber();
      break;
    case "date":
      const startDate = new Date(2000, 0, 1); // January 1, 2000
      const endDate = new Date();
      result = RandomGenerator.randomDate(startDate, endDate);
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

function activate(context) {
  const randomCommand = vscode.commands.registerCommand(
    "palm-api-random-generator.Random",
    async () => {}
  );

  const randomNumberCommand = vscode.commands.registerCommand(
    "palm-api-random-generator.Number",
    async () => {
      await generateRandom("number");
    }
  );

  const randomTextCommand = vscode.commands.registerCommand(
    "palm-api-random-generator.Text",
    async () => {
      await generateRandom("text");
    }
  );

  const randomNameCommand = vscode.commands.registerCommand(
    "palm-api-random-generator.Name",
    async () => {
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
          await generateRandom("name");
        }
      );
    }
  );

  const randomPhoneCommand = vscode.commands.registerCommand( "palm-api-random-generator.PhoneNumber", async () => {
    await generateRandom("phone");
  }
  );

  const randomDate = vscode.commands.registerCommand( "palm-api-random-generator.Date", async () => {
    await generateRandom("date");
  }
  );

  context.subscriptions.push(
    randomCommand,
    randomNameCommand,
    randomNumberCommand,
    randomTextCommand,
    randomPhoneCommand,
    randomDate
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
