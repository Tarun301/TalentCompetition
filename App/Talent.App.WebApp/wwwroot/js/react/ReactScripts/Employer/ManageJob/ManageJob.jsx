import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment, CardDescription, CardHeader, CardContent } from 'semantic-ui-react';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here

        
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)
        
        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
    };

    loadData(callback) {
        //var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:51689/listing/listing/getSortedEmployerJobs',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            data: {
                activePage: 1,
                sortbyDate: "desc",
                showActive:true,
                showClosed:false,
                showDraft:true,
                showExpired:true,
                showUnexpired:true
              


            },
            
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let jobList = null;
                alert(res);
                console.log(res);
                if (res.MyJobs) {
                    jobList = res.MyJobs;
                    console.log("List", jobList);

                   this.updateWithoutSave(employerData)
                        .bind(this)
                }
            },
            error: function (res) {
                console.log(res.status)
            }
        })
        this.init()
        console.log("HI");
        
       // your ajax call and other logic goes here
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    render() {
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
            <div className ="ui container">
                <h1>List of Jobs</h1>

                <div className="filter-container">
                <div>Filter:</div>
                <div>
                    <select>
                        <option value="">All</option>
                        <option value="Developers">Developer</option>
                        <option value="BI Analyst">BI Developer</option>
                        <option value="Test Analyst">Test Analyst</option>
                    </select>
                </div>
                </div>
                <div className="ui card">
                <div className="content">
                    <div className="header">Junior Software Developer</div>
                    <div className="meta">
                        <span className="category">Full time</span>
                    </div>
                    <div className="description">
                        <p>Jenny is a student studying Media Management at the New School</p>
                    </div>
                </div>
                <div className="extra content">
                    <div className="left floated">
                        <button className="ui blue basic button">Apply now</button>
                    </div>
                    <div className="right floated author">
                        <img className="ui avatar image" src="https://semantic-ui.com/images/avatar/small/matt.jpg" /> Company Z
                    </div>
                </div>
                </div>

                <div className="ui card">
                <div className="content">
                    <div className="header">Full Stack Developer</div>
                    <div className="meta">
                        <span className="category">Full time</span>
                    </div>
                    <div className="description">
                        <p>It is a Full stack position with the willingness to relocate in a new city.</p>
                    </div>
                </div>
                <div className="extra content">
                    <div className="left floated">
                        <button className="ui blue basic button">Apply now</button>
                    </div>
                    <div className="right floated author">
                        <img className="ui avatar image" src="https://semantic-ui.com/images/avatar/small/matt.jpg" /> Company Z
                    </div>
                </div>
                </div>
                
                
               
            </div>

            </BodyWrapper>
        )
    }
}