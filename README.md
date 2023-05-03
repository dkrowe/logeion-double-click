# logeion-double-click
This is a Chrome plugin that detects when you double-clicked a word to highlight it, opens a new tab, and searches for the word in Logeion. It was hastily thrown together and doesn't do any sophisticated checking of what you double-clicked. To avoid the behavior triggering any time you double-click a word the plugin uses a whitelist to choose the sites on which the plugin is active. At the moment it includes Persesus, Logeion, and The Latin Library since those are the sites I browse the most.

# Installing
Clone the repo and go to chrome://extensions - active Developer Mode and click the "Load unpacked" button. Enter the repo's directory.

# Adding whitelisted sites
Open `manifest.json` and add the website to the `matches` list. Be sure to include `/*` at the end if you want to match everything on the site.

# Future development
Instead of using a whitelist we could check the selected text to see if it includes polytonic Greek characters. Detecting Latin would probably require checking the selection against a dictionary of all known Latin words.
