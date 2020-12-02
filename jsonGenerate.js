[
  '{{repeat(30)}}',
  {
    id: '{{index()}}',
    //{"id": 0, "parent_id": 0, "name": "Что угодно", "flags": null}
    parent_id: '{{integer(0, 6)}}',
    name: '{{firstName()}} {{surname()}}',
    flags: function (tags) {
      var fruits = [null, 'flug'];
      return fruits[tags.integer(0, fruits.length - 1)];
    }
  }
]