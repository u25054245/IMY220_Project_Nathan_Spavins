import PostImg from "./post.jpg"
import profilePic from "./profilePic.png"

export const posts = [
    {
        id: 1,
        image: PostImg,
        title: "Cathkin Peak",
        location: "Drakensberg",
        views: 45,
        author: "Nathan",
        description: "a day in the berg!",
        comments: [
            {
                id: 1,
                author: "John",
                comment: "Amazing",
            },
            {
                id: 2,
                author: "Harry",
                comment: "Beautiful",
            },
            {
                id: 3,
                author: "Sarah",
                comment: "Amazing",
            },
        ]
    },

    {
        id: 2,
        image: PostImg,
        title: "Cathkin Peak!!!!!!!",
        location: "Drakensberg",
        views: 45,
        author: "John",
        description: "a day in the berg!",
        comments: [
            {
                id: 1,
                author: "Nathan",
                comment: "Amazing",
            },
            {
                id: 2,
                author: "Harry",
                comment: "Beautiful",
            },
            {
                id: 3,
                author: "Sarah",
                comment: "Amazing",
            },
        ]
    },

    {
        id: 3,
        image: PostImg,
        title: "Cathkin Peak??????",
        location: "Drakensberg",
        views: 45,
        author: "Sarah",
        description: "a day in the berg!",
        comments: [
            {
                id: 1,
                author: "John",
                comment: "Amazing",
            },
            {
                id: 2,
                author: "Harry",
                comment: "Beautiful",
            },
            {
                id: 3,
                author: "Nathan",
                comment: "Amazing",
            },
        ]
    },

    {
        id: 4,
        image: PostImg,
        title: "Peak Cathkin",
        location: "Drakensberg",
        views: 45,
        author: "Harry",
        description: "a day in the berg!",
        comments: [
            {
                id: 1,
                author: "John",
                comment: "Amazing",
            },
            {
                id: 2,
                author: "Nathan",
                comment: "Beautiful",
            },
            {
                id: 3,
                author: "Sarah",
                comment: "Amazing",
            },
        ]
    },
];

export const profiles = [
    {
        id: 1,
        username: "Nathan Spavins",
        profilePic: profilePic,
        posts: 5,
        friends: [1, 1],
    }
]