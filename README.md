## Ruuvi Documentation [![Build Status](https://travis-ci.org/ruuvi/ruuvi.github.io?branch=master)](https://travis-ci.org/ruuvi)
=======

Here you'll find the documentation for the Ruuvi platforms.

To view this documentation, visit [ruuvi.github.io](http://ruuvi.github.io).


### Structuring your content

The docs dynamically generate a table of contents for navigation purposes based on the headers (i.e. `###`) that you use on each page. It is important to note that _order and hierarchy matters_ when you are designing the organization of content on your page. Your page should include the following:

* 1 `h1` at the top of the page that will serve as the title of the page. You can even copy the `title` directly from the front-matter of the markdown file like this: `# {{title}}`

* As many `h2`s (`##`) as you'd like to serve as the section headers for the page.

* Underneath every `h2`, if applicable, as many `h3`s (`###`) as you'd like to serve as sub-sections within the section. These will appear as nested within the navigation on the left.

Note that there are only 2 levels of navigation that will appear in the table of contents. *`h4`s and below will not appear in the table of contents*.

### Device Specific Content

If you are working on a page that has device-specific content, the
first thing you need to do is add the relevant device names to the
front-matter of the MD file, like this:

```
devices: ['ruuvitag', 'ruuvitracker']
```
Where RuuviTag and RuuviTracker are the relevant devices to this page. Then, in
the body of the page, you can specify device-specific content by
using a special helper, like this:

```
{{#if ruuvitag}}
  RUUVITAG SPECIFIC STUFFZ
{{/if}}

{{#if ruuvitracker}}
  RUUVITRACKER SPECIFIC STUFFZ
{{/if}}
```

### Contributions

This documentation is managed by Ruuvi, but supported by the community. We welcome contributions such as:

* Edits to improve grammar or fix typos
* Edits to improve clarity
* Additional annotated examples for others to follow
* Additional content that would help provide a complete understanding of the Ruuvi platform

Making a contribution is as simple as forking this repository, making edits to your fork, and contributing those edits as a pull request. For more information on how to make a pull request, see [Github's documentation](https://help.github.com/articles/using-pull-requests/).


### Attributions and license

The motor of this documentation is derived from https://github.com/spark/docs that is licensed using [Creative Commons Attribution-ShareAlike 3.0 license](http://creativecommons.org/licenses/by-sa/3.0/us/). Everything in this repository is licensed using same license.

You are welcome to distribute, remix, and use these files for commercial purposes. If you do so, please attribute the original design to Spark Labs, Inc. both on the website and on the physical packaging of the product or in the instruction manual. All derivative works must be published under the same or a similar license.