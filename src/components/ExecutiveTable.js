import React from 'react';
import './../styles/ExecutiveTable.css';

class ExecutiveTable extends React.Component {

    state = {
        executives: []
    }
    constructor(props) {
        super(props);
        this.setCircle = this.setCircle.bind(this);
        this.sortBy = this.sortBy.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.data !== this.props.data) {
            this.setState({executives: nextProps.data});
        }
       
    }


    // Set the status(circle) for the quality_score and success_rate
    setCircle(val) {
        let circleColor;
        if (val <= 50) {
            circleColor = 'red';
        } else if (val > 50 && val <= 80) {
            circleColor = 'orange';
        } else {
            circleColor = 'rgb(69, 216, 69)';
        }
        let circleStyle = {
            'border': '5px solid',
            'borderRadius': '50%',
            'color': circleColor,
            'height': '10px',
            'width': '10px',
            'backgroundColor': circleColor,
            'display': 'inline-block',
            'marginLeft': '15px',
            'position': 'relative',
            'top': '5px'
        }
        return <span style={circleStyle}></span> // As the assignment of color is dynamic, using the inline styling
    }

    // Sort the data based on the column
    sortBy(param) {
        if (param === 'name' || param === 'group') {   
            this.setState({ executives:
                this.state.executives.sort((a, b) => {
                    if (a[param] < b[param]) return -1;
                    else if (a[param] > b[param]) return 1;
                    else return 0;
                })
             });
        } else if (param === 'quality_score' || param === 'success_rate') {        
            this.setState({ executives:  this.state.executives.sort((a, b) => {
                return a[param] - b[param];
            })
         });
        }
    }

    render() {

        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td className="first-td">
                            <button className='name-button' onClick={() => this.sortBy('name')} title="Sort by Executive">Executive</button>
                        </td>
                        <td>
                            <button className='name-button' onClick={() => this.sortBy('group')} title="Sort by Business Group">Business Group</button>
                        </td>
                        <td>
                            <button className='name-button' onClick={() => this.sortBy('quality_score')} title="Sort by Quality Score">Quality Score</button>
                        </td>
                        <td className="lastTd-header">
                            <button className='name-button' onClick={() => this.sortBy('success_rate')} title="Sort by Success Rate">Success Rate </button>
                        </td>
                    </tr>
                    {/* Executives Array fetched from API */}
                    {this.state.executives.map(executive => 
                        <tr key={executive.name}>
                            <td className="first-td">{executive.name}</td>
                            <td>{executive.group}</td>
                            <td><div className="score-td">{executive.quality_score}</div>{this.setCircle(executive.quality_score)}</td>
                            <td className="last-td">{parseFloat(executive.success_rate).toFixed(2)}% {this.setCircle(executive.success_rate)}</td>
                        </tr>
                    )}
                     </tbody>
                </table>
                <div className="meta-container">
                    <span> &lt;=50</span>{this.setCircle(45)}
                    <span> &gt;50 & &lt;=80{this.setCircle(55)}</span>
                    <span> &gt;80{this.setCircle(85)}</span>
                </div>
            </div>
        )
    }
}

export default ExecutiveTable;