<%inherit file="base.mako" />

<%block name="block_title">spladug.net - neil williams</%block>

<%block name="metadata">
${parent.metadata()}
<link rel="openid.server" href="http://www.myopenid.com/server">
<link rel="openid.delegate" href="http://neilwilliams.myopenid.com/">
<meta name="description" content="The personal website of Neil Williams, a software developer who does stuff.">
</%block>

<%block name="header">
    <span id="line-spladug">spladug</span>
    <span id="line-is-neil"><span id="word-is">is</span> <span id="word-neil">Neil</span></span>
    <span id="line-williams">Williams</span>
</%block>

<%block name="footer"/>
