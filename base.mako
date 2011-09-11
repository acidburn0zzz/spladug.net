<!doctype html>
<html>
<head>
<meta charset="utf-8">

<title><%block name="block_title">${title} - spladug.net</%block></title>

<!--[if lt IE 9]>
<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

<%block name="metadata">
<link rel="stylesheet" href="/style.css" media="screen">
<link rel="icon" href="/favicon.png" type="image/png" sizes="16x16">
<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no">
</%block>

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-21156384-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

<%
    javascript = context.get('javascript', '')
    js_files = [j.strip() for j in javascript.split(',')]
%>

% for url in js_files:
<script type="text/javascript" src="${url}"></script>
% endfor

</head>

<body>

<header>
<h1>
<%block name="header">
    <span id="line-spladug"><a href="/index.html">spladug</a></span>
</%block>
</h1>
</header>

<nav>
<ul>
<%
menu = [
    ('about', '/about.html'),
    ('code', '/code.html'),
]
%>
% for id, url in menu:
    <%
        cls = ""
        if url == output_path:
            cls = 'class="active"'
    %>
    <li><a href="${url}" id="link-${id}" ${cls}>${id}</a></li>
% endfor
</ul>
</nav>

<%block name="block_content">
${content}
</%block>

<%block name="footer">
<footer>
    &lt;3
</footer>
</%block>

</body>
</html>
