# To run this server locally

- First clone the repository

- Install node_modules in this project by using npm install or just yarn install

- After install open the terminal in your code editor

* Create .env file paste the MongoDB Driver connection url in DATABASE_URL variable and create a variable named PORT with the value of 5000.Also create a variable named BCRYPT_SALT.Remember that variable names are case sensitive.

- Write npm run start:dev or yarn start:dev to run the server locally

- Before build the project you need to check any error or warning you can check all the error or warning by writing npm run lint or yarn lint

* Also you can improve and the code formatting by running npm run prettier:fix or yarn prettier:fix

- After change anything in ts file you need to build this project by using npm run build or yarn build

- If you want to run this server in production you need to write npm run start or yarn start
