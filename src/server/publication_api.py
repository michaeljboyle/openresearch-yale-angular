from publication import Publication


def json_summary(pub):
    return {
        'title': pub.title,
        'summary': pub.summary,
        'numVotes': pub.num_votes,
        'numComments': pub.num_comments,
        'numViews': pub.num_views,
        'tags': pub.tags
    }


def get_pub_list(count=20):
    return [json_summary(pub) for pub in Publication.query_pubs().fetch(count)]


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
