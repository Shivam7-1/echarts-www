// $.getJSON("https://api.github.com/repos/apache/echarts/releases").done(function (param) {
    // `yyyy-MM-dd` should be correct. `hh:mm:ss` doesn't matter.
    var param = [{
        publishedAt: '2021-06-09T00:00:00Z',
        prerelease: false,
        name: '5.1.2'
    }, {
        publishedAt: '2021-04-27T00:00:00Z',
        prerelease: false,
        name: '5.1.1'
    }, {
        publishedAt: '2021-04-15T00:00:00Z',
        prerelease: false,
        name: '5.1.0'
    }, {
        publishedAt: '2021-02-06T00:00:00Z',
        prerelease: false,
        name: '5.0.2'
    }, {
        publishedAt: '2021-01-16T00:00:00Z',
        prerelease: false,
        name: '5.0.1'
    }, {
        publishedAt: '2020-12-02T00:00:00Z',
        prerelease: false,
        name: '5.0.0'
    }, {
        publishedAt: '2020-09-01T00:00:00Z',
        prerelease: false,
        name: '4.9.0'
    }, {
        publishedAt: '2020-05-25T00:00:00Z',
        prerelease: false,
        name: '4.8.0'
    }, {
        publishedAt: '2020-03-19T00:00:00Z',
        prerelease: false,
        name: '4.7.0'
    }, {
        publishedAt: '2019-12-30T00:00:00Z',
        prerelease: false,
        name: '4.6.0'
    }, {
        publishedAt: '2019-11-18T16:00:00Z',
        prerelease: false,
        name: '4.5.0'
    }, {
        publishedAt: '2019-10-15T01:12:00Z',
        prerelease: false,
        name: '4.4.0'
    }, {
        publishedAt: '2019-09-16T15:57:00Z',
        prerelease: false,
        name: '4.3.0'
    }, {
        publishedAt: '2019-03-21T10:27:59Z',
        prerelease: false,
        name: '4.2.1'
    }, {
        publishedAt: '2018-08-04T12:55:30Z',
        prerelease: false,
        name: '4.1.0'
    }];
    var table = document.getElementById('download-table');

    function isIncubatingVersion(version) {
        // The first release version after graduated is 5.0.1.
        return version.split('.')[0] < 5 || version === '5.0.0';
    }

    for (var i = 0; i < param.length; ++i) {
        if (!param[i].prerelease) {
            var time = new Date(param[i].publishedAt);
            if (time.getTime() > new Date('2018-05-21')) {
                var line = document.createElement('tr');

                var version = param[i].name;
                var versionEl = document.createElement('td');
                versionEl.innerHTML = param[i].name;
                line.appendChild(versionEl);

                var date = document.createElement('td');
                date.innerHTML = time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate();
                line.appendChild(date);

                var isIncubating = isIncubatingVersion(version);

                var main = 'https://www.apache.org/dist/echarts/' + version
                    + '/apache-echarts-' + version + (isIncubating ? '-incubating' : '');
                var mirror = 'https://www.apache.org/dyn/closer.cgi/echarts/' + version
                    + '/apache-echarts-' + version + (isIncubating ? '-incubating' : '');

                var source = document.createElement('td');
                source.innerHTML = '<a target="_blank" href="' + mirror + '-src.zip">Source</a> '
                    + '(<a target="_blank" href="' + main + '-src.zip.asc">Signature</a> '
                    + '<a target="_blank" href="' + main + '-src.zip.sha512">SHA512</a>)';
                line.appendChild(source);

                var bin = document.createElement('td');
                bin.innerHTML = '<a target="_blank" href="https://github.com/apache/echarts/tree/'
                    + version + '/dist">Dist</a>';
                line.appendChild(bin);

                table.appendChild(line);
            }
        }
    }
// });
