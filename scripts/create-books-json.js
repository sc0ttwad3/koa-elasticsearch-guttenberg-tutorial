const fs = require("fs");
const jsonfile = require("jsonfile");
const chalk = require("chalk");
const {dump} = require("dumper.js");
const path = require("path");
const R = require("rambda");
require("dotenv").config();

const dataDir = process.env.BOOK_DATA_DIR;
const filename = process.env.BOOK_JSON_FILE;

const getBookTextFilePath = file => {
  return path.join(dataDir, file);
};

/**
 *
 *  returns [] of bookFileNames
 */
const getBookFileFullPathNames = () => {
  try {
    // Read books directory
    let files = fs.readdirSync(dataDir).filter(file => file.slice(-4) === ".txt");
    console.log(`Found ${files.length} Files`);
    return R.map(x => getBookTextFilePath(x), files);
  } catch (err) {
    console.error(err);
  }
};

/*
const readBooks = () => {
  try {
    // Read books directory
    let files = fs.readdirSync(dataDir).filter(file => file.slice(-4) === ".txt");
    console.log(chalk.blue(`Found ${files.length} Files`));

    // Read each book file
    for (let file of files) {
      console.log(`Reading File - ${file}`);
      const filePath = path.join(dataDir, file);
      const {title, author, text} = getProcessedBook(filePath);

      //await insertBookData(title, author, text);
    }
  } catch (err) {
    console.error(err);
  }
};
*/

/** Read file by name give,
 *  Parse book object and extract title, author, text
 *
 *  Return {title, author, paragraphs}
 */
const getProcessedBook = bookFile => {
  // Read text file
  const book = fs.readFileSync(bookFile, "utf8");

  // Find book title and author
  const title = book.match(/^Title:\s(.+)$/m)[1];
  const authorMatch = book.match(/^Author:\s(.+)$/m);
  const author = !authorMatch || authorMatch[1].trim() === "" ? "Unknown Author" : authorMatch[1];

  console.log(`Reading Book - ${title} By ${author}`);

  // Find Guttenberg metadata header and footer
  const startOfBookMatch = book.match(/^\*{3}\s*START OF (THIS|THE) PROJECT GUTENBERG EBOOK.+\*{3}$/m);
  const startOfBookIndex = startOfBookMatch.index + startOfBookMatch[0].length;
  const endOfBookIndex = book.match(/^\*{3}\s*END OF (THIS|THE) PROJECT GUTENBERG EBOOK.+\*{3}$/m).index;

  // Clean book text and split into array of paragraphs
  const text = book
    .slice(startOfBookIndex, endOfBookIndex) // Remove Guttenberg header and footer
    .split(/\n\s+\n/g) // Split each paragraph into it's own array entry
    .map(line => line.replace(/\r\n/g, " ").trim()) // Remove paragraph line breaks and whitespace
    .map(line => line.replace(/_/g, "")) // Guttenberg uses "_" to signify italics.  We'll remove it, since it makes the raw text look messy.
    .filter(line => line && line !== ""); // Remove empty lines

  console.log(chalk.green(`Parsed ${text.length} paragraphs\n`));
  // trim dir --- TODO remove hardcoded to remove 'books\'
  return {bookFile: bookFile.slice(6), bookObj: {title, author, text}};
};

const writeBookJsonToFile = ({bookFile, bookObj}) => {
  const jsonContent = JSON.stringify(bookObj);
  // console.log(`${JSON.stringify(jsonContent)}`);

  fs.writeFile(`${dataDir}/${bookFile}.json`, jsonContent, "utf8", function(err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });
};

/**
 * Main Sript
 */
R.map(
  ({bookFile, bookObj}) => writeBookJsonToFile({bookFile, bookObj}),
  R.map(file => getProcessedBook(file), R.identity(getBookFileFullPathNames()))
);
