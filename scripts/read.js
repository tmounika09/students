$(document).ready(function () {
    init();
})

function init() {
    getStudentsList();
}

function getStudentsList() {
    $.ajax({

        //url: "mock/students.json",
        url: "https://api.mlab.com/api/1/databases/bhashyam/collections/students?apiKey=jNEtQwe-p84hjCuFtc1kPa3kfWVgtHLD",
        method: "GET",
        success: function (response) { // response = list of students where length is the count of students
            console.log("response", response);
            populateStudentsList(response);
        },
        error: function () {

        }
    })

}

function populateStudentsList(students) {
    calculateTotalMarks(students);
    calculateRank(students);
    tablerows = '';
    for (var i = 0; i < students.length; i++) //0//1
    {
        student = students[i];

        tablerow = '<tr>';
        tablerow += '<td>' + (i + 1) + '</td>';
        tablerow += '<td>' + student.name + '</td>';
        tablerow += '<td>' + student.class + '</td>';
        tablerow += '<td>' + student.rollno + '</td>';
        tablerow += '<td>' + student.marks.english + '</td>';
        tablerow += '<td>' + student.marks.hindi + '</td>';
        tablerow += '<td>' + student.marks.maths + '</td>';

        tablerow += '<td>' + student.marks.science + '</td>';
        tablerow += '<td>' + student.marks.social + '</td>';
        tablerow += '<td>' + student.totalmarks + '</td>';
        tablerow += '<td>' + student.rank + '</td>';
        tablerow += '<td><a href="/update.html?id='+student._id.$oid+'" class="btn btn-warning">Update</a></td>'
        tablerow += '<td><a href="javascript:void(0)"  data-student-name="'+student.name+'" data-student-id="'+student._id.$oid+'" class="btn btn-danger btn-delete">Delete</a></td>'
        tablerow += '</tr>';





        tablerows = tablerows + tablerow; //''+'<tr></tr>'+'<tr></tr>'
    }

    jQuery("#students").find("tbody").html(tablerows);
}

function calculateTotalMarks(students) {

    for (var i = 0; i < students.length; i++) {
        student = students[i];
        student.totalmarks = 0;
        for (subject in student.marks) {
            if(student.marks[subject])
            student.totalmarks = student.totalmarks + parseInt(student.marks[subject]);

    }
    }
}

function calculateRank(students) {
    students = students.sort(function (a, b) {
        return (a.totalmarks - b.totalmarks);

    })
    console.log("students", students);
    students.reverse();
    for (var i in students) {
        students[i].rank = parseInt(i) + 1;
    }
}