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
            pageCount: 1,
            per_page: 5
        },
        newUser: {
            id: null,
            name: '',
            sex: 'Male',
            age: ''

        },
        users: [{
            name: 'Alen',
            age: 30,
            sex: 'Male'
        }, {
            name: 'Ida',
            age: 26,
            sex: 'Female'
        }, {
            name: 'Galen',
            age: 19,
            sex: 'Male'
        }, {
            name: 'Abbey',
            age: 22,
            sex: 'Female'
        }, {
            name: 'Ned',
            age: 25,
            sex: 'Male'
        }, {
            name: 'Lucy',
            age: 18,
            sex: 'Female'
        }, {
            name: 'Helen',
            age: 37,
            sex: 'Female'
        }, {
            name: 'Pote',
            age: 52,
            sex: 'Male'
        }, {
            name: 'Vera',
            age: 42,
            sex: 'Female'
        }, {
            name: 'Quincy',
            age: 35,
            sex: 'Male'
        }]
    };

    // 实例 viewModel

    //创建用户
    var createOne = new Vue({
        el: '#userCreate',
        data: allUser,
        methods: {
            setHolder: function (str) {
                return str ? str : '';
            },
            validate:  function(e){
                //验证
                if (e.name){
                    if (/^\+?[1-9][0-9]*$/.test(e.age)) {
                        return true;
                    }else if (e.age) {
                        this.holder.age = 'age must be integer';
                        e.age = '';
                        return false;
                    } else {
                        this.holder.age = 'age is required';
                        e.age = '';
                        return false;
                    }
                }else if (!e.age) {
                    this.holder.age = 'age is required';
                    e.age = '';
                    this.holder.name = 'name is required';
                    e.name = '';
                    return false;
                }else if(!/^\+?[1-9][0-9]*$/.test(e.age)){
                    this.holder.age = 'age must be integer';
                    e.age = '';
                    this.holder.name = 'name is required';
                    e.name = '';
                    return false;
                }else {
                    this.holder.name = 'name is required';
                    e.name = '';
                    return false;
                }
            },
            createUser: function(status){
                if(status){
                    //新增用户
                    // 简单验证
                    if(this.validate(this.newUser)){
                        this.users.push(this.newUser);
                        //重置 newUser
                        this.newUser = {name: '', age: '', sex: 'Male'}
                        this.holder.age = '';
                        this.holder.name = '';
                    }
                }else {
                    //编辑用户
                    // 简单验证
                    if (this.validate(this.newUser)){
                        this.users.splice(this.newUser.id, 1, this.newUser);
                        //重置 newUser
                        this.newUser = {id: null, name: '', age: '', sex: 'Male'}
                        this.holder.age = '';
                        this.holder.name = '';
                        this.status.create = true;
                    }
                }
            },
        }
    });

    //用户列表、编辑、删除用户
    var listAll = new Vue({
        el: '#userList',
        data: allUser,
        methods:{
            deleteUser: function(id){
                // 删除用户
                this.users.splice(id,1);
                // console.log(user);
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
            }
        }
    });

    //分页
    var pagination = new Vue({
        el: '#pagination',
        data: {
            page: allUser.pageData,
            user: allUser.users
        },
        created: function () {
            //页数初始化
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
            user: function () {
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
        methods: {
            jumpPage: function (event) {
                //点击获取页码
                var targe = event.currentTarget.innerHTML;
                //设置当页码为当前页
                this.$set(allUser.pageData, 'activeNumber',parseInt(targe));
            }
        }
    })
