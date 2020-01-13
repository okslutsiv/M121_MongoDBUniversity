# Lab - Computing Fields

## Problem:

Our movies dataset has a lot of different documents, some with more convoluted titles than others. If we'd like to analyze our collection to find movie titles that are composed of only one word, we could fetch all the movies in the dataset and do some processing in a client application, but the Aggregation Framework allows us to do this on the server!

Using the Aggregation Framework, find a count of the number of movies that have a title composed of one word. To clarify, "Cinderella" and "3-25" should count, where as "Cast Away" would not.

Make sure you look into the $split String expression and the $size Array expression

To get the count, you can append itcount() to the end of your pipeline

```javascript
db.movies.aggregate([...]).itcount()
```

Attempts Remaining:Correct Answer

Choose the best answer:

- [x] **8068**

- [ ] 9447

- [ ] 144

- [ ] 12373

## Detailed answer

```javascript
db.movies
  .aggregate([
    {
      $match: {
        title: {
          $type: "string"
        }
      }
    },
    {
      $project: {
        title: { $split: ["$title", " "] },
        _id: 0
      }
    },
    {
      $match: {
        title: { $size: 1 }
      }
    }
  ])
  .itcount();
```

We begin with a \$match stage, ensuring that we only allow movies where the title is a string

```javascript
db.movies.aggregate([
  {
    $match: {
      title: {
        $type: "string"
      }
    }
  },
```

Next is our \$project stage, splitting the title on spaces. This creates an array of strings

```javascript
{
  $project: {
    title: { $split: ["$title", " "] },
    _id: 0
  }
},
```

We use another \$match stage to filter down to documents that only have one element in the newly computed title field, and use itcount() to get a count

```javascript
  {
    $match: {
      title: { $size: 1 }
    }
  }
]).itcount()
```
