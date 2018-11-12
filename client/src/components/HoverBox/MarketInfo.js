import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
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
        sortTitle: ''
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
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <img src={this.props.prof.img} className="ui verysmall circular image" alt="profile_image"></img>
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <div className="mark-p">
                                <p>{this.props.prof.name}</p>
                                <p><a href={this.props.prof.url} target="_blank" rel="noopener noreferrer" >{this.props.prof.user}</a></p>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <div className='ui vertical menu secondary'>
                    <div className='item filtersort-div' >
                        Filter
                        <div className='menu mini-menu'>
                            <div className='item' id='filtCreator' onClick={this.handleInputClick}>
                                Creator
                                <div className={activeItem === 'filtCreator' ? "inner-item active" : "inner-item"}>
                                    <input type="text" placeholder='Creator Name' name="filtCreator" value={this.state.filtCreator} onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div className='item' id='filtDate' onClick={this.handleInputClick}>
                                Date
                                <div className={activeItem === 'filtDate' ? "inner-item active" : "inner-item"} /* style={{white-space: "nowrap"}} */>
                                    {/*Start:*/}<input type="date" name="filtStartDate" value={this.state.filtStartDate} onChange={this.handleInputChange}/>{/*<br />*/}
                                    {/*End:*/}<input type="date" name="filtEndDate" value={this.state.filtEndDate} onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div className='item' id='filtTag' onClick={this.handleInputClick}>
                                Tags
                                <div className={activeItem === 'filtTag' ? "inner-item active" : "inner-item"}>
                                    <input type="text" placeholder='Tag' name="filtTag" value={this.state.filtTag} onChange={this.handleInputChange} />
                                </div>
                            </div>
                            <div className='item' id='filtPebble' onClick={this.handleInputClick}>
                                Pebbles
                                <div className={activeItem === 'filtPebble' ? "inner-item active" : "inner-item"}>
                                    <input type="text" placeholder='Pebbles' name="filtPebble" value={this.state.filtPebble} onChange={this.handleInputChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='item filtersort-div' >
                        Sort
                        <div className='menu mini-menu'>
                            <div className='item' id='sortDate' onClick={this.handleInputClick}>
                                Date
                                <div className={activeItem === 'sortDate' ? "inner-item active" : "inner-item"}>
                                    <div className="sort-div">
                                        <p id="newest-oldest" onClick={this.handleDateSort}>Newest - Oldest</p>
                                        <p id="oldest-newest" onClick={this.handleDateSort}>Oldest - Newest</p>
                                    </div>
                                </div>
                            </div>
                            <div className='item' id='sortTitle' onClick={this.handleInputClick}>
                                Title
                                <div className={activeItem === 'sortTitle' ? "inner-item active" : "inner-item"}>
                                    <div className="sort-div">
                                        <p id="a-z" onClick={this.handleTitleSort}>A - Z</p>
                                        <p id="z-a" onClick={this.handleTitleSort}>Z - A</p>
                                    </div>
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
