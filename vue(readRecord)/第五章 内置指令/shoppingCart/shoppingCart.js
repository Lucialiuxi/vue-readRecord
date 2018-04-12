let listInit = [
    {
        id:1,
        name:'iphone7',
        price:6188,
        count:1
    },
    {
        id:2,
        name:'ipad Pro',
        price:5888,
        count:1
    },
    {
        id:3,
        name:'MacBook Pro',
        price:21488,
        count:1
    },
]

let list = JSON.parse(localStorage.getItem('shoppingCart'))||listInit

let app = new Vue({
    el:'#app',
    data:{
        list:list,
    },
    methods:{
        remove:function (item){
            console.log(this.list)
            for(let i = 0 ; i < this.list.length ; i++){
                if(this.list[i]===item){
                    this.list.splice(i,1)
                }
            }
        }
        
    },
    computed:{
        countPrice:function (){
            
        }
    },
    watch:{
        list:{
            deep:true,
            handler(){
                localStorage.setItem('shoppingCart',JSON.stringify(this.list))
            }
        }
    }
})