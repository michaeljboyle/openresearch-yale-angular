from publication import Publication
from comment import Comment
from comment_response import CommentResponse
from user import User

from google.appengine.ext import ndb
import logging


def doc_api_path():
    return '/api/doc'


def dictify_pub(pub, summary=True):
    # user = pub.user.get()
    o = {
        'authors': pub.authors,
        'id': pub.key.urlsafe(),
        'dateSubmitted': pub.date_submitted,
        'title': pub.title,
        'summary': pub.summary,
        'numVotes': pub.num_votes,
        'numComments': pub.num_comments,
        'numViews': pub.num_views,
        'tags': pub.tags,
        # 'user': {'id': pub.user.urlsafe(), 'username': user.username}
    }
    if not summary:
        o['abstract'] = pub.abstract
        o['docUrl'] = '{}{}'.format(doc_api_path(), pub.gcs_file_path)

    return o


def dictify_comment(comment):
    # user = comment.user.get()
    o = {
        'id': comment.key.urlsafe(),
        'date': comment.date,
        'numVotes': comment.num_votes,
        'text': comment.text,
        # 'user': {'id': comment.user.urlsafe(), 'username': user.username}
    }
    return o


def dictify(item, summary=True):
    if isinstance(item, Publication):
        return dictify_pub(item, summary)
    else:
        return dictify_comment(item)


def get_pub_list(count=20):
    return [
        dictify_pub(p, True) for p in Publication.query_pubs().fetch(count)]


def new(d):
    p = Publication()
    p.abstract = d['abstract']
    p.gcs_file_path = d['file_path']
    p.num_comments = 0
    p.num_views = 0
    p.num_votes = 0
    p.summary = d['summary']
    # p.tags = d['tags'] or []
    p.title = d['title']
    p.put()
    return dictify_pub(p)


def get(urlkey):
    pub = ndb.Key(urlsafe=urlkey).get()
    pub.add_view()
    return dictify_pub(pub, False)


def get_with_descendants(urlkey):
    pubdict = get(urlkey)
    pubkey = ndb.Key(urlsafe=urlkey)
    comments = Comment.query(
        ancestor=pubkey).order(-Comment.num_votes).fetch()
    crs = CommentResponse.query(
        ancestor=pubkey).order(-CommentResponse.date).fetch()
    # Create dict with values sorted by date
    pubdict['comments'] = [dictify_comment(c) for c in comments]
    for i, c in enumerate(pubdict['comments']):
        # can't get the key from c b/c it's just a shallow dict
        c_id = comments[i].key.id()
        child_crs = [cr for cr in crs if cr.key.parent().id() == c_id]
        c['responses'] = [dictify_comment(cr) for cr in child_crs]
    logging.info(pubdict)
    return pubdict


def new_comment(pubkey, data):
    parent_key = ndb.Key(urlsafe=pubkey)
    parent_key.get().add_comment()
    c = Comment(parent=parent_key)
    c.text = data['text']
    c.author = data['author']
    c.num_votes = 0
    c.put()
    logging.info(c)
    return dictify_comment(c)


def new_comment_response(comment_key, data):
    parent_key = ndb.Key(urlsafe=comment_key)
    cr = CommentResponse(parent=parent_key)
    cr.text = data['text']
    cr.author = data['author']
    cr.num_votes = 0
    cr.put()
    logging.info(cr)
    return dictify_comment(cr)


def vote(urlkey, n):
    item = ndb.Key(urlsafe=urlkey).get()
    if n > 0:
        item.upvote()
    else:
        item.downvote()
    return dictify(item)


def new_user(data):
    u = User()
    u.about = data['about']
    u.affiliation = data['affiliation']
    u.badges = []
    u.comments = []
    u.display_name = data['dispayName']
    u.email = data['email']
    u.location_id = data['locationId']
    u.pubs = []
    u.reputation = 0
    u.tags = []
    u.votes = []
    u.put()
    return u
