/*

This file is not intended for the code analysis challenge

*/
const puppeteer = require('puppeteer');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Contact = require('../models/contact');


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
        username: 'bart',
        email: 'bart@floz.com',
        role: 'User'
    },
    {
        username: 'dorris',
        email: 'dorris@floz.com',
        role: 'Staff'
    },
    {
        username: 'admin',
        email: 'admin@floz.com',
        role: 'Administrator'
    },
]


async function createPosts() {
    let posts = dummyPosts;

    posts.forEach( postObj => {
        let post = new Post(postObj);

        post.save()
        .catch((err) => {
            console.log(err);
        });
    });

    return;
}


function generatePassword() {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let length = 20;
    let result = '';
    let charactersLength = characters.length;

    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

async function deleteCollections() {
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await Contact.deleteMany({});

    return;
}


async function createUsers() {
    let users = dummyUsers;

    // generate passwords
    users.forEach((userObj) => {
        userObj.password = generatePassword();
    });

    // create users
    users.forEach((userObj) => {
        let user = new User({
            username: userObj.username,
            email: userObj.email,
            role: userObj.role
        });

        user.setPassword(userObj.password);

        user.save()
        .catch((err) => {
            console.log(err);
        });
    });

    // return email and password of dorris
    return users[1];
}


async function victimUser(user) {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 720});

    // login
    await page.goto('http://localhost:3000/auth/login', { waitUntil: 'networkidle0' }); 
    await page.type('#email', user.email);
    await page.type('#password', user.password);
    await Promise.all([
      page.click('#submitButton'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    // go to vulnerable page
    await page.goto('http://localhost:3000/contact/message', { waitUntil: 'networkidle0' });

    // wait there a few seconds
    await new Promise(resolve => setTimeout(resolve, 5000));

    // close browser
    await browser.close();
}


async function startLab() {
    await deleteCollections();
    let user = await createUsers();
    await createPosts();
    setInterval(() => victimUser(user), 30000);
}


module.exports = {
    startLab
}
