// import _ from 'lodash';

// const hello = _.join(['Hello', 'webpack'], ' ');

// import logo from './assets/logo.png';
import customCss from './index.less';
import custom from './custom.less';

const fn = () => {
  console.log(123);
};

fn();

document.getElementById('root').innerHTML = '<img src="./assets/logo.png" style="width: 10px;">';
