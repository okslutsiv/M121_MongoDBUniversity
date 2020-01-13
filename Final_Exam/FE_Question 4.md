# Final: Question 4

## Problem:

\$facet is an aggregation stage that allows for sub-pipelines to be executed.

```javascript
var pipeline = [
  {
    $match: { a: { $type: "int" } }
  },
  {
    $project: {
      _id: 0,
      a_times_b: { $multiply: ["$a", "$b"] }
    }
  },
  {
    $facet: {
      facet_1: [{ $sortByCount: "a_times_b" }],
      facet_2: [{ $project: { abs_facet1: { $abs: "$facet_1._id" } } }],
      facet_3: [
        {
          $facet: {
            facet_3_1: [{ $bucketAuto: { groupBy: "$_id", buckets: 2 } }]
          }
        }
      ]
    }
  }
];
```

In the above pipeline, which uses \$facet, there are some incorrect stages or/and expressions being used.

Which of the following statements point out errors in the pipeline?

Attempts Remaining:Correct Answer

Check all answers that apply:

- [] $sortByCount cannot be used within $facet stage.

- [] a \$type expression does not take a string as its value; only the BSON numeric values can be specified to identify the types.

- [x] **facet_2 uses the output of a parallel sub-pipeline, facet_1, to compute an expression**

- [] a \$multiply expression takes a document as input, not an array.

- [x] **can not nest a \$facet stage as a sub-pipeline.**

## Detailed answer

The following options are not true:

- a $multiply expression takes a document as input, not an array.
This is not true, a $multiply expression does take as input an array of expressions.

- a \$type expression does not take a string as its value; only the BSON numeric values can be specified to identify the types.
  We can use either the numeric BSON representation, as well as a string alias to evaluate a field type.

- $sortByCount cannot be used within $facet stage.
  $facet does accept $sortByCount as a sub-pipeline stage.

**The correct answers, that reflect problems with the pipeline, are the following:**

- can not nest a $facet stage as a sub-pipeline.
This is correct. $facet does not accept all sub-pipelines that include other \$facet stages

- facet_2 uses the output of a parallel sub-pipeline, facet_1, to compute an expression
  Each sub-pipeline are completely independent of one another. The output of one sub-pipeline cannot be used as the input for different sub-pipelines.
