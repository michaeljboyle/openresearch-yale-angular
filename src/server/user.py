from google.appengine.ext import ndb


class User(ndb.Model):
    """A model for representing a user."""
    about = ndb.TextProperty()
    affiliation = ndb.StringProperty(repeated=True)
    badges = ndb.StringProperty(repeated=True)
    comments = ndb.KeyProperty(repeated=True)
    date_joined = ndb.DateTimeProperty(auto_now_add=True)
    display_name = ndb.StringProperty()
    email = ndb.StringProperty()
    location_id = ndb.StringProperty()
    pubs = ndb.KeyProperty(repeated=True)
    reputation = ndb.IntegerProperty()
    tags = ndb.StringProperty(repeated=True)
    votes = ndb.KeyProperty(repeated=True)
