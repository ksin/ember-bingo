# ember-bingo

![Gif demo of Ember bingo](https://media.giphy.com/media/l0HUjC0npNocjSlhe/giphy.gif)

[View App](https://ember-bingo.herokuapp.com/)

To add more buzzwords to the collection, make changes to [app/utils/buzzwords.js](https://github.com/ksin/ember-bingo/blob/master/app/utils/buzzwords.js).

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd ember-bingo`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

The app is deployed to Heroku. Commit changes via git then `git push heroku master`.
For now, make sure the app is deployed without a `yarn.lock` file so that it installs packages via npm (bug with yarn install with Heroku deploys).

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
