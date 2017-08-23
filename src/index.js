import React from 'react'
import {render} from 'react-dom'
import Word from './word'
import 'css/index.scss'

let App = React.createClass({

    getInitialState: function() {

        return { text:"这是一段文字描述" } 
    },
    componentDidMount:function(){
         
    },
    render: function() {
       
        return (
                <div>
                    <h4>
                        {this.state.text}

                    </h4>
                    <h5> webpack is amazing </h5>
                    <Word />
                </div>

            )
    }
})

render(<App />, document.getElementById('app'));
