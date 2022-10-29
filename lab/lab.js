/*
This file is not supposed to be used for testing the lab. However, you can do whatever you want... I'm not your parent.
*/
const mongoose = require('mongoose');
const Post = require('../models/post');
const User = require('../models/user');


function createPosts() {
    dummyPosts.forEach( dummyPost => {
        let post = new Post(dummyPost);

        post.save()
        .catch((err) => {
            console.log(err);
        });
    });
}

function checkPosts() {
    Post.find()
    .then((result) => {
        if (result.length > 0) { 
            console.log('posts are already populated');
        }

        if (result.length == 0) { 
            console.log('populating posts');
            createPosts();
        }
    })
    .catch((err) => {
        console.log(err)
    });
}


function createUsers() {
    dummyUsers.forEach( dummyUser => {
        let user = new User({
            username: dummyUser.username,
            email: dummyUser.email,
            role: dummyUser.role
        });

        user.setPassword(dummyUser.password);

        user.save()
        .catch((err) => {
            console.log(err);
        })
    });
}


function checkUsers() {
    User.find()
    .then((result) => {
        if (result.length > 0) { 
            console.log('users are already populated');
        }

        if (result.length == 0) { 
            console.log('populating users');
            createUsers();
        }
    })
    .catch((err) => {
        console.log(err)
    });
}


const dummyPosts = [
    {
        heading: 'What is finance?',
        subheading: 'Most people dont know what it is!',
        bgimage: '/assets/img/post-bg.jpg',
        content: 'What is "finance" you might ask... That is a very good question! You probably expected us to know too since we are called Finance and Loans OrganiZation. Sorry but we dont really know, look somewhere else.'
    },
    {
        heading: 'Why we care about money?',
        subheading: 'We at Finance and Loans Organization care about money a lot, here are some reasons why.',
        bgimage: '/assets/img/post-bg.jpg',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque viverra justo nec ultrices dui sapien eget mi. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Proin gravida hendrerit lectus a. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Auctor elit sed vulputate mi sit amet mauris commodo quis. Orci eu lobortis elementum nibh tellus. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Scelerisque mauris pellentesque pulvinar pellentesque. Amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus. Vel eros donec ac odio tempor orci. Mauris vitae ultricies leo integer malesuada nunc vel risus. Nulla facilisi morbi tempus iaculis urna id. Diam maecenas ultricies mi eget mauris pharetra. Luctus venenatis lectus magna fringilla urna porttitor. At varius vel pharetra vel. Pretium viverra suspendisse potenti nullam ac tortor vitae purus. Urna et pharetra pharetra massa massa ultricies mi quis. Vitae tempus quam pellentesque nec nam.'
    },
    {
        heading: 'Need loans? cool...',
        subheading: 'Nice',
        bgimage: '/assets/img/post-bg.jpg',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque viverra justo nec ultrices dui sapien eget mi. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Proin gravida hendrerit lectus a. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Auctor elit sed vulputate mi sit amet mauris commodo quis. Orci eu lobortis elementum nibh tellus. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Scelerisque mauris pellentesque pulvinar pellentesque. Amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus. Vel eros donec ac odio tempor orci. Mauris vitae ultricies leo integer malesuada nunc vel risus. Nulla facilisi morbi tempus iaculis urna id. Diam maecenas ultricies mi eget mauris pharetra. Luctus venenatis lectus magna fringilla urna porttitor. At varius vel pharetra vel. Pretium viverra suspendisse potenti nullam ac tortor vitae purus. Urna et pharetra pharetra massa massa ultricies mi quis. Vitae tempus quam pellentesque nec nam.'
    },
    {
        heading: 'Top finance tips 2022',
        subheading: 'Some tips that might help you financially this year.',
        bgimage: '/assets/img/post-bg.jpg',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque viverra justo nec ultrices dui sapien eget mi. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Proin gravida hendrerit lectus a. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Auctor elit sed vulputate mi sit amet mauris commodo quis. Orci eu lobortis elementum nibh tellus. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Scelerisque mauris pellentesque pulvinar pellentesque. Amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus. Vel eros donec ac odio tempor orci. Mauris vitae ultricies leo integer malesuada nunc vel risus. Nulla facilisi morbi tempus iaculis urna id. Diam maecenas ultricies mi eget mauris pharetra. Luctus venenatis lectus magna fringilla urna porttitor. At varius vel pharetra vel. Pretium viverra suspendisse potenti nullam ac tortor vitae purus. Urna et pharetra pharetra massa massa ultricies mi quis. Vitae tempus quam pellentesque nec nam.'
    },
    {
        heading: 'We are a business',
        subheading: 'We are a business that wants to make money.',
        bgimage: '/assets/img/post-bg.jpg',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque viverra justo nec ultrices dui sapien eget mi. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Proin gravida hendrerit lectus a. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Auctor elit sed vulputate mi sit amet mauris commodo quis. Orci eu lobortis elementum nibh tellus. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Scelerisque mauris pellentesque pulvinar pellentesque. Amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus. Vel eros donec ac odio tempor orci. Mauris vitae ultricies leo integer malesuada nunc vel risus. Nulla facilisi morbi tempus iaculis urna id. Diam maecenas ultricies mi eget mauris pharetra. Luctus venenatis lectus magna fringilla urna porttitor. At varius vel pharetra vel. Pretium viverra suspendisse potenti nullam ac tortor vitae purus. Urna et pharetra pharetra massa massa ultricies mi quis. Vitae tempus quam pellentesque nec nam.'
    },
    {
        heading: 'What your favorite color says about finance?',
        subheading: 'Nothing! What the hell did you expect?',
        bgimage: '/assets/img/post-bg.jpg',
        content: 'Try gambling all your life\'s savings! Moreover, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque viverra justo nec ultrices dui sapien eget mi. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Proin gravida hendrerit lectus a. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Auctor elit sed vulputate mi sit amet mauris commodo quis. Orci eu lobortis elementum nibh tellus. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Scelerisque mauris pellentesque pulvinar pellentesque. Amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus. Vel eros donec ac odio tempor orci. Mauris vitae ultricies leo integer malesuada nunc vel risus. Nulla facilisi morbi tempus iaculis urna id. Diam maecenas ultricies mi eget mauris pharetra. Luctus venenatis lectus magna fringilla urna porttitor. At varius vel pharetra vel. Pretium viverra suspendisse potenti nullam ac tortor vitae purus. Urna et pharetra pharetra massa massa ultricies mi quis. Vitae tempus quam pellentesque nec nam.'
    }
]

const dummyUsers = [
    {
        username: 'user',
        email: 'user@floz.com',
        password: 'test',
        role: 'User'
    },
    {
        username: 'staff',
        email: 'staff@floz.com',
        password: 'test',
        role: 'Staff'
    },
    {
        username: 'administrator',
        email: 'admin@floz.com',
        password: 'test',
        role: 'Administrator'
    },
]


// connect to database
const dbUrl = 'mongodb://root:asdfasdfasdf@127.0.0.1/myapp'; 
mongoose.connect(dbUrl)
    .then((result) => {
        console.log('connected to mongodb');
        checkPosts();
        checkUsers();
    })
    .catch((err) => console.log(err));
