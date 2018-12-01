# Code Penguin
A developer community dedicated to requesting, creating and trading solutions to coding conundrums.

## Why Penguins?
Penguins are renowned in the animal kingdom for their generosity and we wanted our community to incorporate that pay-it-forward spirit. Penguins famously find the prettiest pebbles they can to give to others. Technically, their goal is to mate, but let's not stretch the metaphor too far.

## Pebbles
The "currency" of Code Penguin is the **pebble**. Pebbles are earned by submitting solutions to others' tasks. Pebbles are spent to "buy" solutions for tasks of your own. Pebbles are powered by blockchain technology, but they aren't a cryptocurrency. They cannot be mined or traded for other currencies. They can only be traded for solutions to tasks.

## Tasks
Problems penguins pose range from simple tasks to full-fledged projects. The key to a good Code Penguin task is that it be not easily Googleable. Our primary goal is to build a huge repository of unanswered questions and undiscovered solutions, to help further build the open source community of developers. 

Tasks can be things like:
- "I need someone to build a design forward front end UI component library that doesn't depend on JQuery"
- "There's a bug with this NPM module that's impeding progress on my project but I don't have the know-how to fix it myself... Is someone else up to the challenge?"
- "My current algorithm isn't scalable because of its less-than-ideal efficiency. Can anyone come up with a dramatically improved one?"
- "There are no good tutorials about migrating from this SQL database to a noSQL one and I can't figure it out on my own. Would someone put together a quick tutorial?"

If you find an open problem that has yet to find a satisfactory solution, you can work on solving it yourself to get some pebbles, or you can throw down some pebbles of your own and become a backer, adding to the value of that problem for any would-be solver.

## Solutions
Solutions can be rewarded by the original creator of the task to one and only one solution. That solution's creator gets all the pebbles pledged to that task by its creator and any backers.

## How to install

__Before starting, make sure you have Holochain installed and initialized, and are connected to the internet.__

In GitBash or Terminal:

1. Locate where you want your app folder to be
2. Get the repo: `$ git clone https://github.com/cefimenda/code-penguin.git`
3. Enter the app's root folder and install the following packages:
  * `$ cd code-penguin` then
  * `$ yarn` or `$ npm install`
4. Install react packages (enter in to client folder from the app's main folder ):
  * `$ cd client` then
  * `$ yarn` or `$ npm install`
5. Build the holochain directory on your local machine.
  * `$ cd ../penguin` then
  * `$ hcadmin join . code-penguin`
6. Then back to the home directory, and run the start script!
  * `$ cd ..` then
  * `$ yarn start`

## More Info
See our [website](https://code-penguin.herokuapp.com/) for more information! 
