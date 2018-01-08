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
