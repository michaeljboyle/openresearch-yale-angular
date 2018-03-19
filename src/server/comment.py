from google.appengine.ext import ndb


class Comment(ndb.Model):
    """A model for representing a comment on a publication."""
    date = ndb.DateTimeProperty(auto_now_add=True)
    num_votes = ndb.IntegerProperty()
    text = ndb.TextProperty()
    user = ndb.KeyProperty()

    RepUpvoted = 5
    RepUpvoter = 0
    RepDownvoted = -2
    RepDownvoter = -1

    def upvote(self):
        self.num_votes += 1
        self.put()

    def downvote(self):
        self.num_votes -= 1
        self.put()
