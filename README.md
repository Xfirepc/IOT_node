# PLATXIVERSE DB

## Usage

```js
const setupDatabase = require('platziverse_db')

setupDatabase(config).then(db= >{ 
    const {Agent , Metric} = db
    
}).catch(err => console.error(err))

```