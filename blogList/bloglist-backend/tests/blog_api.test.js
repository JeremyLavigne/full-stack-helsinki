const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the first blogs title is Go to statement considered harmful', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
        'Go To Statement Considered Harmful'
      )
})

test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(b => b.id)
    expect(ids[0]).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain(
      'Canonical string reduction'
    )
})

test('blog without title is not added', async () => {
    const newBlog = {
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog without likes is register with 0 likes', async () => {
    const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const likes = blogsAtEnd.map(r => r.likes)
    console.log(likes)
    expect(likes).toContain(0)
})

test('blog is succesfully delete', async () => {

    const response = await api.get('/api/blogs')
    const id = response.body[0].id

    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
})

test('blog with new url is succesfully updated', async () => {

    const response = await api.get('/api/blogs')

    const updatedBlog = {
        title: response.body[0].title,
        author: response.body[0].author,
        url: "newurl.com",
        likes : response.body[0].likes,
    }

    await api
      .put(`/api/blogs/${response.body[0].id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    console.log(blogsAtEnd)
    const urls = blogsAtEnd.map(r => r.url)
    console.log(urls)
    expect(urls).toContain('newurl.com')
})

afterAll(() => {
  mongoose.connection.close()
})