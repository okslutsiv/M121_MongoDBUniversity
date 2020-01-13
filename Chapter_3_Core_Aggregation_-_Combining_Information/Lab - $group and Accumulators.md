# Lab - \$group and Accumulators

## Problem:

In the last lab, we calculated a normalized rating that required us to know what the minimum and maximum values for imdb.votes were. These values were found using the \$group stage!

For all films that won at least 1 Oscar, calculate the standard deviation, highest, lowest, and average imdb.rating. Use the sample standard deviation expression.

HINT - All movies in the collection that won an Oscar begin with a string resembling one of the following in their awards field

```javascript
Won 13 Oscars
Won 1 Oscar
```

Select the correct answer from the choices below. Numbers are truncated to 4 decimal places.

Attempts Remaining:Correct Answer

Choose the best answer:

- [ ] { "highest_rating" : 9.5, "lowest_rating" : 5.9, "average_rating" : 7.5290, "deviation" : 0.5988 }

- [ ] { "highest_rating" : 9.2, "lowest_rating" : 4.5, "average_rating" : 7.5270, "deviation" : 0.5984 }

- [ ] { "highest_rating" : 9.8, "lowest_rating" : 6.5, "average_rating" : 7.5270, "deviation" : 0.5988 }

- [x] **{ "highest_rating" : 9.2, "lowest_rating" : 4.5, "average_rating" : 7.5270, "deviation" : 0.5988 }**

## Detailed answer

```javascript
db.movies.aggregate([
  {
    $match: {
      awards: /Won \d{1,2} Oscars?/
    }
  },
  {
    $group: {
      _id: null,
      highest_rating: { $max: "$imdb.rating" },
      lowest_rating: { $min: "$imdb.rating" },
      average_rating: { $avg: "$imdb.rating" },
      deviation: { $stdDevSamp: "$imdb.rating" }
    }
  }
]);
```

We start by applying the now familiar \$match filtering, searching documents for the appropriate text stating they won an Oscar

```javascript
{
  $match: {
    awards: /Won \d{1,2} Oscars?/
  }
},
```

Next, we have our $group stage. By convention, we group all documents together by specifying null` to ``_id. We use the group accumulators $min, $max, $avg, and \$stdDevSamp to get our results

```javascript
{
  $group: {
    _id: null,
    highest_rating: { $max: "$imdb.rating" },
    lowest_rating: { $min: "$imdb.rating" },
    average_rating: { $avg: "$imdb.rating" },
    deviation: { $stdDevSamp: "$imdb.rating" }
  }
}
```
