from publication import Publication
from google.appengine.ext import ndb


def dictify(pub, summary=True):
    o = {
        'id': pub.key.urlsafe(),
        'title': pub.title,
        'summary': pub.summary,
        'numVotes': pub.num_votes,
        'numComments': pub.num_comments,
        'numViews': pub.num_views,
        'tags': pub.tags
    }
    if not summary:
        o['abstract'] = pub.abstract
        o['gcsFilePath'] = pub.gcs_file_path

    return o


def get_pub_list(count=20):
    return [dictify(p, True) for p in Publication.query_pubs().fetch(count)]


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
    return p.put().urlsafe()


def get(urlkey):
    pub = ndb.Key(urlsafe=urlkey).get()
    return dictify(pub, False)
