# logeion-double-click
This is a Chrome plugin that detects when you double-click a word to highlight it, opens a new tab, and searches for the word in Logeion. It is active on all pages but uses the `chrome.i18n.detectLanguage` and `chrome.tabs.detectLanguage` APIs to try to make an educated guess about whether your selection is in Latin or Greek, which avoids unintentional searches in most cases.

# Installing
If you know how to use git, clone the repo. If not, click the green `Code <>` button above, download the zip, and extract it. In your browser, go to chrome://extensions - activate Developer Mode and click the "Load unpacked" button. Enter the directory where you extracted the zip or cloned the repo.

# Perseus
Use the [Perseus Scaife Viewer](https://scaife.perseus.org/library/) for the best experience. The plugin works for the classic site but I don't recommend it. The classic site has links on each individual word (which I personally never found helpful) so the plugin strips them. Unfortunately their website's code is a mess, so you need to access it from http://www.perseus.tufts.edu, not https://www.perseus.tufts.edu which has some broken JavaScript delaying the plugin from loading. It will take 15-20 seconds for the links to be stripped because their site tries to load a cross-site script that has to time out before the plugin runs.

# Cavete
The plugin first tries to determine whether the page is mostly in Latin or Greek. If so, any word you double-click will be searched in Logeion. If not, it tries to detect the language of the word itself, which is far less accurate. Some sites like the Perseus Scaife viewer are detected as being English despite containing mostly Greek or Latin texts, but in practice it works pretty well. However, expect to get an occasional false positive or false negative. I've found that Latin words containing `x` are often guessed as Basque, and Latin words in general are often guessed as Italian. Greek is very reliable though, I've never seen a false positive or false negative there, probably because it's the only language that uses the Greek character set.

If you are a modern Greek speaker you will likely find this plugin to be very annoying on modern Greek sites because the ISO language spec makes no distinction between modern Greek and ancient/polytonic Greek.
