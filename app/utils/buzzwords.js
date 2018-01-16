/*  Fixture of buzz words to randomly pick from.
    We need at least 24 words to make a bingo board.
    Make changes directly to this file to add to the list of buzz words
*/

const Buzzwords = [
  'Progressive Web App',
  'TypeScript',
  'Service Workers',
  'Blockchain',
  'Compilers',
  'Composable',
  'Functional',
  'Glimmer',
  'Server-side rendering',
  'Machine learning',
  'Routable Components',
  'DDAU',
  'ecosystem',
  'QUnit',
  'RFC',
  'Ember cli',
  'Ember Data',
  'Mirage',
  'jQuery',
  'Lint',
  'Tomster',
  'Zoey',
  'VM',
  'Stateless',
  'Immutable',
  'HTTP2',
  'Concurrency',
  'Reactive',
  'Redux',
  'ES7 / ES2016',
  'Functional CSS',
  'NPM install your way to Ember',
  'The World\'s First Temperature Control Mug',
  'Svelte',
  'Tree-Shaking'
];

// Utility function for randomly splicing a word from Buzzwords
export function getBuzzword() {
  return Buzzwords.splice(Math.floor(Math.random()*Buzzwords.length), 1)[0];
}

export default Buzzwords;
