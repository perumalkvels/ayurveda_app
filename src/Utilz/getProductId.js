export default function getProductId(idExtension){
    var cur_date = new Date(); 
    var id = idExtension +'_' + cur_date.getFullYear()
                    + (cur_date.getMonth()+1)
                    + cur_date.getDate()
                    + cur_date.getHours()  
                    + cur_date.getMinutes()
                    + cur_date.getSeconds()
    return id;
}