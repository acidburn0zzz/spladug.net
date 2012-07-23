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

    $('<p class="loading">')
        .text('Loading...')
        .insertBefore(footer);

    $.ajax({
        'url': 'https://api.github.com/users/spladug/repos?type=owner&sort=updated',
        'dataType': 'jsonp',
        'success': function (response) {
            $('.loading').remove();

            var repositories = response.data;

            $.each(repositories, function (index, repository) {
                if (repository.fork)
                    return true;

                var lastUpdate = new Date(repository.updated_at);

                $('<section class="repository">').append(
                    $('<h1>').append(
                        $('<a href="' + repository.html_url + '">')
                            .text(repository.name)
                    ),

                    $('<p class="description">')
                        .text(repository.description),

                    $('<p class="last-updated">').append(
                        'last updated ',
                        $('<time class="last-pushed">')
                            .attr('datetime', ISODateString(lastUpdate))
                            .timeago()
                    )
                ).insertBefore(footer);
            });
        },

        'error': function () {
            $('.loading').remove();
            $('<p class="error">')
                .text('Failed to fetch repository information from GitHub. Try refreshing?')
                .insertBefore(footer);
        }
    });
});
