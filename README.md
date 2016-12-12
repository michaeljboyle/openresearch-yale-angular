# Healthcare Painpoints
This website is a simple site to collect healthcare painpoints built with an Angular frontend and a Python backend on Google App Engine.

## REST API
The frontend communicates with the backend via a REST API. The model is Posts. A post is has the following properties:
- title
- description
- votes

Once created, a post can only be modified with an upvote, which increments the vote property by 1.

## Frontend
The frontend is built with AngularJS with CSS using <a href='https://getmdl.io/'>MDL (Material Design Lite)</a>. There are two views: one where all posts are viewed and voted on, and another where posts are submitted.

The API connection is made using an Angular feature called <a href='https://docs.angularjs.org/api/ngResource/service/$resource'>$resource</a>, that has built-in handling of the standard Create, Read, Update, Delete functions.
