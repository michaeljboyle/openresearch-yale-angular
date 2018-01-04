<<<<<<< HEAD
# openresearch-yale-angular
A project for open sharing and peer review of academic publications at Yale, built on Angular and Google App Engine.


## Frontend
The frontend is built with AngularJS with CSS using <a href='https://getmdl.io/'>MDL (Material Design Lite)</a>. There are two views: one where all posts are viewed and voted on, and another where posts are submitted.

The API connection is made using an Angular feature called <a href='https://docs.angularjs.org/api/ngResource/service/$resource'>$resource</a>, that has built-in handling of the standard Create, Read, Update, Delete functions.

## TODO
- Redo vote button so that it's in a more accessible place and never hidden by the "add" button. The other problem is that it will not appear correct when the number of votes counter surpasses 99. I think moving it to the left side would be better.
- Fix the submit form so that the example text disappears when the user starts typing into the editable field.
>>>>>>> 02f3db132675e143daade78d56687b6190cc0251
