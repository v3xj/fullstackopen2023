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

const mostLikes = (blogs) => {
  var eachBloggerAndLikes = []
  blogs.map(blog => {
    var writerName = blog.author
    var blogLikes = blog.likes

    const bloggerObject = {
      'author': writerName,
      'likes': blogLikes
    }
    var blogger = eachBloggerAndLikes.find(o => o.author === bloggerObject.author)

    if (blogger) {
      blogger.likes += bloggerObject.likes
    } else {
      eachBloggerAndLikes.push(bloggerObject)
    }
  })

  //console.log(eachBloggerAndLikes)

  var bloggerWithMostLikes = eachBloggerAndLikes.reduce((a, b) => 
  (a.likes > b.likes) ? a : b)

  //console.log(bloggerWithMostLikes)

  return bloggerWithMostLikes
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}