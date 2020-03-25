import _ from 'lodash';

const hello = _.join(['Hello', 'webpack'], ' ');

const fn = () => {
  console.log(123);
};

fn();

document.getElementById('root').innerHTML = hello
