const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const R = require("rambda");

/* ToDo: change this hard-coded file path */
const getBookFiles = async () => {
  try {
    // Read books directory
    let files = fs.readdirSync("./books").filter(file => file.slice(-4) === ".txt");
    console.log(`Found ${files.length} Files`);
    return files;
  } catch (err) {
    console.error(err);
  }
};

const parseBook = file => {};

const readBooks = () => {
  try {
    // Read books directory
    let files = fs.readdirSync("./books").filter(file => file.slice(-4) === ".txt");
    console.log(`Found ${files.length} Files`);

    // Read each book file
    for (let file of files) {
      console.log(`Reading File - ${file}`);
      const filePath = path.join("./books", file);
      const {title, author, text} = parseBookFile(filePath);

      //await insertBookData(title, author, text);
    }
  } catch (err) {
    console.error(err);
  }
};

/** Parse book object and extracttitle, author, text */
const parseBookFile = filePath => {
  // Read text file
  const book = fs.readFileSync(filePath, "utf8");

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

  console.log(`Parsed ${text.length} Paragraphs\n`);
  return {title, author, paragraphs};
};

/**
 * Main Sript
 */

getBookFiles();
