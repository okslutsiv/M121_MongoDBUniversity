# Lab - \$unwind

## Problem:

Let's use our increasing knowledge of the Aggregation Framework to explore our movies collection in more detail. We'd like to calculate how many movies every cast member has been in and get an average imdb.rating for each cast member.

What is the name, number of movies, and average rating (truncated to one decimal) for the cast member that has been in the most number of movies with English as an available language?

Provide the input in the following order and format

```javascript
{ "_id": "First Last", "numFilms": 1, "average": 1.1 }
```

Attempts Remaining:Correct Answer

Enter answer here:
**_{ "\_id": "John Wayne", "numFilms": 107, "average": 6.4 }_**

## Detailed answer

The solution we used is below.

```javascript
db.movies.aggregate([
  {
    $match: {
      languages: "English"
    }
  },
  {
    $project: { _id: 0, cast: 1, "imdb.rating": 1 }
  },
  {
    $unwind: "$cast"
  },
  {
    $group: {
      _id: "$cast",
      numFilms: { $sum: 1 },
      average: { $avg: "$imdb.rating" }
    }
  },
  {
    $project: {
      numFilms: 1,
      average: {
        $divide: [{ $trunc: { $multiply: ["$average", 10] } }, 10]
      }
    }
  },
  {
    $sort: { numFilms: -1 }
  },
  {
    $limit: 1
  }
]);
```

We start with a familiar \$match stage, looking for movies that include "English" as a language

```javascript
{
  $match: {
    languages: "English"
  }
},
```

Next, we use a \$project stage, keeping only the data necessary for the aggregation stages that follow

```javascript
{
  $project: { _id: 0, cast: 1, "imdb.rating": 1 }
}
```

\$unwind follows next, extracting every entry in the cast array and creating a document for each one

```javascript
{
  $unwind: "$cast";
}
```

Our \$group stage groups cast members together by their name, totals the number of documents, and gets the average imdb.rating

```javascript
{
  $group: {
    _id: "$cast",
    numFilms: { $sum: 1 },
    average: { $avg: "$imdb.rating" }
  }
}
```

We then use a \$project stage to truncate the imdb.rating to one decimal. This is done by first multiplying by 10, truncating the number, then dividing by 10

```javascript
{
  $project: {
    numFilms: 1,
    average: {
      $divide: [
        { $trunc: { $multiply: ["$average", 10] } }
        , 10
      ]
    }
  }
}
```

Lastly, we $sort in descending order so the result with the greatest number of movies comes first, and then $limit our result to 1 document, giving the expected answer

```javascript
{ "_id" : "John Wayne", "numFilms" : 107, "average" : 6.4 }
```
