const _ = require('lodash')

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  let total = 0;
  blogs.map(blog => {
    total += blog.likes
  })
  return total;
}

const favoriteBlog = (blogs) => {
  let highest = 0;
  let mostLikes = 0;
  blogs.map(blog => {
    if (blog.likes > highest) {
      console.log(blog.title + 'Likes: ' + blog.likes + ' NEW HIGHEST FOUND')
      highest = blog.likes
      mostLikes = blog
    }
  })
  console.log(mostLikes)
  return mostLikes
}

const mostBlogs = (blogs) => {
  var blogsPerWriter = _.countBy(blogs, 'author')
  var writerWithMostBlogs = _.findKey(blogsPerWriter, function(o) {
    return o === _.max(_.map(blogsPerWriter))
  })
  return writerWithMostBlogs
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}