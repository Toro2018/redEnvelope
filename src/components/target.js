import React from 'react';
import PropTypes from 'prop-types';
import { random } from './helper';

export class Target extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.number !== nextProps.number;
  }

  render() {  
    const bonus = random(0, 10) > 5;
    const url1 = 'https://tse3.mm.bing.net/th?id=OIP.gFt-uqmVIilT_yUH-bpL8gHaHa&pid=Api&w=512&h=512&rs=1&p=0';
    const url2 = 'http://hbimg.b0.upaiyun.com/9987ece1f9b26eb2ff6f3489397c6b8a590f359110c1ea-vjzPlB_fw658';
    const url = bonus? url1 : url2;   
    const number = bonus? this.props.number : '.';


    let style = {      
      left: random(0, 100) + '%',
      top: random(0, 100) + '%',
      visibility: number? 'visible' : 'hidden' ,
      backgroundImage: "url(" + url + ")"
    };

    return (
      <span className="target" style={style} >
        {number}
      </span>
    )
  }
}

Target.propTypes = {
  number: PropTypes.number.isRequired
};