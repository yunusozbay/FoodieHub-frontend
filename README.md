# FoodieHub

## Description

FoodieHub is a social platform and event planner for food lovers, who like to try out new restaurants and share there favourite places with their friends. A user can get a random suggestion based on their search criterias or browse through all the matching restaurants. They can search other Foodies by username and add them as a friend. They can also add their favourite restaurants to their collection, and see their friends' collections. By creating an event they can also plan a visit to a specific restaurant and send ivitation to their friends.

## User Stories

- **404** - As a user I want to see a 404 page when I go to a page that doesn’t exist
- **500** - As a user I want to see an error page when there is a technical issue
- **homepage** - As a visitor I want to be able to access the homepage to search restaurants and login or signup
- **sign up** - As a visitor I want to sign up on the webpage to have a profile
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **restaurant search** - As a visitor or user I want to define my search criterias and see the results
- **user search** - As a user I want to search other users and send them a friend request
- **create event** - As a user I want to be able to create an event of visiting a restaurant, define the date and time, and invite friends
- **notifications** - As a user I want to receive notifications when someone sends me a friend request or invites me to a restaurant, and I want to send a reply
- **handle collection** - As a user I want to add restaurants to my collection or remove them

## Backlog

## ROUTES

## Models

User model

```
username: String
email: String
image_url: String
passwordHash: String
restaurants: [ObjectId<Restaurant>]
events: [ObjectId<Event>]
friends: [ObjectId<User>]
friend_requests: [ObjectId<User>]
invitations: [ObjectId<Event>]

```

Restaurant model

```
name: String
alias: String
image_url: String
location: Object
coordinates: Object
phone: String
price: String
rating: Number
review_count: Number
userPhotos: Array
userRating: Number

```

Event model

```
title: String
restaurant: ObjectId<Restaurant>
created_by: ObjectId<User>
invited_users: [ObjectId<User>]
date: Date
time: String


## Links

Deployed website:
https://the-foodie-hub.netlify.app/

To test the restaurant search on the deployed website, please get a temporary access to cors-anywhere:
https://cors-anywhere.herokuapp.com/corsdemo


### Trello

https://trello.com/b/YgMo8FgO/untitled-board

### Git

Backend
https://github.com/yunusozbay/FoodieHub-backend

Frontend
https://github.com/yunusozbay/FoodieHub-frontend
```
