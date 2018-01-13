from google.appengine.ext import ndb


class CommentResponse(ndb.Model):
    """A model for representing a response to a comment."""
    date = ndb.DateTimeProperty(auto_now_add=True)
    num_votes = ndb.IntegerProperty()
    text = ndb.TextProperty()
    user = ndb.KeyProperty()

    def upvote(self):
        self.num_votes += 1
        self.put()

    def downvote(self):
        self.num_votes -= 1
        self.put()
