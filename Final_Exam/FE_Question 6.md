# Final: Question 6

## Problem:

Consider the following people collection:

```javascript
db.people.find().limit(5)
{ "_id" : 0, "name" : "Iva Estrada", "age" : 95, "state" : "WA", "phone" : "(739) 557-2576", "ssn" : "901-34-4492" }
{ "_id" : 1, "name" : "Roger Walton", "age" : 92, "state" : "ID", "phone" : "(948) 527-2370", "ssn" : "498-61-9106" }
{ "_id" : 2, "name" : "Isaiah Norton", "age" : 26, "state" : "FL", "phone" : "(344) 479-5646", "ssn" : "052-49-6049" }
{ "_id" : 3, "name" : "Tillie Salazar", "age" : 88, "state" : "ND", "phone" : "(216) 414-5981", "ssn" : "708-26-3486" }
{ "_id" : 4, "name" : "Cecelia Wells", "age" : 16, "state" : "SD", "phone" : "(669) 809-9128", "ssn" : "977-00-7372" }
```

And the corresponding people_contacts view:

```javascript
db.people_contacts.find().limit(5)
{ "_id" : 6585, "name" : "Aaron Alvarado", "phone" : "(631)*********", "ssn" : "********8014" }
{ "_id" : 8510, "name" : "Aaron Barnes", "phone" : "(944)*********", "ssn" : "********6820" }
{ "_id" : 6441, "name" : "Aaron Barton", "phone" : "(234)*********", "ssn" : "********1937" }
{ "_id" : 8180, "name" : "Aaron Coleman", "phone" : "(431)*********", "ssn" : "********7559" }
{ "_id" : 9738, "name" : "Aaron Fernandez", "phone" : "(578)*********", "ssn" : "********0211" }
```

Which of the of the following commands generates this people_contacts view?

Attempts Remaining:Correct Answer

Choose the best answer:

- []

```javascript
var pipeline = [
  {
    $project: {
      name: 1,
      phone: {
        $concat: [
          { $arrayElemAt: [{ $split: ["$phone", " "] }, 0] },
          "*********"
        ]
      },
      ssn: {
        $concat: ["********", { $arrayElemAt: [{ $split: ["$ssn", "-"] }, 2] }]
      }
    }
  }
];
db.runCommand({
  create: "people_contacts",
  viewOn: "people",
  pipeline: pipeline
});
```

- [x]

```javascript
var pipeline = [
  {
    $sort: { name: 1 }
  },
  {
    $project: {
      name: 1,
      phone: {
        $concat: [
          { $arrayElemAt: [{ $split: ["$phone", " "] }, 0] },
          "*********"
        ]
      },
      ssn: {
        $concat: ["********", { $arrayElemAt: [{ $split: ["$ssn", "-"] }, 2] }]
      }
    }
  }
];
db.createView("people_contacts", "people", pipeline);
```

- []

```javascript
var pipeline = [
  {
    $sort: { state: 1 }
  },
  {
    $project: {
      name: 1,
      phone: {
        $concat: [
          { $arrayElemAt: [{ $split: ["$phone", " "] }, 0] },
          "*********"
        ]
      },
      ssn: {
        $concat: ["********", { $arrayElemAt: [{ $split: ["$ssn", "-"] }, 2] }]
      }
    }
  }
];
db.runCommand({
  create: "people",
  viewOn: "people",
  pipeline: pipeline
});
```

- []

```javascript
var pipeline = [
  {
    "$sort": {"name": 1}
  },
  {
    "$project": {"name":1,
    "phone": {
      "$concat": [
        {"$arrayElemAt": [{"$split": ["$phone", " "]}, 0]} ,
        "*********"  ]
      },
    "ssn": {
      "$concat": [
        "********",
        {"$arrayElemAt": [{"$split": ["$ssn", "-"]}, 2]}
      ]
    }
  }
}
];
db.createView("people", "people_contacts" pipeline);
```

## Detailed answer

The correct answer is:

```javascript
var pipeline = [
  {
    $sort: { name: 1 }
  },
  {
    $project: {
      name: 1,
      phone: {
        $concat: [
          { $arrayElemAt: [{ $split: ["$phone", " "] }, 0] },
          "*********"
        ]
      },
      ssn: {
        $concat: ["********", { $arrayElemAt: [{ $split: ["$ssn", "-"] }, 2] }]
      }
    }
  }
];
db.createView("people_contacts", "people", pipeline);
```

people_contacts view was created using an initial \$sort stage. We can see this when comparing the find results between people collection and the view.

After sorting the results the people_contacts presents the documents with two computed (redacted) fields, phone and ssn.

```javascript
{
  "$project": {"name":1,
  "phone": {
    "$concat": [
      {"$arrayElemAt": [{"$split": ["$phone", " "]}, 0]} ,
      "*********"  ]
    },
  "ssn": {
    "$concat": [
      "********",
      {"$arrayElemAt": [{"$split": ["$ssn", "-"]}, 2]}
    ]
  }
}
```

And finally, to create the view using command createView

```javascript
db.createView("people_contacts", "people", pipeline);
```

All other options are incorrect, either because they do not use the correct pipeline or due to the fact that the view creation command is incorrect.
