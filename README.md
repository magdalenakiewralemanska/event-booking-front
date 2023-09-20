# Event booking project - frontend part:

It is a simple web application designed to easily search for events according to categories. Its task is, on the one hand, to create the opportunity to look for ideas for spending free time, and on the other hand, to simplify the search for the one best suited to the user's needs from a wide selection of offers from various organizers. This application is intended to enable simple booking of an appointment, without telephone calls, without leaving home, at any time and to enable quick price comparison. The application has a part intended only for the user-organizer and a part intended for the user-client.
The basic functions of the user-client include:
1. Browsing offers organized by event category,
2. Searching for offers tailored to your needs,
3. Possibility to view available offer dates,
4. Possibility to choose an offer package,
5. Booking a date for a selected offer,
6. Login, registration and user profile.
In the case of a user-organizer, the application allows primarily for:
1. Adding and modifying existing offers,
2. Adding packages for individual offers,
3. Viewing the list of posted offers,
4. Setting offer availability dates,
5. Managing your own user account.
This application consists of two basic parts: frontend and backend.

# Frontend part:

The frontend part of the application consists primarily in creating a user interface, with the ability to log in and create a new account. The user can also select from the event categories he is interested in to view the list of the organizer's offers available in that category. After selecting a specific offer, the user is presented with a view of the offer details along with available dates and packages for a given offer. After selecting the date and package, the user is redirected to the view of their events. In the part reserved for the user-organizer, there are additional views enabling the addition of new offers with dates and, in the next stage, adding packages to previously created offers and editing them. Each user can freely modify their personal data, as well as add a profile photo and a background photo. You may also delete your existing account and change your account password at any time.
#
This repository contains the frontend part written in TypeScript using the [React library](https://react.dev/) 

# In the future:
In the future, it is also planned to create such functionalities as:
1.	ability to search for offers by user's location,
2.	creating an organizer account,
3.	adding the option of user notifications about the current offer status,
4.	adding a payment function,
5.	creating the ability to filter searched offers taking into account various search criteria,
6.	expanding the user account by adding the ability to invite selected people to participate in a selected event.
