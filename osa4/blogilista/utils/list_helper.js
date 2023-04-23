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
      highest = blog.likes
      mostLikes = blog
    }
  })
  return mostLikes
}

const mostBlogs = (blogs) => {
  var blogsPerWriter = _.countBy(blogs, 'author')
  var writerWithMostBlogs = _.findKey(blogsPerWriter, function(o) {
    return o === _.max(_.map(blogsPerWriter))
  })
  var blogAmountOfWriterWithMostBlogs = _.find(blogsPerWriter, function(o) {
    return o === _.max(_.map(blogsPerWriter))
  })
  
  const returnable = {
    'author' : writerWithMostBlogs,
    'blogs' : blogAmountOfWriterWithMostBlogs
  }
  return returnable
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}