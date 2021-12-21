# Project's name
​
Project 2
​
## Description
​
It is an application that allows you to meet people who have dogs in your area and connect with them to make group outings
​
## USER STORIES
​
**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
​

**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
​

**Homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
​

**Sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
​

**Login** - As a user I want to be able to log in on the webpage so that I can get back to my account
​

**Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
​

**Profile** - As a user I want to be able to see my profile and edit it
​

**Add new meeting** - As a user I want to be able to create new meetings with other people
​

**List of meetings** - As a user I want to be able to see my set up meetings
​

**Delete meeting** - As a user I want to be able to delete the meetings I created
​

**Update meeting** - As a user I want to be able to update the information of my meetings
​

**Add new dog** - As a user I want to be able to add a new dog
​

**List of my dogs** - As a user I want to be able to see my dogs
​

**Delete dog** - As a user I want to be able to delete my dogs
​

**Update dog** - As a user I want to be able to update the information of my dog
​

## BACKLOG
​
**Catalog filter** - As a user I want to be able to carry out a search for meetings in my area
​

**To be able to join meetings** - As a user I want to be able to join preexisting meetings
​

**Record of meetups created** - As a user I want to see the meetings that I have created
​

**Meetings in which I have participated** - As a user I want to see the meetings I have been on previously
​

## Routes
​
| Name            | Method | Endpoint                      | Description                                      | Body                                  | Redirects       |
| --------------- | ------ | ----------------------------- | ------------------------------------------------ | ------------------------------------- | --------------- |
| Home            | GET    | /                             | See the main page                                |                                       |                 |
| Log in form     | GET    | /login                        | See the form to log in                           |                                       |                 |
| Log in          | POST   | /login                        | Log in the user                                  | {mail, password}                      | /               |
| Sign Up form    | GET    | /signup                       | See the form to sign up                          |                                       |                 |
| Sign Up         | POST   | /signup                       | Sign up a user                                   | {mail, password}                      | /profile        |
| Log out         | GET   | /logout                       | Log out a user                                   |                                       | /               |
| Profile         | GET    | /profile                      | See the profile page with editable form          |                                       |                 |
| Profile edited  | POST   | /profile                      | Send user's data changed                         | {user_email, password                 | /profile}       |
| Dog             | GET    | /profile/dogId                | Read dog's information                           |                                       |                   |
| Dog add form  | GET    | /profile/newDog                   | See form to upload a new dog                   |                                       |                 |
| Dog add       | POST   | /profile/newDog                   | Upload a dog to user                         | {name, sex, race, size, age, img} | /profile/dogId |
| Dog edit form | GET    | /profile/dogId/edit                | See edit form with dog's preloaded information |                                       |                 |
| Dog edit      | POST   | profile/dogId/edit   | Add dog's new information                      | {name, sex, race, size, age, img} | /profile/dogId |
| Dog delete    | POST   | profile/dogId/delete | Delete dog from user                  |                                       | /profile        |
| Meeting             | GET    | /profile/meetingId                | Read meeting information                           |                                       |                   |
| Meeting add form  | GET    | /profile/newMeeting                   | See form to upload a new dog                   |                                       |                 |
| Meeting add       | POST   | /profile/newMeeting                   | Upload a new meeting                         | {nameOfUser, day, timeStartEnd, place, imgMaps} | /profile/meetingId |
| Meeting edit form | GET    | /profile/meetingId/edit                | See edit form with meeting preloaded information |                                       |                 |
| Meeting edit      | POST   | profile/meetingId/edit   | Add new meeting information                      | {nameOfUser, day, timeStartEnd, place, imgMaps} | /profile/meetingId |
| Meeting delete    | POST   | profile/meetingId/delete | Delete meeting from user                  |                                       | /profile        |
​
## Models
​
User model
​
```js
{
    userEmail: String,
    hashedPassword: String,
    location: Array,
    age: Number,
    img: String,
}
```
Dog model
​
```js
{
    name: String,
    sex: String,
    race: Array,
    size: Array,
    age: Number,
    img: String,
}
```
​
Meeting model
​
```js
{
    nameOfUser: String,
    description: String,
    day: Number,
    timeStartEnd: String,
    place: Array,
    imgMaps: String,
}
```
​
​
## Links
​
### Github project
​
[Github project](https://github.com/)
​
### Git
​
URls for the project repo and deploy
[Link Repo](https://github.com/)
[Link Deploy]()
​
### Wireframes
​
[InVision with Wireframes](https://balsamiq.cloud/s6a3xr6/p6vrmaf/r2278)
​
### Slides
​
URls for the project presentation (slides)
[Link Slides.com]()
