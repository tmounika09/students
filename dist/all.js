
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
$(document).ready(function () {
    filterinit();
})

function filterinit() {
    $("#search").keyup(function () {
        search = $(this).val();
        $("#students tbody tr").each(function () {
            studentname = jQuery(this).find("td:eq(1)").text();
            console.log(studentname);
            jQuery(this).hide();
            if (studentname.toLowerCase().indexOf(search.toLowerCase()) != -1) {
                jQuery(this).show();
            }
        })
    })
}

$(document).ready(function(){
    updateinit()
    
})
function updateinit(){
    getStudent();
   jQuery("#updateBtn").click(function(){
       updateStudent();
   }) 
}
function getStudent(){
    console.log(location);
    
    splittedlocation = location.href.split("=");
    id = splittedlocation[1];
    console.log(splittedlocation);
   jQuery.ajax({
       url: "https://api.mlab.com/api/1/databases/bhashyam/collections/students/"+id+"?apiKey=jNEtQwe-p84hjCuFtc1kPa3kfWVgtHLD",
       method: "GET",
       success:function(response){
           console.log("response", response);
           populateStudentInForm(response);
       },
       error:function(){
           
       }
       
   })
   
   
    
}
function populateStudentInForm(student){
    jQuery("#name").val(student.name);
    jQuery("#class").val(student.class);
    jQuery("#rollno").val(student.rollno);
    jQuery("#english").val(student.marks.english);
     jQuery("#hindi").val(student.marks.hindi);
     jQuery("#maths").val(student.marks.maths);
     jQuery("#science").val(student.marks.science);
     jQuery("#social").val(student.marks.social);
    
}

function updateStudent() {
    student = {
        name: jQuery("#name").val(),
        class: jQuery("#class").val(),
        rollno:jQuery("#rollno").val(),
        marks: {
            english: jQuery("#english").val(),
            hindi: jQuery("#hindi").val(),
            maths: jQuery("#maths").val(),
            science: jQuery("#science").val(),
            social: jQuery("#social").val(),
        },

    };
    console.log("student",student);
    splittedlocation = location.href.split("=");
    id = splittedlocation[1];
    $.ajax( { url: "https://api.mlab.com/api/1/databases/bhashyam/collections/students/"+id+"?apiKey=jNEtQwe-p84hjCuFtc1kPa3kfWVgtHLD",
		  data: JSON.stringify( student ),
		  type: "PUT",
		  contentType: "application/json" } );

}


$(document).ready(function(){
    deleteInit();
    
    
})
function deleteInit(){
    
   $(document).on("click", ".btn-delete", function(){
       studentId=jQuery(this).attr("data-student-id");
       console.log(studentId);
       studentname=jQuery(this).attr("data-student-name");
       console.log(studentname);
       $("#confirmDelete").find("#name").text(studentname);
       $("#confirmDelete").find("#studentId").text(studentId);
       $("#confirmDelete").modal("show");
       
       
    })
    $(document).on("click","#confirmDelete #yesBtn", function(){
        studentId=$("#confirmDelete").find("#studentId").text();
        deleteStudent(studentId);
    })
   }

function deleteStudent(studentId){
        //TODO: write an API call to delete the student with method delete
    $.ajax({
        url:"https://api.mlab.com/api/1/databases/bhashyam/collections/students/"+studentId+"?apiKey=jNEtQwe-p84hjCuFtc1kPa3kfWVgtHLD",
        type: "DELETE",
        success: function(){
        $("#confirmDelete").modal("hide");  
            location.reload();
        },
        error:function(){
            
        }
        
    })
}

//confirmation using defatlul javascript function
// we will create a popup asking for confirmation 
// we will use popup provided by bootstrap(known as modal) for confirmation

////$.ajax( { url: "https://api.mlab.com/api/1/databases/bhashyam/collections/students/"+id+"?apiKey=jNEtQwe-p84hjCuFtc1kPa3kfWVgtHLD",
//		  data: JSON.stringify( student ),
//		  type: "DELETE",
//		  contentType: "application/json" } );
$(document).ready(function(){
    sortinit();
})
function sortinit(){
    $("#students thead th").click(function(){
    rowarray=[];
        names=[];
        sortedrows='';
        $("#students tbody tr").each(function(){
         rowarray.push(jQuery(this).html()); 
            names.push(jQuery(this).find("td:eq(1)").text());
        })
        console.log(rowarray);
        console.log(names);
        names.sort();
        for(i=0; i<names.length; i++){
            $("#students tbody tr").each(function(){
                if(names[i]==jQuery(this).find("td:eq(1)").text()){
                    sortedrows += ("<tr>"+jQuery(this).html()+"</tr>");
                }
            })
        }
        console.log(sortedrows);
        $("#students tbody tr").remove();
        $("#students tbody").html(sortedrows);
    })
    
}