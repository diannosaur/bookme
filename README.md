# README

This is a basic app that allows property managers to schedule available viewing times for properties, and for prospective tenants to book those times.

It has a ruby-on-rails/sqlite3 backend, with a react frontend.

Rationale:
Ruby on rails provides a great scaffold for setting up data validations and relationships between different models, which helps to maintain data robustness and integrity.
React state hooks and router create a better experience/performance with state handled client-side.

Requirements:
* `ruby 3.4.4`
* `rails 7.2.2.1`

Setup
1. Clone this repo
2. `cd bookme`
3. run `bundle install`
4. run `bin/rails server`
5. In a new tab, `cd bookme/frontend`
6. run `npm install`
7. run `npm start`
8. This should open your default browser to localhost:3001


To make this production ready I would:
- set up a proper database e.g. postgresql
- remove `skip_before_action :verify_authenticity_token` from api controllers and establish secure protocols for data fetching between front and back end
- use environment variables for API URLs
- allow users to upload their own property photos
- create a bookings model that records who the booking is made by and relates to timeslot
- allow timeslots to be booked by more than one person
- validate start and end time so end time cannot be the same or earlier than start time
- swap out time selects for one that will offer selection from 15 minute intervals
- convert to typescript
- audit for accessibility
- pull fetch methods out into a context provider
- fix linting errors
- find a good react library for form submission which includes inline validation
