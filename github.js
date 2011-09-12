#include "jquery.timeago.js"

$(function (){
    // from https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date#Example.3a_ISO_8601_formatted_dates
    function ISODateString(d) {
        function pad(n) {
            return n < 10 ? '0' + n : n;
        }

        return d.getUTCFullYear()+'-'
               + pad(d.getUTCMonth()+1)+'-'
               + pad(d.getUTCDate())+'T'
               + pad(d.getUTCHours())+':'
               + pad(d.getUTCMinutes())+':'
               + pad(d.getUTCSeconds())+'Z'
    }

    var footer = $('footer');

    $('<p>')
        .addClass('loading')
        .text('Loading...')
        .insertBefore(footer);

    $.ajax({
        'url': 'http://github.com/api/v2/json/repos/show/spladug',
        'dataType': 'jsonp',
        'success': function (data) {
            $('.loading').remove();

            var repositories = data.repositories;
            for (var i = repositories.length - 1; i >= 0; i--) {
                var repository = repositories[i];

                if (repository.fork)
                    continue;

                var section = $('<section>')
                                .addClass('repository');

                var header = $('<h1>');
                $('<a>')
                    .attr('href', repository.url)
                    .text(repository.name)
                    .appendTo(header);
                header.appendTo(section);

                $('<p>')
                    .addClass('description')
                    .text(repository.description)
                    .appendTo(section);

                var timeParagraph = $('<p>')
                                        .addClass('last-updated')
                                        .text('last updated ');
                var lastPushTime = new Date(repository.pushed_at);
                $('<time>')
                    .addClass('last-pushed')
                    .attr('datetime', ISODateString(lastPushTime))
                    .timeago()
                    .appendTo(timeParagraph);
                timeParagraph.appendTo(section);

                section.insertBefore(footer);
            }
        },
        'error': function () {
            $('.loading').remove();
            $('<p>')
                .addClass('error')
                .text('Failed to fetch repository information from GitHub. Try refreshing?')
                .insertBefore(footer);
        }
    });
});
