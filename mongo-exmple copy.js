const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2] || `1fullstack1`;

const url = `mongodb+srv://fullstack:${password}@cluster0.ztphn.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);
/** 
const note = new Note({
  content: "HTML is Easy",
  date: new Date(),
  important: true,
});

note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});*/
//If the connection is not closed, the program will never finish its execution

//-- searching for files
Note.find({}).then(result => {
//only important notes:
//Note.find({ important: true }).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })


/** activate the script on this page:
 * node mongo.js 1fullstack1
 */
