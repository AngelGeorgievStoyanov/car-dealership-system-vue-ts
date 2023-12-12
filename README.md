# Vue 3 + Vite

### USER

1.Not logged in user, have access to Home, Login and Register views.

2.Not logged in user can see all created Cars in Home without seeing the price and will not have access to the details button.

3.Logged in user can see, Home, CarsDetails and Profile views.

4.The user has three roles: user -> default, manager, admin.

5.Role-> user: can do everything described in point 3

6.Role-> manager: can do everything described in point 3 and can create and edit Cars has access to CarsCreateEdit view.

7.Role-> admin: can do everything described in point 6 and can change the role of other users has access to Admin, AdminEdit views.

8.If a router doesn't match the path or some of the guards return true, it redirects to NotFound view.

9.If you get into the NotFound view, wait for the 10 seconds counted or click the HOME button and go to Home view.

# REST-API https://github.com/AngelGeorgievStoyanov/rest-api-mongodb-car-dealerchip-system  should automatically create a profile admin, after: npm start, email: admin@admin.bg , password: qwerty1!

### Technologies used:
* Vue
* HTML & CSS
* pinia
* vue-router

* To run app use npm run dev
* Local:   http://localhost:5173/


### REST-API https://github.com/AngelGeorgievStoyanov/rest-api-mongodb-car-dealerchip-system 

* To run server npm start
* http://lochalhost:4000


### Technologies used:
* Express.js
* Node.js
* TypeScript
* MongoDB
* Mongoose
* Cors
* Nodemon
* JWT
* Bcrypt

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
