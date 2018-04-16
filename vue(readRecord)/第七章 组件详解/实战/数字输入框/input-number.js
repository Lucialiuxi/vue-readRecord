function isValueNumber(value){
    return (/(^-?[0-9]+\.{1}\d+$)  |  (^-?[1-9][0-9]*$)  |  (^-?0{1}$)/).test(value+'')
}
// 数字输入框组件
Vue.component('input-number',{
    template:`
    <div class="input-number">
        <input 
            type="text"
            :value="currentValue"
            @change="handleChange"
        >
        <button
            @click="handleDown"
            :disabled="currentValue <= min"
        >-</button>
        <button
            @click="handleUp"
            :disabled="currentValue >= max"
        >+</button>
    </div>
    `,
    props:{
        max:{
            type:Number,
            default:Infinity,
        },
        min:{
            type:Number,
            default:-Infinity,
        },
        value:{
            type:Number,
            default:0,            
        }
    },
    data:function(){
        return{
            currentValue:this.value,
        }
    },
    watch:{
        currentValue:function(val){
            this.$emit('input',val);
            this.$emit('on-change',val)
        },
        value:function(val){//如果检测到根实例的value变化了，就更新currentValue
            this.updateValue(val)
        },
        
    },
    methods:{
        handleDown(){
            console.log('-')
            if(this.currentValue<=this.min) return;
            this.currentValue--;
            console.log(this.currentValue)
        },
        handleUp(){
            console.log('+')
            if(this.currentValue>=this.max) return;
            this.currentValue++;
        },
        updateValue:function(val){
            if(val > this.max) val = this.max;
            if(val < this.min) val = this.min;
            this.currentValue = val;
        },
        handleChange:function(event){//输入框的值发生变化触发
            var val = event.target.value.trim();

            var max = this.max;
            var min = this.min;

            if(isValueNumber(val)){//如果符合正则表达式的验证规则,输入框的值就是currentValue
                val = Number(val);
                this.currentValue = val;

                if(val>max){
                    this.currentValue = max;
                }else{
                    this.currentValue = min;
                }
            }else{//不符合正则表达式的规则，那输入框的值就是currentValue
                event.target.value = this.currentValue;
            }
        }

    }
    
})