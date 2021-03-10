const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}
//password --> 1fullstack1
const password = process.argv[2];
const name = process.argv[3];
const phoneNumber = process.argv[4];
console.log(`logging:`, { password, name, phoneNumber });

const url = `mongodb+srv://fullstack:${password}@cluster0.ztphn.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", personSchema);

if (!name && !phoneNumber) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: name,
    number: phoneNumber,
  });

  person.save().then((result) => {
    console.log(`added ${name}, ${phoneNumber} to phonebook.`);
    mongoose.connection.close();
  });
}
//If the connection is not closed, the program will never finish its execution

//-- searching for files

/** activate the script on this page:
 * node mongo.js 1fullstack1
 */
