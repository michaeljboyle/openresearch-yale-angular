from google.appengine.ext import ndb


class Roles:
    ADMIN = 'admin'
    USER = 'user'
    GUEST = 'guest'


class User(ndb.Model):
    """A model for representing a user."""
    about = ndb.TextProperty()
    affiliations = ndb.StringProperty(repeated=True)
    badges = ndb.StringProperty(repeated=True)
    comments = ndb.KeyProperty(repeated=True)
    date_joined = ndb.DateTimeProperty(auto_now_add=True)
    display_name = ndb.StringProperty()
    # email = ndb.StringProperty()
    # Email is stored as the Key ID
    location_id = ndb.StringProperty()
    # password = ndb.StringProperty()
    photo_gcs_path = ndb.StringProperty()
    pubs = ndb.KeyProperty(repeated=True)
    reputation = ndb.IntegerProperty()
    role = ndb.StringProperty()
    tags = ndb.StringProperty(repeated=True)
    votes = ndb.KeyProperty(repeated=True)

    def as_dict(self, verbose=False, api_prefix=None):
        o = {
            'about': self.about,
            'affiliations': self.affiliations,
            'badges': self.badges,
            'dateJoined': self.date_joined,
            'displayName': self.display_name,
            'locationId': self.location_id,
            'photoUrl': self.photo_gcs_path,
            'reputation': self.reputation,
            'role': self.role,
        }
        if api_prefix is not None:
            o['photoUrl'] = '{}{}'.format(api_prefix, self.photo_gcs_path)
        if verbose:
            o['comments'] = self.comments
            o['pubs'] = self.pubs
            o['tags'] = self.tags
            o['votes'] = self.votes
        return o
