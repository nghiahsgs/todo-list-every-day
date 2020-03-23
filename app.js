$('.fullDate').text(getDateFull())

dataTodos=""
$('#btnReset').click(()=>{
    updateDataServer(dataTodos.map((item=>{
        return { ...item, complete: [false, false, false, false, false, false, false]}
    })))
})

$.get('api.php',(data)=>{
    data=JSON.parse(data)
    dataTodos = data
    //initial element
    data.forEach(e => addNewrow(e))


    // listen event click checkbox
    $('input').click((e) => {
        data_day = e.target.getAttribute('data-day')
        data_work_id = e.target.getAttribute('data-work-id')
        data_update = dataTodos.map(item => {
            itemNew = { ...item }
            if (item.id == data_work_id) {
                itemNew.complete[data_day] = !item.complete[data_day]
            }
            return itemNew
        })
        dataTodos = [...data_update]
        //console.log(dataTodos)
        updateDataServer(dataTodos)

    })

})

function getDateFull() {
    var d=new Date()
    return d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear()
}

function updateDataServer(dataTodos) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "api_post.php",
        data: { data: JSON.stringify(dataTodos) },
        // contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log('update success');
        },
        error: function (e) {
            console.log(e.message);
        }
    });
}

function addNewrow(obj) {
    newRow =`
<tr>                        
    <td>${obj.name}</td>
`
obj.complete.forEach((data_day,index)=>{
    if (data_day){
        newRow +=`
        <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="form-check-input" value="" data-work-id='${obj.id}' data-day='${index}' checked>
            </div>
        </td>`
    }else{
        newRow += `
        <td>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="form-check-input" value="" data-work-id='${obj.id}' data-day='${index}'>
            </div>
        </td>`
    }
})
    newRow += `</tr>`
    $('tbody').append(newRow)
}