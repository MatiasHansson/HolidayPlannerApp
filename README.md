# HolidayPlannerApp
A simple JavaScript app implemented with NodeJs, expressJs and testable with AVAjs.
Repository does not include node_modules, but the package files have updated info of used modules.

Install manual:
1. Clone repo, use npm to install used packages (root directory use "npm install". Requires node to be installed https://nodejs.org/en/download/)
2. When all node packages are installed, run node server on localhost (root directory hit "node main.js")
3. Open browser on localhost:8080
4. Run test by "npm test" in the root directory

Implementation:

The problem/need was to create HolidayPlanner class to output some usable holiday days to the user from user submitted dates. With javascript implementation, I found it hard to consider only to the HolidayPlanner class, so I build a simple NodeJs app with easy user interface to handle the usage of the app. Also testing would be hard without any 3rd party framework. 

Designing the implementation by current holiday period gave me challanges. The considerated holiday period was in last year and the begining of the implementation the current holiday period was already changed. The implementation is considering the 2021 year holiday period.    