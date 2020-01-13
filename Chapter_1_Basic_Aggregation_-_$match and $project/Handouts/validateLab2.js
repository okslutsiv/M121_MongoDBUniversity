var validateLab2 = pipeline => {
  let aggregations = db.getSiblingDB("aggregations");
  if (!pipeline) {
    print("var pipeline isn't properly set up!");
  } else {
    try {
      let resultsExplain = aggregations.movies.aggregate(pipeline, {
        explain: true
      });
      let result = aggregations.movies.aggregate(pipeline).toArray().length; //5
      let data = 0;
      while (result != 1) {
        data++; //1,2,3,4,5
        result = result % 2 === 0 ? result / 2 : result * 3 + 1; //16,8,4,2,1
      }
      let { _id, title, rated } = resultsExplain.stages.pop()["$project"];
      return title && rated && !_id
        ? print("Answer is", data)
        : print("Your $project stage doesn't seem correct");
    } catch (e) {
      print(e.message);
    }
  }
};
//{$match:{"imdb.rating":{$gte:7},genres :{$nin:["Crime","Horror"]},rated: {$in:["PG","G"]}, languages:{$all:["English","Japanese"]}}}, {$project:{_id:0, title:1, rated:1}}
