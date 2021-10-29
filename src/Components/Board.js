import React from 'react'
import Square from './Square'

class Board extends React.Component {
    constructor() {
        super()
        this.state = {
            squares: [],
            level: 1,
            time: 0,
            count: 0,
            load: 0
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.timer(),
            1000
        )
    }

    timer() {
        if(winLevel(this.state.squares, this.state.level))
            clearInterval(this.timerID)
        else
            this.setState({time: this.state.time + 1})
    }

    componentWillMount(level=null) {
        level = level||this.state.level
      
        const sqrs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,
                        19,20,21,22,23,24,'']
        const len = level
        let sq = sqrs.slice(0, (len+3)*(len+1))

        sq[(len+3)*(len+1)] = ''
        
        let k = 5*(len+2)*(len+2), old = null
        while(k !== 0) {
            const inx = Math.floor(Math.random()*(len+3)*(len+1)+1)
            let pustInx = null

            if(sq[inx-1] === '' && inx%(len+2) !== 0) pustInx = inx-1
            if(sq[inx+1] === '' && (inx+1)%(len+2) !== 0) pustInx = inx+1
            if(sq[inx-len-2] === '') pustInx = inx-len-2
            if(sq[inx+len+2] === '') pustInx = inx+len+2

            if(pustInx !== null && old !== inx) {
                k--
                sq[pustInx] = sq[inx]
                sq[inx] = ''
            }

            old = inx
        }

        
        this.setState({
            load: 1,
            squares: sq,
            level: level
        })
        
    }

    clickHandler(i) {
        const squares = this.state.squares.slice()
        let len = this.state.level

        let pustInx = null

        if(squares[i-1] === '') pustInx = i-1
        if(squares[i+1] === '') pustInx = i+1
        if(squares[i-len-2] === '') pustInx = i-len-2
        if(squares[i+len+2] === '') pustInx = i+len+2

        if(squares[i] !== '' && pustInx !== null) {
            squares[pustInx] = squares[i]
            squares[i] = ''

            this.setState({
                squares: squares,
                count: this.state.count + 1
            })
        }

    }

    nextLevel() {
        let level = this.state.level + 1
        this.setState({count: 0, time: 0})
        this.componentWillMount(level)
        this.componentDidMount()
    }



    renderSquare(i) {
        return <Square
                    value={this.state.squares[i]}
                    level={this.state.level}
                    onClick={() => !winLevel(this.state.squares, this.state.level)? this.clickHandler(i):null}
                />
        
    }

    reset() {
        this.setState({
            squares: [],
            level: 1,
            time: 0,
            count: 0,
        }, () => this.componentWillMount())
    }

    render() {
        const tsl = this.state.level
        const t = this.state.time
        const time = t>59 ? ((t-t%60)/60 + 'm ' + t%60 + 's') : (t + 's')

        const next = tsl !== 3?(winLevel(this.state.squares, this.state.level)? <div className="next">
                        <button onClick={() => this.nextLevel()}>Next</button>
                    </div>:''):winLevel(this.state.squares, this.state.level)?
                    <div className="next">
                        <button onClick={() => this.reset()}>Reset</button>
                    </div>:''

        return (
            <>
                <div className="count-time">
                    <h2>Count: {this.state.count}</h2>
                    <h2>Time: {time}</h2>
                 </div>
                 <div className="flex-board">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {tsl===2||tsl===3?this.renderSquare(9):null}
                    {tsl===2||tsl===3?this.renderSquare(10):null}
                    {tsl===2||tsl===3?this.renderSquare(11):null}
                    {tsl===2||tsl===3?this.renderSquare(12):null}
                    {tsl===2||tsl===3?this.renderSquare(13):null}
                    {tsl===2||tsl===3?this.renderSquare(14):null}
                    {tsl===2||tsl===3?this.renderSquare(15):null}
                    {tsl===3?this.renderSquare(16):null}
                    {tsl===3?this.renderSquare(17):null}
                    {tsl===3?this.renderSquare(18):null}
                    {tsl===3?this.renderSquare(19):null}
                    {tsl===3?this.renderSquare(20):null}
                    {tsl===3?this.renderSquare(21):null}
                    {tsl===3?this.renderSquare(22):null}
                    {tsl===3?this.renderSquare(23):null}
                    {tsl===3?this.renderSquare(24):null}
                    {next}
                </div>
            </>
        )
    }
}

function winLevel(sqrs, lev) {
    let k = 0
    for(let i=0; i<(lev+3)*(lev+1); i++)
        if(sqrs[i] === i+1) k++
    
    return k === (lev+3)*(lev+1) ? 1:0
}

export default Board