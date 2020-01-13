# Final: Question 5

## Problem:

Consider a company producing solar panels and looking for the next markets they want to target in the USA. We have a collection with all the major cities (more than 100,000 inhabitants) from all over the World with recorded number of sunny days for some of the last years.

A sample document looks like the following:

```javascript
db.cities.findOne()
{
"_id": 10,
"city": "San Diego",
"region": "CA",
"country": "USA",
"sunnydays": [220, 232, 205, 211, 242, 270]
}
```

The collection also has these indexes:

```javascript
db.cities.getIndexes()[
  ({
    v: 2,
    key: {
      _id: 1
    },
    name: "_id_",
    ns: "test.cities"
  },
  {
    v: 2,
    key: {
      city: 1
    },
    name: "city_1",
    ns: "test.cities"
  },
  {
    v: 2,
    key: {
      country: 1
    },
    name: "country_1",
    ns: "test.cities"
  })
];
```

We would like to find the cities in the USA where the minimum number of sunny days is 200 and the average number of sunny days is at least 220. Lastly, we'd like to have the results sorted by the city's name. The matching documents may or may not have a different shape than the initial one.

We have the following query:

```javascript
var pipeline = [
  { $addFields: { min: { $min: "$sunnydays" } } },
  { $addFields: { mean: { $avg: "$sunnydays" } } },
  { $sort: { city: 1 } },
  { $match: { country: "USA", min: { $gte: 200 }, mean: { $gte: 220 } } }
];
db.cities.aggregate(pipeline);
```

However, this pipeline execution can be optimized!

Which of the following choices is still going to produce the expected results and likely improve the most the execution of this aggregation pipeline?

Attempts Remaining:Correct Answer

Choose the best answer:

-[]

```javascript
var pipeline = [
  { $match: { country: "USA" } },
  { $sort: { city: 1 } },
  { $addFields: { min: { $min: "$sunnydays" } } },
  { $match: { min: { $gte: 200 }, mean: { $gte: 220 } } },
  { $addFields: { mean: { $avg: "$sunnydays" } } }
];
```

-[]

```javascript
var pipeline = [
  { $sort: { city: 1 } },
  { $addFields: { min: { $min: "$sunnydays" } } },
  { $addFields: { mean: { $avg: "$sunnydays" } } },
  { $match: { country: "USA", min: { $gte: 200 }, mean: { $gte: 220 } } }
];
```

-[x]

```javascript
var pipeline = [
  { $match: { country: "USA" } },
  { $addFields: { mean: { $avg: "$sunnydays" } } },
  { $match: { mean: { $gte: 220 }, sunnydays: { $not: { $lt: 200 } } } },
  { $sort: { city: 1 } }
];
```

-[]

```javascript
var pipeline = [
  { $sort: { city: 1 } },
  { $addFields: { min: { $min: "$sunnydays" } } },
  { $match: { country: "USA", min: { $gte: 200 } } }
];
```

-[]

```javascript
var pipeline = [
  { $sort: { city: 1 } },
  { $match: { country: "USA" } },
  { $addFields: { min: { $min: "$sunnydays" } } },
  { $match: { min: { $gte: 200 }, mean: { $gte: 220 } } },
  { $addFields: { mean: { $avg: "$sunnydays" } } }
];
```

## Detailed answer

he correct answer is the following:

```javascript
var pipeline = [
  { $match: { country: "USA" } },
  { $addFields: { mean: { $avg: "$sunnydays" } } },
  { $match: { mean: { $gte: 220 }, sunnydays: { $not: { $lt: 200 } } } },
  { $sort: { city: 1 } }
];
```

In this case, we try to remove as much data as possible upfront, all cities not matching the right country, using the available index.

We then calculate the mean number of sunny days.

The \$match stage then filters out documents where the mean isn't greater than or equal to 220, and there are no entries in the sunnydays vector less than 200.

We are left with a sort in memory, however the number should be small enough to not take much resources. There are 285 cities with 100,000 habitants in the USA, and some are likely not to match the number of sunny days criteria.

Another answer provides the desired results, but will not improve the performance as much:

```javascript
var pipeline = [
  { $sort: { city: 1 } },
  { $addFields: { min: { $min: "$sunnydays" } } },
  { $addFields: { mean: { $avg: "$sunnydays" } } },
  { $match: { country: "USA", min: { $gte: 200 }, mean: { $gte: 220 } } }
];
```

The above approach uses the index to sort, however it performs an unnecessary calculation to get the minimum value within sunnydays. Because the $match stage did not come prior to these $addFields stages, all source documents will pass through them, a wasteful computation.

The pipeline:

```javascript
var pipeline = [
  { $sort: { city: 1 } },
  { $addFields: { min: { $min: "$sunnydays" } } },
  { $match: { country: "USA", min: { $gte: 200 } } }
];
```

does not satisfy the query requirements.

The last 2 queries are doing a \$match on mean before it is calculated, making them also invalid.
