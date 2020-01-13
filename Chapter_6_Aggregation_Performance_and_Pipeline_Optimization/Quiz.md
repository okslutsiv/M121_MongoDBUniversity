# Chapter 6: Aggregation Performance and Pipeline Optimization

## Aggregation Performance

Problem:

With regards to aggregation performance, which of the following are true?
Attempts Remaining:Correct Answer

Check all answers that apply:

- [ ] You can increase index usage by moving \$match stages to the end of your pipeline

- [ ] Passing allowDiskUsage to your aggregation queries will seriously increase their performance

- [x] **When $limit and $sort are close together a very performant top-k sort can be performed**

- [x] **Transforming data in a pipeline stage prevents us from using indexes in the stages that follow**

## Aggregation Pipeline on a Sharded Cluster

Problem:

What operators will cause a merge stage on the primary shard for a database?
Attempts Remaining:Correct Answer

Check all answers that apply:

- [ ] \$group

- [x] **\$lookup**

- [x] **\$out**

## Pipeline Optimization - Part 2

Problem:

Which of the following statements is/are true?
Attempts Remaining:Correct Answer

Check all answers that apply:

- [x] **The Aggregation Framework will automatically reorder stages in certain conditions**

- [x] **The Aggregation Framework can automatically project fields if the shape of the final document is only dependent upon those fields in the input document.**

- [x] **The query in a \$match stage can be entirely covered by an index**

- [x] **Causing a merge in a sharded deployment will cause all subsequent pipeline stages to be performed in the same location as the merge**
