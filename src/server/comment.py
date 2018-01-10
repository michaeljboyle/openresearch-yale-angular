from google.appengine.ext import ndb


class Comment(ndb.Model):
    """A model for representing a publication."""
    author = ndb.StringProperty()
    date = ndb.DateTimeProperty(auto_now_add=True)
    num_votes = ndb.IntegerProperty()
    text = ndb.TextProperty()

    def upvote(self):
        self.num_votes += 1
        self.put()

    def downvote(self):
        self.num_votes -= 1
        self.put()
