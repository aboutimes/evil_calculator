// 数据 Model
    var allUser = {
        helloWorld: {
            word: 'Vue MVVM Test'
        },
        holder:{
            name: '',
            age: ''
        },
        newUser: {
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
                console.log(str ? str : '');
            },
            createUser: function(){
                // 简单验证
                if (this.newUser.name){
                    if (/^\+?[1-9][0-9]*$/.test(this.newUser.age)) {
                        // 添加用户
                        this.users.push(this.newUser);
                        //重置 newUser
                        this.newUser = {name: '', age: '', sex: 'Male'}
                        this.holder.age = '';
                        this.holder.name = '';
                    }else if (this.newUser.age) {
                        this.holder.age = 'must be int';
                        this.newUser.age = '';
                    } else {
                        this.holder.age = 'must be filled in';
                        this.newUser.age = '';
                    }
                }else if (!this.newUser.age) {
                    this.holder.age = 'must be filled in';
                    this.newUser.age = '';
                    this.holder.name = 'must be filled in';
                    this.newUser.name = '';
                }else if(!/^\+?[1-9][0-9]*$/.test(this.newUser.age)){
                    this.holder.age = 'must be int';
                    this.newUser.age = '';
                    this.holder.name = 'must be filled in';
                    this.newUser.name = '';
                }else {
                    this.holder.name = 'must be filled in';
                    this.newUser.name = '';
                }
            },
        }
    });

    //用户列表、删除用户
    var listAll = new Vue({
        el: '#userList',
        data: allUser,
        methods:{
            deleteUser: function(user){
                // 删除用户
                this.users.splice(user,1);
                // console.log(user);
            }
        }
    });

    //分页 todo
    var pagData = {
        activeNumber: 1,
        pageCount: 10
    };
    var pagination = new Vue({
        el: '#pagination',
        data: pagData,
        methods: {
            jumpPage: function (event) {
                //聚焦选中的页码
                // Vue.set(pagData, 'activeNumber', 3)
                var targe = event.currentTarget.innerHTML;
                this.$set(pagData, 'activeNumber',parseInt(targe));
                // console.log(typeof(event.currentTarget.innerHTML));
                // console.log(typeof(pagData.activeNumber));
            }
        }
    })