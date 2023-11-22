import mongoose from "mongoose";
import app from "./app";

const port = 5000;

// main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    app.listen(port, () => {
      console.log(`Server is running successfully on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

// echo "# next-assignment-2" >> README.md
//   git init
//   git add README.md
//   git commit -m "first commit"
//   git branch -M main
//   git remote add origin https://github.com/1104Anikbarua/next-assignment-2.git
//   git push -u origin main
