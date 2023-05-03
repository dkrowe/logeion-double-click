# logeion-double-click
This is a Chrome plugin that detects when you double-click a word to highlight it, opens a new tab, and searches for the word in Logeion. It was hastily thrown together and doesn't do any sophisticated checking of what you double-clicked. To avoid the behavior triggering any time you double-click a word the plugin uses a whitelist to choose the sites on which the plugin is active. At the moment it includes Persesus, Logeion, and The Latin Library since those are the sites I browse the most.

# Installing
Clone the repo and go to chrome://extensions - active Developer Mode and click the "Load unpacked" button. Enter the repo's directory.

# Adding whitelisted sites
Open `manifest.json` and add the website to the `matches` list. Be sure to include `/*` at the end if you want to match everything on the site.

# Perseus
Use [the Perseus Scaife Viewer](https://scaife.perseus.org/library/) for the best experience. The plugin works for the classic site but I don't recommend it. The classic site has links on each individual word (which I personally never found helpful) so the plugin strips them. Unfortunately their website's code is a mess, so you need to access it from http://www.perseus.tufts.edu, not https://www.perseus.tufts.edu which has some broken JavaScript delaying the plugin from loading. It will take 15-20 seconds for the links to be stripped because their site tries to load a cross-site script that has to time out before the plugin runs.

# Future development
I think we could get rid of the whitelist if we found a way to parse all the text contents on the page, feed it into `chrome.i18n.detectLanguage`, and enable the plugin behavior if some percentage of the text is detected with the language codes `el` or `la`. On top of that, there's another layer of scanning we could do on individual words (for the use case where a page is mostly in a modern language but contains Greek or Latin words, like a theological paper that references the word `λόγος` or a legal paper that uses `amicus curiae`) but it might not be reliable since the API doesn't work well if you only give it one word at a time; I've noticed that Latin words containing `x` are often guessed as Basque words.
