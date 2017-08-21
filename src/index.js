import React from 'react'
import {render} from 'react-dom'
import Word from './word'
import 'css/index.scss'
let App = React.createClass({

    getInitialState: function() {
        return { text:"ddffd" } 
    },
    componentDidMount:function(){

    },
    render: function() {
       
      return (
        <div>
            {this.state.text}ffcc
            <Word />
            
        </div>

         )
    }
})
render(<App />, document.getElementById('app'));
/**/