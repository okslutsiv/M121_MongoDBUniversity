# Lab - Changing Document Shape with \$project

## Problem:

Our first movie night was a success. Unfortunately, our ISP called to let us know we're close to our bandwidth quota, but we need another movie recommendation!

Using the same $match stage from the previous lab, add a $project stage to only display the the title and film rating (title and rated fields).

Assign the results to a variable called pipeline.

```javascript
var pipeline = [{ $match: {. . .} }, { $project: { . . . } }]
```

Load validateLab2.js which was included in the same handout as validateLab1.js and execute validateLab2(pipeline)?

```javascript
load("./validateLab2.js");
```

And run the validateLab2 validation method

```javascript
validateLab2(pipeline);
```

What is the answer?

Attempts Remaining:Correct Answer

Choose the best answer:

- [x] **15**

- [] 4

- [] 7

- [] 30

## Detailed answer

Remember that when using $project to be selective on which fields you pass further, the only field you must specify to remove is _id. When you specify a field to retain (title: 1), $project assumes that all other fields you haven't specified to retain should be removed.

```javascript
var pipeline = [
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Japanese"] }
    }
  },
  {
    $project: { _id: 0, title: 1, rated: 1 }
  }
];
```
