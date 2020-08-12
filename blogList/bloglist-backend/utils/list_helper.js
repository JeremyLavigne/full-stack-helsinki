// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    } else {
        return blogs.map(blog => blog.likes)
                    .reduce((p, s) => s += p)
    }
}

const findIndiceOfMaxLikes = (list) => {
    let indiceOfMaxLikes = 0
    let max = 0

    for (let i=0; i<list.length; i++){
        if (list[i].likes > max) {
            max = list[i].likes
            indiceOfMaxLikes= i
        }
    }

    return indiceOfMaxLikes
}

const findIndiceOfMaxBlogs = (list) => {
    let indiceOfMaxBlogs = 0
    let max = 0

    for (let i=0; i<list.length; i++){
        if (list[i].blogs > max) {
            max = list[i].blogs
            indiceOfMaxBlogs= i
        }
    }

    return indiceOfMaxBlogs
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    let indiceOfFavoriteBlog = findIndiceOfMaxLikes(blogs)

    const favoriteOne = {
        title : blogs[indiceOfFavoriteBlog].title,
        author: blogs[indiceOfFavoriteBlog].author,
        likes : blogs[indiceOfFavoriteBlog].likes
    }

    return favoriteOne
}

const authorIsInList = (list, author) => {
    for (let i=0; i< list.length; i++) {
        if (list[i].author === author) {
            return true
        }
    }
    return false
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    const authors = blogs.map(blogs => blogs.author)
    const authorsAndNumberOfBlog = []

    for (let i=0; i<authors.length; i++) {

        if (authorsAndNumberOfBlog.length === 0 || !authorIsInList(authorsAndNumberOfBlog, authors[i])) {
            const newEntry = { author: authors[i], blogs : 1 }
            authorsAndNumberOfBlog.push(newEntry)
        } else {
            let authorWithOneMoreBlog = authorsAndNumberOfBlog.find(a => a.author === authors[i])
            authorWithOneMoreBlog.blogs += 1
        }
    }

    //console.log(authorsAndNumberOfBlog)

    let indiceOfMostBlogs = findIndiceOfMaxBlogs(authorsAndNumberOfBlog)

    return authorsAndNumberOfBlog[indiceOfMostBlogs]
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    //list of authors - can appear several times
    const authors = blogs.map(blog => blog.author)
    //list of likes - same order than authors
    const likes = blogs.map(blog => blog.likes)

    // list with author and likes / actually same as the first one but only with author and likes
    // Not really efficient but works for now
    const authorsAndNumberOfLikes = []
    for (let i=0; i<authors.length; i++) {
        const newEntry = { author: authors[i], likes : likes[i] }
        authorsAndNumberOfLikes.push(newEntry)
    }

    // Same list but each author appears only once, likes are added
    const authorsAndNumberOfLikesTotal = []

    // My eyes are burning, probably better to do, but hope it works
    for (let i=0; i<authors.length; i++) {

        if (authorsAndNumberOfLikesTotal.length === 0 || !authorIsInList(authorsAndNumberOfLikesTotal, authorsAndNumberOfLikes[i].author)) {
            const newEntry = { author: authorsAndNumberOfLikes[i].author, likes : authorsAndNumberOfLikes[i].likes }
            authorsAndNumberOfLikesTotal.push(newEntry)
        } else {
            let authorWithMoreLikes = authorsAndNumberOfLikesTotal.find(a => a.author === authorsAndNumberOfLikes[i].author)
            authorWithMoreLikes.likes += authorsAndNumberOfLikes[i].likes
        }
    }

    //console.log(authorsAndNumberOfBlog)

    let indiceOfMostLikes = findIndiceOfMaxLikes(authorsAndNumberOfLikesTotal)

    return authorsAndNumberOfLikesTotal[indiceOfMostLikes]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}