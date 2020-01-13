# Final: Question 2

## Problem:

Consider the following collection:

```javascript
db.collection.find()
{
  "a": [1, 34, 13]
}
```

The following pipelines are executed on top of this collection, using a mixed set of different expression accross the different stages:

Pipeline 1

```javascript
db.collection.aggregate([
  { $match: { a: { $sum: 1 } } },
  { $project: { _id: { $addToSet: "$a" } } },
  { $group: { _id: "", max_a: { $max: "$_id" } } }
]);
```

Pipeline 2

```javascript
db.collection.aggregate([{ $project: { a_divided: { $divide: ["$a", 1] } } }]);
```

Pipeline 3

```javascript
db.collection.aggregate([
  { $project: { a: { $max: "$a" } } },
  { $group: { _id: "$$ROOT._id", all_as: { $sum: "$a" } } }
]);
```

Given these pipelines, which of the following statements are correct?

Attempts Remaining:Correct Answer

Check all answers that apply:

- [ ] Pipeline 2 is incorrect since \$divide cannot operate over field expressions

- [x] **Pipeline 2 fails because the \$divide operator only supports numeric types**

- [ ] Pipeline 1 will fail because \$max can not operator on \_id field

- [x] **Pipeline 3 is correct and will execute with no error**

- [x] **Pipeline 1 is incorrect because you cannot use an accumulator expression in a \$match stage**

## Detailed answer

The correct answers are the following:

- Pipeline 1 is incorrect because you cannot use an accumulator expression on $match stage.
We cannot use accumulator expressions within $match. Only query expressions are allowed within \$match

- Pipeline 3 is correct and will execute with no error
  This is correct. Although we may argue that $ROOT variable is totally unnecessary, since _id field will be projected by default from the first $project stage of this pipeline, there are no observable errors with the use of this expression variable

- Pipeline 2 fails because $divide operator only supports numeric types
This is true, $divide operator will only supports expressions that represent numeric value types.

All the other statements are not true.
