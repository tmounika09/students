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