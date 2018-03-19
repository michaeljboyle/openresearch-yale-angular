import json
import webapp2
import logging
from datetime import datetime

import api
import gcs_api as gcs
import auth


def get_path_id(path):
    return path.split('/')[-1]


class RestHandler(webapp2.RequestHandler):

    def dispatch(self):
        # time.sleep(1)
        super(RestHandler, self).dispatch()

    def SendJson(self, r):
        def date_converter(dt):
            t0 = datetime(1970, 1, 1)
            if isinstance(dt, datetime):
                logging.info(dt)
                timestamp = (dt - t0).total_seconds() * 1000  # for time in ms
                logging.info(timestamp)
                return timestamp
        self.response.headers['content-type'] = 'text/plain'
        self.response.write(json.dumps(r, default=date_converter))


class PubNoKeyHandler(RestHandler):

    def post(self):
        try:
            auth.verify_token(self.request)
        except auth.AuthError, e:
            self.response.set_status(e.status_code)
            self.response.write(e.error)
            return
        r = json.loads(self.request.get('data'))
        try:
            file_data = self.request.get('file')
            r['file_path'] = gcs.upload(file_data)
            logging.info('file path is %s' % r['file_path'])
        except KeyError:
            logging.error('"file" not in upload keys')

        try:
            pub = api.new(r)
            logging.info('returning new pub')
            self.SendJson({'obj': pub, 'success': True})
        except:
            logging.error('Something went wrong with file upload')
            self.SendJson({'success': False})

    # def get(self):
    #     posts = Post.get_all()
    #     r = [post.json() for post in posts]
    #     self.SendJson(r)


class PubKeyHandler(RestHandler):

    def get(self):
        urlkey = get_path_id(self.request.path)
        p = api.get_with_descendants(urlkey)
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
        logging.info('get_pub_list')
        pubs = api.get_pub_list()
        self.SendJson(pubs)


class DocKeyHandler(RestHandler):

    def get(self):
        paths = self.request.path.split('/')
        filename = paths[-1]
        bucket = paths[-2]
        file_data = gcs.fetch(filename, bucket)
        self.response.headerlist = [('Content-type', 'application/pdf')]
        self.response.write(file_data)


class CommentKeyHandler(RestHandler):

    def post(self):
        try:
            auth.verify_token(self.request)
        except auth.AuthError, e:
            self.response.set_status(e.status_code)
            self.response.write(e.error)
            return
        logging.info(self.request.body)
        data = json.loads(self.request.body)
        urlkey = get_path_id(self.request.path)
        c = api.new_comment(urlkey, data)
        self.SendJson({'obj': c, 'success': True})


class CommentResponseKeyHandler(RestHandler):

    def post(self):
        try:
            auth.verify_token(self.request)
        except auth.AuthError, e:
            self.response.set_status(e.status_code)
            self.response.write(e.error)
            return
        logging.info(self.request.body)
        data = json.loads(self.request.body)
        urlkey = get_path_id(self.request.path)
        cr = api.new_comment_response(urlkey, data)
        self.SendJson({'obj': cr, 'success': True})


class VoteResponseHandler(RestHandler):

    def post(self):
        try:
            auth.verify_token(self.request)
        except auth.AuthError, e:
            self.response.set_status(e.status_code)
            self.response.write(e.error)
            return
        logging.info(self.request.body)
        data = json.loads(self.request.body)
        urlkey = get_path_id(self.request.path)
        try:
            obj = api.vote(urlkey, data)
            self.SendJson({'obj': obj, 'success': True})
        except Exception, e:
            logging.error(str(e))
            self.response.set_status(400)
            self.response.write(str(e))


class UserNoKeyHandler(RestHandler):

    def post(self):
        try:
            auth.verify_token(self.request)
        except auth.AuthError, e:
            self.response.set_status(e.status_code)
            self.response.write(e.error)
            return

        r = json.loads(self.request.get('data'))
        file_data = self.request.get('file', None)
        if file_data is not None:
            try:
                r['photo_path'] = gcs.upload(file_data)
                logging.info('photo path is %s' % r['photo_path'])
            except:
                logging.error('Something went wrong with file upload')
                self.response.set_status(500)
                self.response.write('Something went wrong with file upload')
        try:
            user = api.new_user(r)
            logging.info('returning new acct')
            self.SendJson(user)
        except Exception, e:
            logging.info(str(e))
            self.response.set_status(500)
            self.response.write(str(e))


class UserKeyHandler(RestHandler):

    def get(self):
        try:
            auth.verify_token(self.request)
        except auth.AuthError, e:
            self.response.set_status(e.status_code)
            self.response.write(e.error)
            return
        id = get_path_id(self.request.path)
        try:
            user = api.get_user(id)
            self.SendJson(user)
        except:
            self.response.set_status(404)
            self.response.write('Resource not found')


app = webapp2.WSGIApplication([
  ('/api/pub', PubNoKeyHandler),
  ('/api/pub/.*', PubKeyHandler),
  ('/api/getPubList', PubListHandler),
  ('{}/.*/.*'.format(api.doc_api_path()), DocKeyHandler),
  ('/api/postComment/.*', CommentKeyHandler),
  ('/api/postCommentResponse/.*', CommentResponseKeyHandler),
  ('/api/vote/.*', VoteResponseHandler),
  ('/api/user', UserNoKeyHandler),
  ('/api/user/.*', UserKeyHandler),
], debug=True)
