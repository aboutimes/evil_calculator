
// 数据 Model
var allUser = {
        helloWorld: {
            word: 'Vue MVVM Test'
        },
        holder: {
            name: '',
            age: ''
        },
        status: {
            create: true
        },
        pageData: {
            activeNumber: 1,
            pageCount: 5,
            per_page: 8
        },
        searchQuery:'',
        newUser: {
            id: null,
            name: '',
            sex: 'M',
            age: ''

        },
        users: []
    };

var demo = new Vue({
    el: '#app',
    data: allUser,
    filters: {
        capitalize: function (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    },
    computed: {
        filteredUser: function () {
            var self = this;
            return this.users.filter(function (item) {
                return item.name.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1;
            })
        },
        pageUser: function () {
            var self = this;
            return this.users.filter(function (item) {
                return item.name.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1;

            })
        }
    },
    methods: {
        setHolder: function (str) {
            return str ? str : '';
        },
        validate: function (e) {
            //验证
            var name = e.name;
            var age = e.age;
            var id = e.id;
            if (id==0 || id){
                var nu = this.users.findIndex((v) => {
                    return v.name == name;
                });
                if(nu == id){
                    var nameUnique = false;
                }else {
                    var nameUnique = true;
                }
            }else {
                var nameUnique = this.users.find((v) => {
                    return v.name == name;
                });
            }


            if(name && nameUnique){
                this.holder.name = 'name has been used';
                e.name = '';
            }
            if(!name){
                this.holder.name = 'name is required';
                e.name = '';
            }
            if(age && !/^([1-9]\d*)$/.test(age)){
                this.holder.age = 'age must be integer';
                e.age = '';
            }
            if(!age){
                this.holder.age = 'age is required';
                e.age = '';
            }
            //名字填写且唯一，年龄为正整数
            if (name && !nameUnique && /^([1-9]\d*)$/.test(age)) {
                return true;
            }
        },
        createUser: function(status){
            if(status){
                //新增用户
                // 简单验证
                if(this.validate(this.newUser)){
                    this.users.push(this.newUser);
                    //重置 newUser
                    this.newUser = {name: '', age: '', sex: 'M'}
                    this.holder.age = '';
                    this.holder.name = '';
                }
            }else {
                //编辑用户
                // 简单验证
                if (this.validate(this.newUser)){
                    this.users.splice(this.newUser.id, 1, this.newUser);
                    //重置 newUser
                    this.newUser = {id: null, name: '', age: '', sex: 'M'}
                    this.holder.age = '';
                    this.holder.name = '';
                    this.status.create = true;
                }
            }
        },
        editUser: function(id){
            //编辑用户
            var currentUser = this.users.slice(id,id+1);
            //取用户赋值给新建用户
            //id用于传递用户给createUser()辨识编辑的用户
            this.newUser.id = id;
            this.newUser.name = currentUser[0].name;
            this.newUser.age = currentUser[0].age;
            this.newUser.sex = currentUser[0].sex;
            //设置状态为编辑
            this.status.create = false;
        },
        deleteUser: function(id){
            // 删除用户
            this.users.splice(id,1);
        },
        jumpPage: function (event) {
            //点击获取页码
            var targe = event.currentTarget.innerHTML;
            //设置当页码为当前页
            this.$set(allUser.pageData, 'activeNumber',parseInt(targe));
        },
        randomUser: function (n) {
            //随机生成用户
            for(var j=0; j<n; j++){
                var nameLength = Math.floor(Math.random() * 4 + 3);
                var newName = "";
                var arry = "abcdefghijklmnopqrstuvwxyz";
                var allSex = [ 'F', 'M'];
                var newSex = allSex[Math.floor(Math.random()*2)];
                for (var i = 0; i < nameLength; i++){
                    newName += arry.charAt(Math.floor(Math.random() * arry.length));
                };
                var newAge = Math.floor(Math.random() * 56 + 3);
                newName = newName.charAt(0).toUpperCase()+newName.slice(1);
                var singleUser = {name: newName, age: newAge, sex: newSex};
                allUser.users.push(singleUser);
            }
        },
    },
    created: function () {
        //页数初始化
        //生成用户
        this.randomUser(20);
        //总人数
        var user_count = allUser.users.length;
        //每页数量
        var per_page = allUser.pageData.per_page;
        //页数
        var page_num= Math.ceil(user_count/per_page);
        //设置总页数
        this.$set(allUser.pageData, 'pageCount', page_num);
    },
    watch: {
        users: function () {
            //监听用户变化计算页数
            //总人数
            var user_count = allUser.users.length;
            //每页数量
            var per_page = allUser.pageData.per_page;
            //页数
            var page_num= Math.ceil(user_count/per_page);
            //设置总页数
            this.$set(allUser.pageData, 'pageCount', page_num);
            //当前页超过总页数时退回尾页，用于修复删除用户页码溢出
            if(page_num < allUser.pageData.activeNumber) {
                this.$set(allUser.pageData, 'activeNumber',page_num);
            }
        }
    },
});

