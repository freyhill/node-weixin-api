import React from 'react'
import {render} from 'react-dom'

let Word = React.createClass({

    getInitialState: function() {

        return { text:"这是word" } 
    },

    componentDidMount:function(){
        
    },

    render: function() {
       
        return (
            
            <div>
                <h5>{this.state.text}</h5>
                <h5>good</h5>
            </div>
        
        )
    }
})

export default Word 