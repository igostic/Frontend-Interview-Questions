class InMemorySearch {
  constructor() {
    this.db = new Map()
  }

  addDocuments(name, ...records) {
    let existing = this.db.get(name);
    console.log({existing});
    if(existing){
      this.db.set(name, [...existing, ...records]);
    } else
      this.db.set(name, [...records])
  }

  search(name, filterByOp, orderByOp) {
    let record = this.db.get(name);
    if (!record) {
      return [];
    }
    const records = record.filter(filterByOp);
    if(orderByOp){
      const {key, asc} = orderByOp
      records.sort((a, b) => {
        if (asc) {
          return a[key] - b[key];
        } else {
          return b[key] - a[key]
        }
      })    }

    return records;
  }
}

const searchEngine = new InMemorySearch();
searchEngine.addDocuments('Movies', 
                    {name: 'Avenger', rating: 8.5, year: 2017}, 
                    {name: 'Black Adam', rating: 8.7, year: 2022}, 
                    {name: 'Jhon Wick 4', rating: 8.2, year: 2023}, 
                    {name: 'Black Panther', rating: 9.0, year: 2022}
                   );
searchEngine.addDocuments('Movies', {name: 'IronMan4', rating: 9.5, year: 2023})
console.log(searchEngine.search('Movies', (e) => e.rating > 8.5, {key: 'rating', asc: false}));