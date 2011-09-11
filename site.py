from modicms import *
import logging

logging.basicConfig(level=logging.DEBUG)

output_root = '/var/www'

(

Scan('.') >> MatchPath()
    # markdown for the regular pages
    .match(r'\.md$', Read() >>
                     ParseHeaders() >>
                     InterpretMarkdown() >>
                     WrapInMako('base.mako') >>
                     WriteTo(output_root))

    # compress js
    .match(r'\.js', Read() >> CompressJavascript() >> WriteTo(output_root))

    # turn clevercss into css
    .match(r'\.ccss', Read() >> ConvertCleverCSS() >> WriteTo(output_root))

    # copy webfont files verbatim
    .match(r'\.(svg|eot|ttf|woff)', CopyTo(output_root))

    # the favicon
    .match('favicon.png$', CopyTo(output_root))
)
