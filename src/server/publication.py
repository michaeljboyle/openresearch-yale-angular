from google.appengine.ext import ndb


class Publication(ndb.Model):
    """A model for representing a publication."""
    abstract = ndb.TextProperty()
    date_submitted = ndb.DateTimeProperty(auto_now_add=True)
    num_comments = ndb.IntegerProperty()
    num_views = ndb.IntegerProperty()
    num_votes = ndb.IntegerProperty()
    gcs_file_path = ndb.StringProperty()
    summary = ndb.TextProperty()
    tags = ndb.StringProperty(repeated=True)
    title = ndb.StringProperty()

    def add_comment(self):
        self.num_comments += 1
        self.put()

    def add_view(self):
        self.num_views += 1
        self.put()

    def upvote(self):
        self.num_votes += 1
        self.put()

    def downvote(self):
        self.num_votes -= 1
        self.put()

    @classmethod
    def query_pubs(cls):
        return cls.query().order(-cls.num_votes)


# def get_all():
#     return Post.query()

# def get(urlkey):
#     return ndb.Key(urlsafe=urlkey).get()

# def new(title, description):
#     post = Post()
#     post.title = title
#     post.description = description
#     post.votes = 0
#     post.put()
#     return post

# def upvote(key):
#     post = ndb.Key(urlsafe=key).get()
#     post.upvote()
#     return post

# def delete(key):
#     ndb.Key(urlsafe=key).delete()
