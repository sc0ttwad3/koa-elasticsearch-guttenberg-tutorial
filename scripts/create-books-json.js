const fs = require("fs");
const jsonfile = require("jsonfile");
const chalk = require("chalk");
const {dump} = require("dumper.js");
const path = require("path");
const R = require("rambda");
require("dotenv").config();

const dataDir = process.env.BOOK_DATA_DIR;
const filename = process.env.BOOK_JSON_FILE;

// Delete existing json file
if (fs.existsSync(`${dataDir}/${filename}.json`)) {
  fs.unlinkSync(`${dataDir}/${filename}.json`);
}

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

const readBooks = () => {
  try {
    // Read books directory
    let files = fs.readdirSync(dataDir).filter(file => file.slice(-4) === ".txt");
    console.log(chalk.blue(`Found ${files.length} Files`));

    // Read each book file
    for (let file of files) {
      console.log(`Reading File - ${file}`);
      const filePath = path.join(dataDir, file);
      const {title, author, text} = parseBookFile(filePath);

      //await insertBookData(title, author, text);
    }
  } catch (err) {
    console.error(err);
  }
};

/** Parse book object and extracttitle, author, text
 *
 *  Returns {title, author, paragraphs}
 */
const parseBookFile = bookFile => {
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
  return {title, author, text};
};

const writeBookJsonToFile = obj => {
  jsonfile
    .writeFile(`${dataDir}/${filename}.json`, obj, {flag: "a", spaces: 2})
    .then(() => {
      console.log("appending book json to file.");
    })
    .catch(err => {
      console.error(err);
    });
};

/**
 * Main Sript
 */

// const books = R.map(file => parseBookFile(file), R.identity(getBookFileFullPathNames()));
R.map(
  x => writeBookJsonToFile(x),
  R.map(file => parseBookFile(file), R.identity(getBookFileFullPathNames()))
);
