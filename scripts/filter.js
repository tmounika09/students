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
