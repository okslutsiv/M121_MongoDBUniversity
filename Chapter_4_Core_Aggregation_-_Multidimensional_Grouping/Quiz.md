# Chapter 4: Core Aggregation - Multidimensional Grouping

## Facets: Single Facet Query

Problem:

Which of the following aggregation pipelines are single facet queries?
Attempts Remaining:Correct Answer

Check all answers that apply:

- [x]

```javascript
[
  { $match: { $text: { $search: "network" } } },
  { $sortByCount: "$offices.city" }
];
```

- [x]

```javascript
[
  { $unwind: "$offices" },
  { $project: { _id: "$name", hq: "$offices.city" } },
  { $sortByCount: "$hq" },
  { $sort: { _id: -1 } },
  { $limit: 100 }
];
```

- []

```javascript
[
  { $match: { $text: { $search: "network" } } },
  { $unwind: "$offices" },
  { $sort: { _id: -1 } }
];
```

## Facets: Manual Buckets

Problem:

Assuming that field1 is composed of double values, ranging between 0 and Infinity, and field2 is of type string, which of the following stages are correct?
Attempts Remaining:Correct Answer

Choose the best answer:

- [ ]

```javascript
{'$bucket': { 'groupBy': '$field1', 'boundaries': [ "a", 3, 5.5 ]}}
```

- [ ]

```javascript
{'$bucket': { 'groupBy': '$field1', 'boundaries': [ 0.4, Infinity ]}}
```

- [x]

````javascript
{'$bucket': { 'groupBy': '$field2', 'boundaries': [ "a", "asdas", "z" ], ```
'default': 'Others'}}
````

## Facets: Auto Buckets

Problem:

Auto Bucketing will ...
Attempts Remaining:Correct Answer

Check all answers that apply:

- [x] **given a number of buckets, try to distribute documents evenly accross buckets.**

- [x] **adhere bucket boundaries to a numerical series set by the granularity option.**

- [ ] randomly distributed documents accross arbitrarily defined bucket boundaries.

- [ ] count only documents that contain the groupBy field defined in the documents.

## Facets: Multiple Facets

Problem:

Which of the following statement(s) apply to the \$facet stage?
Attempts Remaining:Correct Answer

Check all answers that apply:

- [x] **The \$facet stage allows several sub-pipelines to be executed to produce multiple facets.**

- [x] **The \$facet stage allows the application to generate several different facets with one single database request.**

- [ ] The output of the individual $facet sub-pipelines can be shared using the expression $$FACET.$.

- [ ] We can only use facets stages ($sortByCount, $bucket and $bucketAuto) as sub-pipelines of $facet stage.
