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
                     GzipContent() >>
                     WriteToS3(bucket, {'Content-Type': 'text/html; charset=utf-8'}))

    # compress js
    .match(r'github\.js$', Read() >>
                           IncludeJavascript() >>
                           CompressJavascript() >>
                           GzipContent() >>
                           WriteToS3(bucket))

    # turn clevercss into css
    .match(r'\.ccss$', Read() >>
                       ConvertCleverCSS() >>
                       GzipContent() >>
                       WriteToS3(bucket))

    # copy webfont files compressing everything but woff since it's already compressed
    .match(r'\.(svg|eot|ttf)$', Read() >> GzipContent() >> WriteToS3(bucket, {'Expires': NEVER}))
    .match(r'\.woff$', CopyToS3(bucket, {'Expires': NEVER}))

    # the favicon
    .match('favicon.png$', CopyToS3(bucket, {'Expires': NEVER}))
)
