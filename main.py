# Copyright 2016 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START app]
import logging
import json
import webapp2

import post as Post

class RestHandler(webapp2.RequestHandler):

    def dispatch(self):
        # time.sleep(1)
        super(RestHandler, self).dispatch()

    def SendJson(self, r):
        self.response.headers['content-type'] = 'text/plain'
        self.response.write(json.dumps(r))


class QueryHandler(RestHandler):

    def get(self):
        posts = Post.get_all()
        r = [post.json() for post in posts]
        self.SendJson(r)


class UpvoteHandler(RestHandler):

    def post(self):
        r = json.loads(self.request.body)
        p = Post.upvote(r['key'])
        response = p.json()
        self.SendJson(response)


class InsertHandler(RestHandler):

    def post(self):
        r = json.loads(self.request.body)
        p = Post.new(r['title'], r['description'])
        response = p.json()
        self.SendJson(response)


class DeleteHandler(RestHandler):

    def post(self):
        r = json.loads(self.request.body)
        Post.delete(r['key'])

app = webapp2.WSGIApplication([
    ('/rest/query', QueryHandler),
    ('/rest/insert', InsertHandler),
    ('/rest/upvote', UpvoteHandler),
    ('/rest/delete', DeleteHandler)
], debug=True)