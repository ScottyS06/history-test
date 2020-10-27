# [dubhacks.co](http://dubhacks.co)

[![dubhacks.co](https://cloud.githubusercontent.com/assets/744973/3867142/1b9715c2-1ff2-11e4-8090-384765fd3eb7.png)](http://dubhacks.co)

The largest collegiate hackathon in the Pacific Northwest.

### Development

`master` is the production branch which is deployed as changes are pushed. Never develop on `master`.

Make new branches for new changes, and once you are satisfied, merge them with `master` and push them.

### Installing

```sh
git clone git@github.com:dubhacks/dubhacks.github.io.git
npm install                # install dependencies
```

### Continuous Building

Commands to run to build and serve the file (use separate tabs):

```sh
grunt watch                # run grunt tasks on changes
jade -w -P index.jade      # process jade on changes
python -m SimpleHTTPServer # serve the site locally
```
