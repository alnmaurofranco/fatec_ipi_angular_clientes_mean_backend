const mongoose = require("mongoose");

const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.phwql.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`;

async function main() {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

main()
  .then(() => console.log("✨ Database connected"))
  .catch((err) => console.log(`❌ Database error: ${err}`));
