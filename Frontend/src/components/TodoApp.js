import React, {Component} from 'react';
import './TodoApp.css';
import {TodoList} from "./TodoList";
import axios from 'axios';




import 'react-datepicker/dist/react-datepicker.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import moment from "moment";
import FormDialog from './FormDialog';
import Filter from './Filter';
import FilterListIcon from '@material-ui/icons/FilterList';
export class TodoApp extends Component {
    constructor(props) {
        super(props);
        const listItems =[];
        this.state = {items: listItems, itemsAux:listItems, description:"", name:"", email:"", status:"", dueDate: moment(), file: null, open:false,
        filterOpen: false, filterDate: null, filterEmail: null, filterState: null};
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleOpenChange = this.handleOpenChange.bind(this);
        this.handleEmailsForFilter = this.handleEmailsForFilter.bind(this);
        this.handleDatesForFilter = this.handleDatesForFilter.bind(this);
        this.handleOpenChangeFilter = this.handleOpenChangeFilter.bind(this);
        this.handleFilterDateChange = this.handleFilterDateChange.bind(this);
        this.handleFilterEmailChange = this.handleFilterEmailChange.bind(this);
        this.handleFilterStateChange = this.handleFilterStateChange.bind(this);
        this.filter = this.filter.bind(this);
        this.cancelFilter = this.cancelFilter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }
    render() {
        return (
            <div className="App">
                <Fab size="medium" color="primary" aria-label="add" margin="theme.spacing(1)">
                    <FilterListIcon onClick = {this.handleOpenChangeFilter}/>
                </Fab>
                <br/><br/>
                <TodoList todoList={this.state.items}/>
                <Filter
                    open = {this.state.filterOpen}
                    state = {this.state}
                    handleEmailsForFilter = {this.handleEmailsForFilter}
                    handleDatesForFilter = {this.handleDatesForFilter}
                    handleOpenChangeFilter = {this.handleOpenChangeFilter}
                    handleFilterDateChange = {this.handleFilterDateChange}
                    handleFilterEmailChange = {this.handleFilterEmailChange}
                    handleFilterStateChange = {this.handleFilterStateChange}
                    filter = {this.filter}
                    cancelFilter = {this.cancelFilter}
                />

                <FormDialog
                    open = {this.state.open}
                    state = {this.state}
                    handleDescriptionChange = {this.handleDescriptionChange}
                    handleNameChange = {this.handleNameChange}
                    handleEmailChange = {this.handleEmailChange}
                    handleStatusChange = {this.handleStatusChange}
                    handleDateChange = {this.handleDateChange}
                    handleOpenChange = {this.handleOpenChange}
                    handleFileChange = {this.handleFileChange}
                    handleSubmit = {this.handleSubmit}
                />
                <br/>
                <Fab size="medium" color="primary" aria-label="add" margin="theme.spacing(1)">
                    <AddIcon onClick = {this.handleOpenChange}/>
                </Fab>
            </div>
        );
    }

    uploadFile = (task) => {
        let data = new FormData();
        data.append('file', this.state.file);
        var that = this;
        axios.post('http://localhost:8080/api/files', data)
            .then(function (response) {
                console.log("file uploaded!", data);
                that.addTaskToPlanner(task);
        })
        .catch(function (error) {
            console.log("failed file upload", error);
            alert("failed upload")
        });
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/todo')
             .then(response => { 
                this.setState({
                    items: response.data
                });
             })
             .catch(e => {    
                console.log(e);             
                alert("error!");
                this.setState({
                    items: []
                });
             });            
    }

    addTaskToPlanner = (task) => {
        axios.post('http://localhost:8080/api/todo', 
            task
            )        
             .then(response => { 
                this.componentDidMount();
             })
             .catch(e => {    
                alert("error!");
             });        
    }

    handleFilterDateChange(e) {
        this.setState({
            filterDate: e.target.value
        });
    }
    handleFilterEmailChange(e) {
        this.setState({
            filterEmail: e.target.value
        });
    }
    handleFilterStateChange(e) {
        this.setState({
            filterState: e.target.value
        });
    }
    
    filter(e) {
        console.log(this.state.itemsAux)
        var listItemsFilter = []
        for(var i = 0; i < this.state.items.length; i++) {
            const item = this.state.items[i];
            if (item.dueDate.toString() === this.state.filterDate ||
                item.email === this.state.filterEmail ||
                item.status === this.state.filterState) {
                    listItemsFilter.push(item)
                } 
        }
        this.handleItems(listItemsFilter);
        this.handleOpenChangeFilter(false);
    }

    cancelFilter(e) {
        console.log("entro");
        console.log(this.state.itemsAux);
        this.handleItems(this.state.itemsAux);
        this.setState({
            filterDate: null,
            filterEmail: null,
            filterState: null
        });
        this.handleOpenChangeFilter(false);
    }

    handleItems(lista) {
        this.setState({
            items: lista
        });
    }

    handleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    handleStatusChange(e) {
        this.setState({
            status: e.target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            dueDate: date
        });
    }

    handleOpenChange(boolean) {
        this.setState({
            open: boolean
        });
    }

    handleOpenChangeFilter(boolean) {
        this.setState({
            filterOpen: boolean
        });
    }
    
    handleDatesForFilter(e) {
        let dates = new Set();
        for (var i = 0; i < this.state.items.length; i++) {
            const item = this.state.items[i];
            dates.add(item.dueDate.toString());
        }
        return [...dates];
    }

    handleEmailsForFilter(e) {
        let emails = new Set();
        for (var i = 0; i < this.state.items.length; i++) {
            emails.add(this.state.items[i].email);
        }
        return [...emails];
    }

    handleFileChange(e) {
        this.setState({
            file: e.target.files[0]
        });                
    }

    handleSubmit(e) {

        e.preventDefault();

        if (!this.state.description.length || !this.state.name.length || !this.state.email.length || !this.state.status.length)
            return;

        const newItem = {
            description: this.state.description,
            name: this.state.name,
            email: this.state.email,
            status: this.state.status,
            dueDate: this.state.dueDate,
            fileUrl: "http://localhost:8080/api/files/" + this.state.file.name
        };
        this.uploadFile(newItem);  
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            itemsAux: prevState.itemsAux.concat(newItem),
            description: '',
            name: '',
            email: '',
            status: '',
            dueDate: moment(), 
            fileUrl: null
        }));
        this.handleOpenChange(false);
    }
}
export default TodoApp;