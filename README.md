# Project2-Group3

## Description

We created an application that will assist food truck owners in connecting to their customers.  Our application allows a food truck owner to create an account associated with their business.  Then, they will be able to display the location and times of business to a public database available to all users.  Both regular users and business owners will be able to view an upcoming forecast of weather in order to optimally plan locations and times.

## Table of Contents

- [Technologies](#technologies)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Technologies

This application uses React to create its user interface.  It uses JWT to authenticate business owners as power users.  Using Node.js and Express.js, we created a RESTful API to facilitate interaction between client and server components.  we also used weather and geolocation server-side APIs to access external databases.  For our own database, we used PostgreSQL and Sequelize ORM.

## Usage

From the home page, users can access a public database of food trucks including their schedules and location.  To view additional detail about each food truck, click on the name of the food truck you would like to view.

As a food truck owner, users can sign into a profile by clicking the 'log in' option on the top right corner.  New users without an account will be prompted to create a new account, or can directly access the 'sign up' form from the home page.

Once in the 'sign up' form, a food truck owner can enter the name, location, and open times of their business.  Once completed, they can then submit their information, which will be logged in the public database for other users to access.

## Credits


