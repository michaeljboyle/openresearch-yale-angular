import logging
import json
import webapp2

import post as Post

def get_path_id(path):
  return path.split('/')[-1]


class RestHandler(webapp2.RequestHandler):

  def dispatch(self):
    # time.sleep(1)
    super(RestHandler, self).dispatch()

  def SendJson(self, r):
    self.response.headers['content-type'] = 'text/plain'
    self.response.write(json.dumps(r))

class NoKeyHandler(RestHandler):

  def post(self):
    r = json.loads(self.request.body)
    p = Post.new(r['title'], r['description'])
    self.SendJson(p.json())

  def get(self):
    posts = Post.get_all()
    r = [post.json() for post in posts]
    self.SendJson(r)


class KeyHandler(RestHandler):

  def get(self):
    str_key = get_path_id(self.request.path)
    p = Post.get(str_key)
    self.SendJson(p.json())

  # Only modifies votes
  def put(self):
    str_key = get_path_id(self.request.path)
    p = Post.upvote(str_key)
    self.SendJson(p.json())

  def delete(self):
    str_key = get_path_id(self.request.path)
    Post.delete(str_key)
    

app = webapp2.WSGIApplication([
  ('/api/posts', NoKeyHandler),
  ('/api/posts/.*', KeyHandler)
], debug=True)