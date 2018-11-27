import React, { Component } from 'react'
// import { Grid } from 'semantic-ui-react'
import './HoverBox.css';

export default class HoverBox extends Component {
    state = { 
        activeItem: '',
        filtCreator: '',
        filtStartDate: '',
        filtEndDate: '',
        filtTag: '',
        filtPebble: '',
        sortDate: '',
        sortTitle: '',
        sortPebbles: ''
    }

    handleInputClick = e => {
        if (e.target.id.startsWith('filt') || e.target.id.startsWith('sort')) {
            // open and close filters
            if (e.target.id === this.state.activeItem) {
                this.setState({ activeItem: "" })
            } else {
                this.setState({ activeItem: e.target.id })
            }

            // if not active will clear out
            if (e.target.id !== "filtCreator") {
                this.setState({ filtCreator: "" })
            }
    
            if (e.target.id !== "filtDate") {
                this.setState({ filtStartDate: "", filtEndDate: "" })
            }
    
            if (e.target.id !== "filtTag") {
                this.setState({ filtTag: "" })
            }

            if (e.target.id !== "filtPebble") {
                this.setState({ filtPebble: "" })
            }
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleDateSort = event => {
        let { id } = event.target
        this.props.sortDate(id)
    }

    handleTitleSort = event => {
        let { id } = event.target
        this.props.sortTitle(id)
    }

    handlePebbleSort = event => {
        let { id } = event.target
        this.props.sortPebbles(id)
    }

    handleSubmit = () => {
        let { filtCreator, filtStartDate, filtEndDate, filtTag, filtPebble } = this.state
        filtTag = filtTag.toLowerCase()

        // set today's date
        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth()+1
        const yyyy = today.getFullYear()
        if(dd<10) { dd=`0${dd}`}
        if(mm<10) { mm=`0${mm}`}
        
        if (filtCreator !== "") {
            this.props.filterCreator(filtCreator)
        } else if (filtTag !== "") {
            this.props.filterTag(filtTag)
        } else if (filtPebble !== "") {
            this.props.filterPebbles(filtPebble)
        } else if (filtStartDate !== "" && filtEndDate === "") {
            this.props.filterDate({start: filtStartDate, end: `${yyyy}-${mm}-${dd}` })
        } else if (filtStartDate === "" && filtEndDate !== "") {
            this.props.filterDate({start: "2017-01-01", end: filtEndDate})
        } else if (filtStartDate !== "" && filtEndDate !== "") {
            this.props.filterDate({start: filtStartDate, end: filtEndDate})
        }
    };

    render() {
        const { activeItem } = this.state
        return (
            <div className="mark-info">
                <div className='filtersort-div'>
                    <h3>Filter</h3>
                    <div className='mini-menu'>

                        <div className='filt-item'>
                            <p  id='filtCreator' onClick={this.handleInputClick} style={{textDecoration: `${activeItem === 'filtCreator' ? "underline" : "none"}`}}>Creator</p>
                            <div className={activeItem === 'filtCreator' ? "inner-item active" : "inner-item"}>
                                <input type="text" placeholder='Creator Name' name="filtCreator" value={this.state.filtCreator} onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div className='filt-item' >
                            <p id='filtDate' onClick={this.handleInputClick} style={{textDecoration: `${activeItem === 'filtDate' ? "underline" : "none"}`}}>Date</p>
                            <div className={activeItem === 'filtDate' ? "inner-item active" : "inner-item"} /* style={{white-space: "nowrap"}} */>
                                {/*Start:*/}<input type="date" name="filtStartDate" value={this.state.filtStartDate} onChange={this.handleInputChange}/>{/*<br />*/}
                                {/*End:*/}<input type="date" name="filtEndDate" value={this.state.filtEndDate} onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div className='filt-item'>
                            <p id='filtTag' onClick={this.handleInputClick} style={{textDecoration: `${activeItem === 'filtTag' ? "underline" : "none"}`}}>Tags</p>
                            <div className={activeItem === 'filtTag' ? "inner-item active" : "inner-item"}>
                                <input type="text" placeholder='Tag' name="filtTag" value={this.state.filtTag} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className='filt-item'>
                            <p id='filtPebble' onClick={this.handleInputClick} style={{textDecoration: `${activeItem === 'filtPebble' ? "underline" : "none"}`}}>Pebbles</p>
                            <div className={activeItem === 'filtPebble' ? "inner-item active" : "inner-item"}>
                                <input type="number" placeholder='Pebble Count' name="filtPebble" value={this.state.filtPebble} onChange={this.handleInputChange} />
                            </div>
                        </div>

                    </div>
                </div>



                <div className='filtersort-div' style={{marginTop: "40px"}}>
                    <h3>Sort</h3>
                    <div className='mini-menu'>

                        <div className='filt-item'>
                            <p id='sortDate' onClick={this.handleInputClick} style={{textDecoration: `${activeItem === 'sortDate' ? "underline" : "none"}`}}>Date</p>
                            <div className={activeItem === 'sortDate' ? "inner-item active" : "inner-item"}>
                                <div className="sort-div">
                                    <p id="newest-oldest" onClick={this.handleDateSort}>Newest - Oldest</p>
                                    <p id="oldest-newest" onClick={this.handleDateSort}>Oldest - Newest</p>
                                </div>
                            </div>
                        </div>
                        <div className='filt-item'>
                            <p id='sortTitle' onClick={this.handleInputClick} style={{textDecoration: `${activeItem === 'sortTitle' ? "underline" : "none"}`}}>Title</p>
                            <div className={activeItem === 'sortTitle' ? "inner-item active" : "inner-item"}>
                                <div className="sort-div">
                                    <p id="a-z" onClick={this.handleTitleSort}>A - Z</p>
                                    <p id="z-a" onClick={this.handleTitleSort}>Z - A</p>
                                </div>
                            </div>
                        </div>
                        <div className='filt-item'>
                            <p id='sortPebbles' onClick={this.handleInputClick} style={{textDecoration: `${activeItem === 'sortPebbles' ? "underline" : "none"}`}}>Pebbles</p>
                            <div className={activeItem === 'sortPebbles' ? "inner-item active" : "inner-item"}>
                                <div className="sort-div">
                                    <p id="min-max" onClick={this.handlePebbleSort}>Min - Max</p>
                                    <p id="max-min" onClick={this.handlePebbleSort}>Max - Min</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <button className="clear-btn" onClick={this.props.clearFilter}>Reset</button>
                <button className="filtersort-btn" onClick={this.handleSubmit}>Search</button>
            </div>
        )
    }
}
