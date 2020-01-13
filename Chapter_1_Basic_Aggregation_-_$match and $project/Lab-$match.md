# Lab - \$match

## Problem:

Help MongoDB pick a movie our next movie night! Based on employee polling, we've decided that potential movies must meet the following criteria.

- imdb.rating is at least 7
- genres does not contain "Crime" or "Horror"
- rated is either "PG" or "G"
- languages contains "English" and "Japanese"

Assign the aggregation to a variable named pipeline, like:

```javascript
var pipeline = [ { $match: { ... } } ]
```

- As a hint, your aggregation should return 23 documents. You can verify this by typing db.movies.aggregate(pipeline).itcount()
- Load validateLab1.js into mongo shell

```javascript
load("validateLab1.js");
```

And run the validateLab1 validation method

```javascript
validateLab1(pipeline);
```

What is the answer?

Attempts Remaining:Correct Answer

Choose the best answer:

- [x] **15**

- [ ] 12

- [ ] 30

- [ ] 7

## Detailed answer

You can use nearly all of the familiar query operators in \$match. We filter documents, retaining only those where the imdb.rating is 7 or more, genres does not include "Crime" or "Horror", the value for rated was "PG" or "G", and languages includes both "English" and "Japanese". .. code-block:

```javascript
var pipeline = [
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Japanese"] }
    }
  }
];
```
