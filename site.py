import logging

from modicms import *


logging.basicConfig(level=logging.INFO)

bucket = 'splatest'
NEVER = 'Thu, 01-Jan-1970 00:00:01 GMT'

(

Scan('.') >> MatchPath()
    # markdown for the regular pages
    .match(r'\.md$', Read() >>
                     ParseHeaders() >>
                     InterpretMarkdown() >>
                     WrapInMako('base.mako') >>
                     WriteToS3(bucket, {'Content-Type': 'text/html; charset=utf-8'}))

    # compress js
    .match(r'github\.js$', Read() >>
                           IncludeJavascript() >>
                           CompressJavascript() >>
                           WriteToS3(bucket))

    # turn clevercss into css
    .match(r'\.ccss$', Read() >>
                       ConvertCleverCSS() >>
                       WriteToS3(bucket))

    # copy webfont files verbatim
    .match(r'\.(svg|eot|ttf|woff)$', CopyToS3(bucket, {'Expires': NEVER}))

    # the favicon
    .match('favicon.png$', CopyToS3(bucket, {'Expires': NEVER}))
)
