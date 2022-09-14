var itemurl="https://monoame.com/awi_class/api/command.php?type=get&name=itemdata";

var shoplist={};
shoplist.name="購物清單";
shoplist.list=[
  {name: "吹風機",price: 300},
  {name: "麥克風",price: 800},
  {name: "筆電",price: 20000},
  {name: "Iphone13",price: 27000},
  {name: "耳機",price: 6000},
  {name: "愛愛",price: 3000}
];
$.ajax({
  url: itemurl,
  success: function(res){
    shoplist.list=(JSON.parse(res));
    showlist();
}
});
var item_html='<li id={{id}} class="buy_item">{{num}}.{{item}}<div class="price">{{price}}</div><div class="del_btn" id={{del_id}} data-del-id="{{delid}}">x</div></li>';
var total_html='<li class="buy_item total">總價<div class="price">{{total_price}}</div></li>';
function showlist(){
  $("#items_list").html("");
  var total_price=0;
  for(var i=0;i<shoplist.list.length;i++)
    {
      var item = shoplist.list[i];
      var item_id="buyitem_"+i;
      var del_item_id="del_buyitem_"+i;
      total_price = total_price +parseInt(item.price);
      var current_item_html=
          item_html.replace("{{num}}",i+1)
                   .replace("{{item}}",item.name)
                   .replace("{{id}}",item_id)
                   .replace("{{del_id}}",del_item_id)
                   .replace("{{price}}",item.price)
                   .replace("{{delid}}",i)
      ;
      $("#items_list").append(current_item_html);
      //delbtn id buyitem_1
      $("#"+del_item_id).click(
        function(){
          remove_item($(this).attr("data-del-id"));
        }
      );
    }
  var current_total=total_html.replace("{{total_price}}",total_price);
  $("#items_list").append(current_total);
}
showlist();
$(".addbtn").click(
  function(){
       shoplist.list.push(
       {
         name:$("#input_name").val(),
         price:$("#input_price").val()
        }
      );
    $("#input_name").val("");
    $("#input_price").val("");
    showlist();
  }
);
function remove_item(id){
  shoplist.list.splice(id,1);
  showlist();
}