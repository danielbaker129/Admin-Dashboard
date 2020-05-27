import React, { Component } from 'react';
import './dashboard.css'
// import firebase from './firebase.js';
import db from './firebase.js';
import firebase from 'firebase';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newStudent: '',
            classes: '',
            teachers: '',
            students: null
        }
        this.updateInput1 = this.updateInput1.bind(this);
        this.updateInput2 = this.updateInput2.bind(this);
        this.updateInput3 = this.updateInput3.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        db.collection('students')
            .get()
            .then(snapshot => {
                var st = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    st.push(data);
                })
                this.setState({
                    students: st
                })
                console.log(this.state.students[0].classes);
            });
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    updateInput1(evt) {
        this.setState({
            newStudent: evt.target.value,
        });
    }

    updateInput2(evt) {
        this.setState({
            classes: evt.target.value,
        });
    }
    updateInput3(evt) {
        this.setState({
            teachers: evt.target.value,
        });
    }

    addStudent(event) {
        const newStudent = {
            name: this.state.newStudent,
            classes: this.state.classes,
            teachers: this.state.teachers
        }
        var classesSplit = newStudent.classes.split(',');
        var teachersSplit = newStudent.teachers.split(',');
        firebase.firestore().collection('students').add({
            name: newStudent.name,
            classes: classesSplit,
            teachers: teachersSplit
        });
    }
    db = firebase.firestore().collection('students');
    render() {
        return (
            <div>
                <h1 className='title'>Admin Dashboard</h1>
                <form className='form' onSubmit={this.handleSubmit}>
                    <label>Enter Student's Name: <input onChange={this.updateInput1} type='text' /></label>
                    <label>Enter Classes (separated by comma and space): <input onChange={this.updateInput2} type='text' /></label>
                    <br /><label>Enter Teachers (separated by comma and space): <input onChange={this.updateInput3} type='text' /></label>
                    <button onClick={this.addStudent} type='submit'>Submit</button>
                </form>
                <div>
                    {
                        this.state.students !== null && [
                            <div>
                                <div>
                                    {Object.values(this.state.students).map((name, index) =>
                                        <div>
                                            <h1 className='names'>{this.state.students[index].name}</h1>
                                            <p className='classes'>Classes: {this.state.students[index].classes}</p>
                                            <p className='teachers'>Teachers: {this.state.students[index].teachers}</p>
                                        </div>)}
                                </div>
                            </div>
                        ]
                    }
                </div>
            </div>
        );
    }
}

export default Dashboard;