# Chapter 3: Core Aggregation - Combining Information

## The \$lookup Stage

Problem:

Which of the following statements is true about the \$lookup stage?
Attempts Remaining:Correct Answer

Check all answers that apply:

- [ ] You can specify a collection in another database to from

- [x] **The collection specified in from cannot be sharded**

- [x] **Specifying an existing field name to as will overwrite the the existing field**

- [x] **\$lookup matches between localField and foreignField with an equality match**

## \$graphLookup Introduction

Problem:

Which of the following statements apply to \$graphLookup operator? check all that apply
Attempts Remaining:Correct Answer

Check all answers that apply:

- [ ] $lookup and $graphLookup stages require the exact same fields in their specification.

- [x] **\$graphLookup provides MongoDB a transitive closure implementation**

- [ ] \$graphLookup is a new stage of the aggregation pipeline introduced in MongoDB 3.2

- [ ] $graphLookup depends on $lookup operator. Cannot be used without \$lookup

- [x] **Provides MongoDB with graph or graph-like capabilities**

## \$graphLookup: Simple Lookup

Problem:

Which of the following statements is/are correct? Check all that apply.
Attempts Remaining:Correct Answer

Check all answers that apply:

- [ ] startWith indicates the index that should be use to execute the recursive match

- [x] **connectToField will be used on recursive find operations**

- [x] **connectFromField value will be use to match connectToField in a recursive match**

- [ ] as determines a collection where \$graphLookup will store the stage results

## \$graphLookup: maxDepth and depthField

Problem:

Which of the following statements are incorrect? Check all that apply
Attempts Remaining:Correct Answer

Check all answers that apply:

- [x] **maxDepth only takes \$long values**

- [ ] depthField determines a field, in the result document, which specifies the number of recursive lookup needed to reach that document

- [x] **depthField determines a field, which contains the value number of documents matched by the recursive lookup**

- [ ] maxDepth allows to specify the number of recursive lookups

## \$graphLookup: General Considerations

Problem:

Consider the following statement:

```javascript
``$graphLookup`` is required to be the last element on the pipeline.
```

Which of the following is true about the statement?

Attempts Remaining:Correct Answer

Choose the best answer:

- [ ] This is incorrect. graphLookup needs to be the first element of the pipeline, regardless of other stages needed to perform the desired query.

- [ ] This is correct because of the recursive nature of \$graphLookup we want to save resources for last.

- [ ] This is correct because $graphLookup pipes out the results of recursive search into a collection, similar to $out stage.

- [x] **This is incorrect. $graphLookup can be used in any position of the pipeline and acts in the same way as a regular $lookup.**
