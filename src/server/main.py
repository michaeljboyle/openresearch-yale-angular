import json
import webapp2
import logging

import publication_api as pub
import gcs_api as gcs


def get_path_id(path):
    return path.split('/')[-1]


class RestHandler(webapp2.RequestHandler):

    def dispatch(self):
        # time.sleep(1)
        super(RestHandler, self).dispatch()

    def SendJson(self, r):
        self.response.headers['content-type'] = 'text/plain'
        self.response.write(json.dumps(r))


class PubNoKeyHandler(RestHandler):

    def post(self):
        try:
            file_data = self.request.get('file')
        except KeyError:
            logging.error('"file" not in upload keys')

        r = json.loads(self.request.get('data'))
        try:
            r['file_path'] = gcs.upload(file_data)
            key = pub.new(r)
            self.SendJson({'key': key, 'success': True})
        except:
            logging.error('Something went wrong with file upload')
            self.SendJson({'key': None, 'success': False})

    # def get(self):
    #     posts = Post.get_all()
    #     r = [post.json() for post in posts]
    #     self.SendJson(r)


class KeyHandler(RestHandler):

    def get(self):
        urlkey = get_path_id(self.request.path)
        p = pub.get(urlkey)
        self.SendJson(p)

    # # Only modifies votes
    # def put(self):
    #     str_key = get_path_id(self.request.path)
    #     p = Post.upvote(str_key)
    #     self.SendJson(p.json())

    # def delete(self):
    #     str_key = get_path_id(self.request.path)
    #     Post.delete(str_key)


class PubListHandler(RestHandler):

    def get(self):
        pubs = pub.get_pub_list()
        self.SendJson(pubs)


app = webapp2.WSGIApplication([
  ('/api/pub', PubNoKeyHandler),
  ('/api/pub/.*', KeyHandler),
  ('/api/getPubList', PubListHandler)
], debug=True)
