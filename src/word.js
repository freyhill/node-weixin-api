import React from 'react'
import {render} from 'react-dom'

let Word = React.createClass({

    getInitialState: function() {
        return { text:"fff" } 
    },
    componentDidMount:function(){

    },
    render: function() {
       
      return (
        <div>{this.state.text}</div>
        
         )
    }
})

export default Word 