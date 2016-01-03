import rollbar from 'rollbar';

rollbar.init('b1d3ce58586d446db04bd1de93d5506c');

module.exports = (err, stack) => {
    console.log('Caught exception: ' + err, stack);
}